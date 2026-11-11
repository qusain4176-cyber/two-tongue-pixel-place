import { describe, expect, it } from "vitest";

import { getKarachiCalendarDate, isUpcomingLecture } from "@/lib/lecture-dates";

describe("Karachi lecture schedule", () => {
  it("keeps a lecture dated today upcoming for the whole Karachi calendar day", () => {
    expect(isUpcomingLecture("2026-11-11", new Date("2026-11-11T18:59:59.000Z"))).toBe(true);
  });

  it("classifies a passed Karachi calendar date as completed", () => {
    expect(isUpcomingLecture("2026-11-10", new Date("2026-11-11T19:30:00.000Z"))).toBe(false);
  });

  it("uses the next calendar day after midnight in Karachi", () => {
    expect(getKarachiCalendarDate(new Date("2026-11-11T19:30:00.000Z"))).toBe("2026-11-12");
  });

  it("keeps tomorrow's lecture upcoming", () => {
    expect(isUpcomingLecture("2026-11-12", new Date("2026-11-11T19:30:00.000Z"))).toBe(true);
  });
});