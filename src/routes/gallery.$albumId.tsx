import { createFileRoute } from "@tanstack/react-router";
import { SocietySitePage } from "@/components/society-site";
import { societyHead } from "@/lib/society-seo";

export const Route = createFileRoute("/gallery/$albumId")({
  head: () => societyHead("Gallery Album", "Photographs from an Al Mehdi Educational Society gathering."),
  component: () => <SocietySitePage page="gallery-detail" />,
});