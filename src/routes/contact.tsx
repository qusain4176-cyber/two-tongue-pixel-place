import { createFileRoute } from "@tanstack/react-router";
import { SocietySitePage } from "@/components/society-site";
import { societyHead } from "@/lib/society-seo";

export const Route = createFileRoute("/contact")({
  head: () => societyHead("Contact the Society", "Visit an Al Mehdi Educational Society Sunday gathering in Karachi."),
  component: () => <SocietySitePage page="contact" />,
});