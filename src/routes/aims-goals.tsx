import { createFileRoute } from "@tanstack/react-router";
import { SocietySitePage } from "@/components/society-site";
import { societySections } from "@/lib/society-sections";
import { societyHead } from "@/lib/society-seo";

export const Route = createFileRoute("/aims-goals")({
  head: () => societyHead("AIMS & GOALS", "Aims and goals section of Al Mehdi Educational Society."),
  component: () => <SocietySitePage section={societySections[1]} />,
});