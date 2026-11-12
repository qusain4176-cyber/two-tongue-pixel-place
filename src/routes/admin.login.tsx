import { createFileRoute } from "@tanstack/react-router";
import { SocietySitePage } from "@/components/society-site";
import { societyHead } from "@/lib/society-seo";

export const Route = createFileRoute("/admin/login")({
  head: () => societyHead("Administrator Sign In", "Administrator access for Al Mehdi Educational Society."),
  component: () => <SocietySitePage page="admin" />,
});