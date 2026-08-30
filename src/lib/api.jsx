import axios from "axios";

// The upstream API does not allow this app's origin in its CORS policy, so all
// browser traffic goes through our same-origin server proxy (src/routes/api/public/backend/$.ts).
// VITE_BACKEND_URL still forces a direct base URL when an operator needs it.
const DIRECT = import.meta.env.VITE_BACKEND_URL;
export const API_BASE = DIRECT ? `${DIRECT}/api` : "/api/public/backend";
const TOKEN_KEY = "negobuy_token";

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function formatApiError(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail
      .map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e)))
      .filter(Boolean)
      .join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

export default api;
