import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/Missions";

export const Route = createFileRoute("/_app/missions/")({
  head: () => ({
    meta: [
      { title: "Missions — NegoBuy" },
      { name: "description", content: "All your procurement missions in one place." },
      { property: "og:title", content: "Missions — NegoBuy" },
      { property: "og:description", content: "All your procurement missions in one place." },
    ],
  }),
  component: Page,
});
