import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/DirectNegotiation";

export const Route = createFileRoute("/_app/direct")({
  head: () => ({
    meta: [
      { title: "Direct negotiation — NegoBuy" },
      { name: "description", content: "Negotiate directly with a vendor using the AI agent." },
      { property: "og:title", content: "Direct negotiation — NegoBuy" },
      { property: "og:description", content: "Negotiate directly with a vendor using the AI agent." },
    ],
  }),
  component: Page,
});
