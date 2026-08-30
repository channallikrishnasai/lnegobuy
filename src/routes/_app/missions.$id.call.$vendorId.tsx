import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/VoiceCall";

export const Route = createFileRoute("/_app/missions/$id/call/$vendorId")({
  head: () => ({
    meta: [
      { title: "Voice negotiation — NegoBuy" },
      { name: "description", content: "Run an AI voice negotiation with this vendor." },
      { property: "og:title", content: "Voice negotiation — NegoBuy" },
      { property: "og:description", content: "Run an AI voice negotiation with this vendor." },
    ],
  }),
  component: Page,
});
