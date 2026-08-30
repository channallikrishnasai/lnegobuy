import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/AuthCallback";

export const Route = createFileRoute("/auth/callback")({
  head: () => ({
    meta: [
      { title: "Signing in — NegoBuy" },
      { name: "description", content: "Completing your NegoBuy sign-in." },
      { property: "og:title", content: "Signing in — NegoBuy" },
      { property: "og:description", content: "Completing your NegoBuy sign-in." },
    ],
  }),
  component: Page,
});
