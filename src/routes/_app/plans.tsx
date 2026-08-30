import { createFileRoute } from "@tanstack/react-router";
import Pricing from "@/pages/Pricing";

export const Route = createFileRoute("/_app/plans")({
  head: () => ({
    meta: [
      { title: "Plans — NegoBuy" },
      { name: "description", content: "Manage your NegoBuy subscription plan." },
      { property: "og:title", content: "Plans — NegoBuy" },
      { property: "og:description", content: "Manage your NegoBuy subscription plan." },
    ],
  }),
  component: () => <Pricing embedded />,
});
