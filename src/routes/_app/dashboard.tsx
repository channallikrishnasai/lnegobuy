import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/Dashboard";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Command Center — NegoBuy" },
      { name: "description", content: "Track missions, vendors and negotiation outcomes." },
      { property: "og:title", content: "Command Center — NegoBuy" },
      { property: "og:description", content: "Track missions, vendors and negotiation outcomes." },
    ],
  }),
  component: Page,
});
