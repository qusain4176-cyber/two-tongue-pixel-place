import { createFileRoute } from "@tanstack/react-router";
import { SocietySitePage } from "@/components/society-site";
import { societyHead } from "@/lib/society-seo";
import { societySections } from "@/lib/society-sections";

export const Route = createFileRoute("/lectures")({
  head: () => societyHead("LECTURES", "Lectures section of Al Mehdi Educational Society."),
  component: () => <SocietySitePage section={societySections[2]} />,
});