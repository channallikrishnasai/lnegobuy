import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/Team";

export const Route = createFileRoute("/_app/team")({
  head: () => ({
    meta: [
      { title: "Team — NegoBuy" },
      { name: "description", content: "Invite teammates and manage roles." },
      { property: "og:title", content: "Team — NegoBuy" },
      { property: "og:description", content: "Invite teammates and manage roles." },
    ],
  }),
  component: Page,
});
