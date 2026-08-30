/**
 * Thin compatibility layer so the ported react-router-dom code runs on
 * TanStack Router without touching every page.
 */
import {
  Link as TanstackLink,
  Outlet,
  useNavigate as useTanstackNavigate,
  useParams as useTanstackParams,
  useRouterState,
  useSearch,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

export { Outlet };

type AnyProps = Record<string, any>;

export function Link({ to, replace, state, children, ...rest }: AnyProps) {
  return (
    <TanstackLink to={to as string} replace={replace} state={state} {...rest}>
      {children as ReactNode}
    </TanstackLink>
  );
}

export function NavLink({ to, className, style, children, end: _end, ...rest }: AnyProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = pathname === to || pathname.startsWith(`${to}/`);
  return (
    <TanstackLink
      to={to as string}
      className={typeof className === "function" ? className({ isActive }) : className}
      style={typeof style === "function" ? style({ isActive }) : style}
      {...rest}
    >
      {typeof children === "function" ? children({ isActive }) : (children as ReactNode)}
    </TanstackLink>
  );
}

export function useNavigate() {
  const navigate = useTanstackNavigate();
  return (to: string | number, options: AnyProps = {}) => {
    if (typeof to === "number") {
      if (typeof window !== "undefined") window.history.go(to);
      return;
    }
    const [pathname, search] = to.split("?");
    navigate({
      to: pathname,
      search: search ? Object.fromEntries(new URLSearchParams(search)) : undefined,
      replace: options['replace'],
      state: options['state'],
    } as never);
  };
}

export function useParams() {
  return useTanstackParams({ strict: false }) as AnyProps;
}

export function useLocation() {
  return useRouterState({ select: (s) => s.location });
}

export function useSearchParams(): [URLSearchParams, (next: AnyProps) => void] {
  const search = useSearch({ strict: false }) as AnyProps;
  const navigate = useTanstackNavigate();
  const params = new URLSearchParams(
    Object.entries(search ?? {}).reduce<Record<string, string>>((acc, [k, v]) => {
      if (v !== undefined && v !== null) acc[k] = String(v);
      return acc;
    }, {}),
  );
  const setParams = (next: AnyProps) => navigate({ search: next } as never);
  return [params, setParams];
}

export function Navigate({ to, replace = true }: AnyProps) {
  const navigate = useTanstackNavigate();
  useEffect(() => {
    navigate({ to, replace } as never);
  }, [to, replace, navigate]);
  return null;
}
