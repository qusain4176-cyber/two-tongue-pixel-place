import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Clock3, MapPin, BookOpen } from "lucide-react";
import { getKarachiCalendarDate, isUpcomingLecture } from "@/lib/lecture-dates";

type Lecture = {
  id: string;
  maulanaName: string;
  maulanaPhoto: string;
  topic: string;
  date: string;
  venue: string;
  published: boolean;
};

// Intentionally empty until real lectures are added through the admin system.
// This keeps sample names, photographs, dates and venues off the public website.
const lectures: Lecture[] = [];
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDate(date: Date, options: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat("en-PK", { day: "numeric", month: "long", year: "numeric", ...options }).format(date);
}

export function MonthlyLectureSchedule() {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(() => getKarachiCalendarDate(new Date()));

  const monthDays = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const mondayOffset = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return [...Array.from({ length: mondayOffset }, () => null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)];
  }, [visibleMonth]);

  const monthLectures = useMemo(() => lectures.filter((lecture) => {
    const date = new Date(`${lecture.date}T12:00:00`);
    return lecture.published && date.getFullYear() === visibleMonth.getFullYear() && date.getMonth() === visibleMonth.getMonth();
  }).sort((a, b) => a.date.localeCompare(b.date)), [visibleMonth]);

  const upcomingLecture = lectures
    .filter((lecture) => lecture.published && isUpcomingLecture(lecture.date, new Date()))
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  const selectedLectures = monthLectures.filter((lecture) => lecture.date === selectedDate);
  const lectureDates = new Set(monthLectures.map((lecture) => lecture.date));

  function changeMonth(direction: number) {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
  }

  return (
    <section aria-labelledby="monthly-lecture-heading" className="bg-pearl px-4 py-12 sm:px-6 sm:py-16 xl:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col gap-2 text-center sm:mb-9">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">Al Mehdi Educational Society</span>
          <h2 id="monthly-lecture-heading" className="font-display text-2xl font-bold text-deep sm:text-3xl">Monthly Lecture Schedule</h2>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground">View the upcoming lecture and the complete schedule for this month.</p>
          <span aria-hidden="true" className="mx-auto mt-2 h-px w-20 bg-gold" />
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
          <section className="h-full border border-border bg-card p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex size-9 items-center justify-center bg-teal text-primary-foreground"><CalendarDays className="size-4" /></span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal">Next on the schedule</p>
                <h3 className="font-display text-lg font-bold text-deep">Upcoming Lecture</h3>
              </div>
            </div>

            {upcomingLecture ? (
              <Link to="/lectures" className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                <div className="grid gap-4 sm:grid-cols-[minmax(112px,0.72fr)_1.28fr]">
                  <div className="aspect-[4/5] overflow-hidden bg-pearl">
                    {upcomingLecture.maulanaPhoto ? <img src={upcomingLecture.maulanaPhoto} alt={upcomingLecture.maulanaName} className="size-full object-cover" /> : <div className="flex size-full items-center justify-center text-teal/60"><BookOpen className="size-12" /></div>}
                  </div>
                  <div className="flex flex-col items-start gap-3">
                    <span className="border border-gold/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal">Upcoming</span>
                    <div><h4 className="font-display text-lg font-bold text-deep group-hover:text-teal">{upcomingLecture.maulanaName}</h4><p className="mt-1 text-sm leading-6 text-muted-foreground">{upcomingLecture.topic}</p></div>
                    <p className="flex items-center gap-2 text-sm font-medium text-deep"><CalendarDays className="size-4 text-teal" />{formatDate(new Date(`${upcomingLecture.date}T12:00:00`))}</p>
                    <p className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"><Clock3 className="mt-0.5 size-4 shrink-0 text-teal" />Baad Namaz-e-Zuhrain</p>
                    <p className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"><MapPin className="mt-0.5 size-4 shrink-0 text-teal" />{upcomingLecture.venue}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-2 text-xs font-bold uppercase tracking-wider text-teal">View Lecture <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center border border-dashed border-border bg-pearl/60 px-5 py-8 text-center">
                <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-teal/10 text-teal"><CalendarDays className="size-6" /></span>
                <h4 className="font-display text-base font-semibold text-deep">No Upcoming Lecture</h4>
                <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">Upcoming lecture details will appear here once they are added and published by the administrator.</p>
              </div>
            )}
          </section>

          <section className="border border-border bg-card p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal">Browse by date</p><h3 className="font-display text-lg font-bold text-deep">Monthly Schedule</h3></div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month" className="flex size-9 items-center justify-center border border-border text-deep transition-colors hover:border-gold hover:bg-pearl"><ChevronLeft className="size-4" /></button>
                <span className="min-w-32 text-center text-sm font-semibold text-deep">{new Intl.DateTimeFormat("en-PK", { month: "long", year: "numeric" }).format(visibleMonth)}</span>
                <button type="button" onClick={() => changeMonth(1)} aria-label="Next month" className="flex size-9 items-center justify-center border border-border text-deep transition-colors hover:border-gold hover:bg-pearl"><ChevronRight className="size-4" /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {weekdays.map((day) => <div key={day} className="py-2 text-center text-[10px] font-bold uppercase tracking-wide text-muted-foreground sm:text-xs">{day}</div>)}
              {monthDays.map((day, index) => {
                if (!day) return <div key={`blank-${index}`} />;
                const key = dateKey(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day));
                const isSelected = selectedDate === key;
                const isToday = key === getKarachiCalendarDate(new Date());
                const hasLecture = lectureDates.has(key);
                return <button key={key} type="button" onClick={() => setSelectedDate(key)} aria-pressed={isSelected} className={`relative flex aspect-square min-h-9 items-center justify-center border text-xs font-medium transition-colors sm:text-sm ${isSelected ? "border-teal bg-teal text-primary-foreground" : isToday ? "border-gold bg-pearl text-deep" : "border-transparent text-foreground hover:border-border hover:bg-pearl"}`}>
                  {day}{hasLecture && <span aria-label="Lecture scheduled" className={`absolute bottom-1 size-1 rounded-full ${isSelected ? "bg-primary-foreground" : "bg-gold"}`} />}
                </button>;
              })}
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <h4 className="mb-3 text-sm font-bold text-deep">{formatDate(new Date(`${selectedDate}T12:00:00`), { weekday: "long", day: "numeric", month: "long" })}</h4>
              {selectedLectures.length ? <div className="space-y-3">{selectedLectures.map((lecture) => <Link key={lecture.id} to="/lectures" className="flex items-center justify-between gap-3 border border-border p-3 transition-colors hover:border-gold hover:bg-pearl/60"><span className="min-w-0"><span className="block truncate text-sm font-semibold text-deep">{lecture.maulanaName}</span><span className="mt-1 block text-xs text-muted-foreground">{lecture.topic}</span><span className="mt-1 block text-xs text-muted-foreground">Baad Namaz-e-Zuhrain · {lecture.venue}</span></span><ArrowRight className="size-4 shrink-0 text-teal" /></Link>)}</div> : <p className="border border-dashed border-border bg-pearl/50 px-4 py-4 text-sm leading-6 text-muted-foreground">No lecture is scheduled for this date. Select another date to view its lectures.</p>}
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-deep">All Lectures This Month</h4>
                <span className="text-xs text-muted-foreground">{monthLectures.length} {monthLectures.length === 1 ? "lecture" : "lectures"}</span>
              </div>
              {monthLectures.length ? (
                <div className="space-y-3">
                  {monthLectures.map((lecture) => (
                    <Link key={lecture.id} to="/lectures" className="group flex gap-3 border border-border p-3 transition-colors hover:border-gold hover:bg-pearl/60">
                      <div className="size-[68px] shrink-0 overflow-hidden bg-pearl">
                        {lecture.maulanaPhoto ? <img src={lecture.maulanaPhoto} alt={lecture.maulanaName} className="size-full object-cover" /> : <div className="flex size-full items-center justify-center text-teal/60"><BookOpen className="size-6" /></div>}
                      </div>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold text-teal">{formatDate(new Date(`${lecture.date}T12:00:00`), { day: "numeric", month: "short" })}</span>
                        <span className="mt-0.5 block truncate text-sm font-bold text-deep group-hover:text-teal">{lecture.maulanaName}</span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">{lecture.topic}</span>
                        <span className="mt-1 block text-xs text-muted-foreground">Baad Namaz-e-Zuhrain · {lecture.venue}</span>
                      </span>
                      <ArrowRight className="mt-1 size-4 shrink-0 text-teal" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="border border-dashed border-border bg-pearl/50 px-4 py-4 text-sm leading-6 text-muted-foreground">No lectures have been published for this month yet.</p>
              )}
            </div>

            <div className="mt-5 flex justify-end border-t border-border pt-4">
              <Link to="/lectures" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-teal hover:text-deep">All Lectures <ArrowRight className="size-3.5" /></Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
