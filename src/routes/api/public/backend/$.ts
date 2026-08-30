import { createFileRoute } from '@tanstack/react-router'

// Same-origin proxy to the Negobuy API.
//
// Root cause this solves: the upstream API rejects browser requests from this
// app's origin at the CORS preflight stage ("400 Disallowed CORS origin"), so
// every cross-origin XHR — including the Google session exchange — fails before
// the server ever sees it. Proxying server-side removes the browser's CORS
// constraint entirely; no secrets are involved and no auth is bypassed (the
// caller's own Authorization header / cookies are forwarded verbatim).

const UPSTREAM =
  process.env['BACKEND_URL'] ?? 'https://ai-voice-negotiation.emergent.host'

const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'transfer-encoding',
  'upgrade',
  'host',
  'content-length',
  'accept-encoding',
])

async function proxy({
  request,
  params,
}: {
  request: Request
  params: { _splat?: string }
}) {
  const url = new URL(request.url)
  const path = params._splat ?? ''
  const target = `${UPSTREAM}/api/${path}${url.search}`

  const headers = new Headers()
  request.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) headers.set(key, value)
  })
  headers.set('origin', UPSTREAM)
  headers.set('referer', `${UPSTREAM}/`)

  const method = request.method
  const body =
    method === 'GET' || method === 'HEAD' ? undefined : await request.arrayBuffer()

  let upstreamResponse: Response
  try {
    upstreamResponse = await fetch(target, {
      method,
      headers,
      body,
      redirect: 'manual',
    })
  } catch (error) {
    // Safe diagnostics: path + message only, never headers/tokens/body.
    console.error('[api-proxy] upstream unreachable', {
      path,
      method,
      message: error instanceof Error ? error.message : 'unknown',
    })
    return Response.json(
      { detail: 'UPSTREAM_UNREACHABLE: the Negobuy API could not be reached.' },
      { status: 502 },
    )
  }

  const responseHeaders = new Headers()
  upstreamResponse.headers.forEach((value, key) => {
    const k = key.toLowerCase()
    if (HOP_BY_HOP.has(k) || k === 'content-encoding') return
    if (k === 'set-cookie') return // rewritten below
    responseHeaders.set(key, value)
  })

  // Re-scope upstream cookies to this origin so sessions survive the proxy.
  const rawCookies =
    typeof (upstreamResponse.headers as unknown as { getSetCookie?: () => string[] })
      .getSetCookie === 'function'
      ? (upstreamResponse.headers as unknown as { getSetCookie: () => string[] }).getSetCookie()
      : upstreamResponse.headers.get('set-cookie')
        ? [upstreamResponse.headers.get('set-cookie') as string]
        : []
  for (const cookie of rawCookies) {
    const rewritten = cookie
      .split(';')
      .filter((part) => !/^\s*domain=/i.test(part))
      .join(';')
    responseHeaders.append('set-cookie', rewritten)
  }

  if (upstreamResponse.status >= 400) {
    console.error('[api-proxy] upstream error', {
      path,
      method,
      status: upstreamResponse.status,
    })
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: responseHeaders,
  })
}

export const Route = createFileRoute('/api/public/backend/$')({
  server: {
    handlers: {
      GET: proxy,
      POST: proxy,
      PUT: proxy,
      PATCH: proxy,
      DELETE: proxy,
      OPTIONS: proxy,
    },
  },
})
