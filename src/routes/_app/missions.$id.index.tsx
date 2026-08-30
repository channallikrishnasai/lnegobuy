import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/MissionDetail";

export const Route = createFileRoute("/_app/missions/$id")({
  head: () => ({
    meta: [
      { title: "Mission detail — NegoBuy" },
      { name: "description", content: "Vendor offers, negotiation transcripts and mission progress." },
      { property: "og:title", content: "Mission detail — NegoBuy" },
      { property: "og:description", content: "Vendor offers, negotiation transcripts and mission progress." },
    ],
  }),
  component: Page,
});
