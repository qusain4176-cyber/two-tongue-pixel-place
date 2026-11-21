import { createFileRoute } from "@tanstack/react-router";
import { SocietyHomePage } from "@/components/society-home";
import { societyHead } from "@/lib/society-seo";

export const Route = createFileRoute("/")({
  head: () => societyHead("Al Mehdi Educational Society", "Official home page of Al Mehdi Educational Society."),
  component: SocietyHomePage,
});