import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/Pricing";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — NegoBuy" },
      { name: "description", content: "Plans and pricing for NegoBuy's AI procurement and negotiation agent." },
      { property: "og:title", content: "Pricing — NegoBuy" },
      { property: "og:description", content: "Plans and pricing for NegoBuy's AI procurement and negotiation agent." },
    ],
  }),
  component: Page,
});
