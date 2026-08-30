import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/AutoSourcing";

export const Route = createFileRoute("/_app/sourcing")({
  head: () => ({
    meta: [
      { title: "Auto-sourcing — NegoBuy" },
      { name: "description", content: "Automatically discover and shortlist vendors." },
      { property: "og:title", content: "Auto-sourcing — NegoBuy" },
      { property: "og:description", content: "Automatically discover and shortlist vendors." },
    ],
  }),
  component: Page,
});
