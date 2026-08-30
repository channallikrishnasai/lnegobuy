import { createFileRoute } from "@tanstack/react-router";
import { PublicOnly } from "@/components/guards";
import Page from "@/pages/Register";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account — NegoBuy" },
      { name: "description", content: "Create a NegoBuy account and start negotiating with vendors." },
      { property: "og:title", content: "Create account — NegoBuy" },
      { property: "og:description", content: "Create a NegoBuy account and start negotiating with vendors." },
    ],
  }),
  component: () => (
    <PublicOnly>
      <Page />
    </PublicOnly>
  ),
});
