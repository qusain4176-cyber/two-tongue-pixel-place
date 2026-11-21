import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { societySections } from "@/lib/society-sections";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("keeps the homepage and Articles on separate pages", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes("/").at(-1)?.routeId).toBe("/");
    expect(router.matchRoutes("/articles").at(-1)?.routeId).toBe("/articles");
  });

  it("matches a distinct route for each original society section", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    for (const section of societySections) {
      const matches = router.matchRoutes(section.path);
      expect(matches.at(-1)?.routeId, section.title).not.toBe(rootRouteId);
    }
  });
});
