import { createFileRoute } from "@tanstack/react-router";
import { SocietySitePage } from "@/components/society-site";
import { societyHead } from "@/lib/society-seo";

export const Route = createFileRoute("/")({
  head: () => societyHead("Al Mehdi Educational Society", "Sunday lectures, shared learning, and community in Karachi."),
  component: () => <SocietySitePage page="home" />,
});