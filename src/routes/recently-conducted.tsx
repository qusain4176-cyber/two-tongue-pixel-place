import { createFileRoute } from "@tanstack/react-router";
import { SocietySitePage } from "@/components/society-site";
import { societyHead } from "@/lib/society-seo";

export const Route = createFileRoute("/recently-conducted")({
  head: () => societyHead("Recently Conducted Lectures", "Browse recent Sunday learning gatherings from Al Mehdi Educational Society."),
  component: () => <SocietySitePage page="recent" />,
});