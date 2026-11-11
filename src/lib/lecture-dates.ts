/** Returns the current calendar date in Karachi as an ISO YYYY-MM-DD string. */
export function getKarachiCalendarDate(now: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) throw new Error("Could not determine the Karachi calendar date.");
  return `${year}-${month}-${day}`;
}

/** A lecture remains upcoming throughout its scheduled date in Karachi. */
export function isUpcomingLecture(lectureDate: string, now: Date): boolean {
  return lectureDate >= getKarachiCalendarDate(now);
}