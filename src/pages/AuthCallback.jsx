import React, { useEffect, useState } from "react";
import { useNavigate } from "@/lib/router-compat";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../components/ui";

// Module-level guard: survives React StrictMode's mount→unmount→remount cycle (a fresh
// component instance gets a fresh useRef, which would exchange the single-use session_id
// twice and make the 2nd call fail). Keyed by session_id so each is processed exactly once.
const processedSessions = new Set();

export default function AuthCallback() {
  const { googleSession } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const hash = window.location.hash || "";
    const params = new URLSearchParams(hash.replace(/^#/, ""));
    const sid = params.get("session_id");
    if (!sid) {
      setError("No session found. Please try again.");
      setTimeout(() => navigate("/login"), 1800);
      return;
    }
    if (processedSessions.has(sid)) return;
    processedSessions.add(sid);
    googleSession(sid)
      .then(() => {
        // Drop the single-use session_id from the URL so a refresh does not re-exchange it.
        window.history.replaceState(null, "", "/dashboard");
        navigate("/dashboard", { replace: true });
      })
      .catch((err) => {
        processedSessions.delete(sid);
        const status = err?.response?.status;
        const detail = err?.response?.data?.detail;
        // Safe diagnostics: status + upstream detail only. Never the session id or tokens.
        console.error("[google-auth] session exchange failed", { status, detail });
        let message;
        if (!err?.response) {
          message = "Could not reach the sign-in service. Check your connection and try again.";
        } else if (status === 502) {
          message = "The authentication service is temporarily unavailable. Please try again.";
        } else if (status === 401 || status === 403) {
          message = "That Google sign-in link expired or was already used. Redirecting you to sign in again…";
        } else if (status >= 500) {
          message = "The server could not complete Google sign-in. Please try again shortly.";
        } else {
          message = typeof detail === "string" && detail
            ? `Google sign-in failed: ${detail}`
            : "Google sign-in failed. Redirecting…";
        }
        setError(message);
        setTimeout(() => navigate("/login"), 2200);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center gap-4">
      <Spinner className="w-8 h-8" />
      <p className="text-white/50 text-sm font-mono" data-testid="auth-callback-status">
        {error || "Establishing secure session…"}
      </p>
    </div>
  );
}
