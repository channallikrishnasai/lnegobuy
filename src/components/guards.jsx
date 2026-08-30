import React from "react";
import { Navigate } from "@/lib/router-compat";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "./ui";
import AuthCallback from "../pages/AuthCallback";

export function FullLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-void">
      <Spinner className="w-8 h-8" />
    </div>
  );
}

function isOAuthReturn() {
  return typeof window !== "undefined" && window.location.hash?.includes("session_id=");
}

export function Protected({ children }) {
  const { user, checked } = useAuth();
  if (isOAuthReturn()) return <AuthCallback />;
  if (!checked) return <FullLoader />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export function PublicOnly({ children }) {
  const { user, checked } = useAuth();
  if (!checked) return <FullLoader />;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}
