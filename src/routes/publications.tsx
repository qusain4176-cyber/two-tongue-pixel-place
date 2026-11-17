import { createFileRoute } from "@tanstack/react-router";
import { SocietySitePage } from "@/components/society-site";
import { societySections } from "@/lib/society-sections";
import { societyHead } from "@/lib/society-seo";

export const Route = createFileRoute("/publications")({
  head: () => societyHead("PUBLICATIONS", "Publications section of Al Mehdi Educational Society."),
  component: () => <SocietySitePage section={societySections[4]} />,
});