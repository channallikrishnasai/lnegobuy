import { createFileRoute } from "@tanstack/react-router";
import { Protected } from "@/components/guards";
import AppLayout from "@/components/AppLayout";

export const Route = createFileRoute("/_app")({
  component: () => (
    <Protected>
      <AppLayout />
    </Protected>
  ),
});
