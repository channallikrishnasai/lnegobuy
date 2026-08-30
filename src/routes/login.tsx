import { createFileRoute } from "@tanstack/react-router";
import { PublicOnly } from "@/components/guards";
import Page from "@/pages/Login";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — NegoBuy" },
      { name: "description", content: "Sign in to your NegoBuy procurement workspace." },
      { property: "og:title", content: "Sign in — NegoBuy" },
      { property: "og:description", content: "Sign in to your NegoBuy procurement workspace." },
    ],
  }),
  component: () => (
    <PublicOnly>
      <Page />
    </PublicOnly>
  ),
});
