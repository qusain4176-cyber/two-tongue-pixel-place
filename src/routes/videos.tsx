import { createFileRoute } from "@tanstack/react-router";
import { SocietySitePage } from "@/components/society-site";
import { societyHead } from "@/lib/society-seo";

export const Route = createFileRoute("/videos")({
  head: () => societyHead("Video Lectures", "Watch educational lectures shared by Al Mehdi Educational Society."),
  component: () => <SocietySitePage page="videos" />,
});