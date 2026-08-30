import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/AcceptInvite";

export const Route = createFileRoute("/accept-invite")({
  head: () => ({
    meta: [
      { title: "Accept invite — NegoBuy" },
      { name: "description", content: "Join your team's NegoBuy workspace." },
      { property: "og:title", content: "Accept invite — NegoBuy" },
      { property: "og:description", content: "Join your team's NegoBuy workspace." },
    ],
  }),
  component: Page,
});
