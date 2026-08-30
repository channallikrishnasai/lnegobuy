import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/NewMission";

export const Route = createFileRoute("/_app/missions/new")({
  head: () => ({
    meta: [
      { title: "New mission — NegoBuy" },
      { name: "description", content: "Launch a new AI-run procurement mission." },
      { property: "og:title", content: "New mission — NegoBuy" },
      { property: "og:description", content: "Launch a new AI-run procurement mission." },
    ],
  }),
  component: Page,
});
