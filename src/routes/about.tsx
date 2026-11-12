import { createFileRoute } from "@tanstack/react-router";
import { SocietySitePage } from "@/components/society-site";
import { societyHead } from "@/lib/society-seo";

export const Route = createFileRoute("/about")({
  head: () => societyHead("About the Society", "Learn about Al Mehdi Educational Society and its Sunday learning gatherings."),
  component: () => <SocietySitePage page="about" />,
});