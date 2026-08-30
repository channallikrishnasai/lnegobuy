import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/CallReview";

export const Route = createFileRoute("/_app/missions/$id/call-review/$ref")({
  head: () => ({
    meta: [
      { title: "Call review — NegoBuy" },
      { name: "description", content: "Review the transcript and outcome of a vendor call." },
      { property: "og:title", content: "Call review — NegoBuy" },
      { property: "og:description", content: "Review the transcript and outcome of a vendor call." },
    ],
  }),
  component: Page,
});
