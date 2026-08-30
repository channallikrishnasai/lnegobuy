import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/Orders";

export const Route = createFileRoute("/_app/orders")({
  head: () => ({
    meta: [
      { title: "Orders — NegoBuy" },
      { name: "description", content: "Track purchase orders created from won negotiations." },
      { property: "og:title", content: "Orders — NegoBuy" },
      { property: "og:description", content: "Track purchase orders created from won negotiations." },
    ],
  }),
  component: Page,
});
