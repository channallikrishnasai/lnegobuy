import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/TelegramNegotiation";

export const Route = createFileRoute("/_app/telegram")({
  head: () => ({
    meta: [
      { title: "Telegram AI — NegoBuy" },
      { name: "description", content: "Run AI-led vendor negotiations over Telegram." },
      { property: "og:title", content: "Telegram AI — NegoBuy" },
      { property: "og:description", content: "Run AI-led vendor negotiations over Telegram." },
    ],
  }),
  component: Page,
});
