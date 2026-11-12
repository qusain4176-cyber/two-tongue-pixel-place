import { createFileRoute } from "@tanstack/react-router";
import { SocietySitePage } from "@/components/society-site";
import { societyHead } from "@/lib/society-seo";

export const Route = createFileRoute("/all-lectures")({
  head: () => societyHead("All Lectures", "Explore upcoming and past lectures from Al Mehdi Educational Society."),
  component: () => <SocietySitePage page="all" />,
});