import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CallConsole";

export const Route = createFileRoute("/_app/missions/$id/call-console/$vendorId")({
  head: () => ({
    meta: [
      { title: "Call console — NegoBuy" },
      { name: "description", content: "Live call console for vendor negotiations." },
      { property: "og:title", content: "Call console — NegoBuy" },
      { property: "og:description", content: "Live call console for vendor negotiations." },
    ],
  }),
  component: Page,
});
