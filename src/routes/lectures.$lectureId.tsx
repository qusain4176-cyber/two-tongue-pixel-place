import { createFileRoute } from "@tanstack/react-router";
import { SocietySitePage } from "@/components/society-site";
import { societyHead } from "@/lib/society-seo";

export const Route = createFileRoute("/lectures/$lectureId")({
  head: () => societyHead("Lecture Details", "Lecture details from Al Mehdi Educational Society."),
  component: () => <SocietySitePage page="lecture-detail" />,
});