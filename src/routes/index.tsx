import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";

const Landing = lazy(() => import("../pages/Landing"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NegoBuy — AI Procurement & Negotiation Agent" },
      {
        name: "description",
        content:
          "Discover vendors, negotiate deals over voice, WhatsApp and Telegram, and compare offers automatically.",
      },
      { property: "og:title", content: "NegoBuy — AI Procurement & Negotiation Agent" },
      {
        property: "og:description",
        content:
          "Discover vendors, negotiate deals over voice, WhatsApp and Telegram, and compare offers automatically.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-void" />;
  return (
    <Suspense fallback={<div className="min-h-screen bg-void" />}>
      <Landing />
    </Suspense>
  );
}
