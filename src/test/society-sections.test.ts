import { describe, expect, it } from "vitest";

import { societySections } from "@/lib/society-sections";

describe("society section navigation", () => {
  it("preserves the ten original section names and spellings", () => {
    expect(societySections.map((section) => section.title)).toEqual([
      "ARTICLES",
      "AIMS & GOALS",
      "LECTURES",
      "MAJALIS",
      "PUBLICATIONS",
      "SIGN BOARD",
      "SOFTWARE",
      "OPEN BOOK QUIZ",
      "QUIZ DASHBOARD",
      "DONATION",
    ]);
  });

  it("gives every section a distinct page path", () => {
    const paths = societySections.map((section) => section.path);
    expect(paths).toEqual([
      "/",
      "/aims-goals",
      "/lectures",
      "/majalis",
      "/publications",
      "/sign-board",
      "/software",
      "/open-book-quiz",
      "/quiz-dashboard",
      "/donation",
    ]);
    expect(new Set(paths).size).toBe(10);
  });
});