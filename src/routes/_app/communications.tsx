import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CommunicationHub";

export const Route = createFileRoute("/_app/communications")({
  head: () => ({
    meta: [
      { title: "Communication hub — NegoBuy" },
      { name: "description", content: "WhatsApp, Telegram and email vendor conversations." },
      { property: "og:title", content: "Communication hub — NegoBuy" },
      { property: "og:description", content: "WhatsApp, Telegram and email vendor conversations." },
    ],
  }),
  component: Page,
});
