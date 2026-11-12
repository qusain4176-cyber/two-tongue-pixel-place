import { createFileRoute } from "@tanstack/react-router";
import { SocietySitePage } from "@/components/society-site";
import { societyHead } from "@/lib/society-seo";

export const Route = createFileRoute("/gallery")({
  head: () => societyHead("Photo Gallery", "Photographs from Al Mehdi Educational Society gatherings."),
  component: () => <SocietySitePage page="gallery" />,
});