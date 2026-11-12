import { createFileRoute } from "@tanstack/react-router";
import { SocietySitePage } from "@/components/society-site";
import { societyHead } from "@/lib/society-seo";

export const Route = createFileRoute("/lectures")({
  head: () => societyHead("Upcoming Lectures", "Find upcoming Sunday lectures hosted by Al Mehdi Educational Society in Karachi."),
  component: () => <SocietySitePage page="lectures" />,
});