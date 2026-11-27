import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Code2,
  Heart,
  Instagram,
  LayoutDashboard,
  Megaphone,
  Menu,
  MapPin,
  Newspaper,
  Target,
  Users,
  Youtube,
  type LucideIcon,
} from "lucide-react";

import societyLogo from "@/assets/al-mehdi-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { societySections } from "@/lib/society-sections";
import { useSocietyLanguage } from "@/lib/society-language";

const sectionIcons: LucideIcon[] = [
  Newspaper,
  Target,
  CalendarDays,
  Users,
  BookOpen,
  Megaphone,
  Code2,
  ClipboardCheck,
  LayoutDashboard,
  Heart,
];

const homeNavigation = [{ path: "/" as const, title: "Home" }, ...societySections];

function LanguageSwitch() {
  const { language, setLanguage } = useSocietyLanguage();

  return (
    <div className="flex shrink-0 items-center gap-1" aria-label="Website language">
      <Button
        type="button"
        size="sm"
        variant={language === "en" ? "default" : "ghost"}
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
      >
        EN
      </Button>
      <Button
        type="button"
        size="sm"
        variant={language === "ur" ? "default" : "ghost"}
        aria-pressed={language === "ur"}
        onClick={() => setLanguage("ur")}
        className="font-urdu"
      >
        اردو
      </Button>
    </div>
  );
}

function HomeHeader() {
  const { language } = useSocietyLanguage();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 8);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}
    >
      <div className="mx-auto grid min-h-16 max-w-[1600px] grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 px-4 sm:min-h-20 sm:gap-4 sm:px-6 xl:flex xl:gap-6 xl:px-8">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5 sm:gap-3"
          aria-label={language === "ur" ? "المہدی ایجوکیشنل سوسائٹی، صفحۂ اول" : "Al Mehdi Educational Society, Home"}
        >
          <img
            src={societyLogo.url}
            alt="Al Mehdi Educational Society logo"
            className="size-10 shrink-0 object-contain sm:size-12"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-bold text-deep sm:text-base">
              {language === "ur" ? "المہدی" : "Al Mehdi"}
            </span>
            <span className="hidden text-[10px] text-muted-foreground sm:block">
              {language === "ur" ? "ایجوکیشنل سوسائٹی" : "Educational Society"}
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden min-w-0 flex-1 flex-wrap items-center justify-end gap-x-3 gap-y-2 xl:flex 2xl:gap-x-4"
        >
          {homeNavigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              aria-current={pathname === item.path ? "page" : undefined}
              className={`whitespace-nowrap border-b py-2 text-[10px] font-semibold uppercase transition-colors 2xl:text-[11px] ${pathname === item.path ? "border-gold text-teal" : "border-transparent text-foreground/75 hover:border-gold/70 hover:text-teal"}`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-self-end gap-1.5 sm:gap-2 xl:ms-2">
          <LanguageSwitch />
          <div className="xl:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button type="button" variant="ghost" size="icon" aria-label="Open navigation menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(88vw,24rem)] overflow-y-auto bg-background p-5 sm:p-7">
                <SheetTitle className="sr-only">
                  {language === "ur" ? "مرکزی مینو" : "Main navigation"}
                </SheetTitle>
                <SheetDescription className="sr-only">
                  {language === "ur" ? "المہدی ایجوکیشنل سوسائٹی کے صفحات" : "Al Mehdi Educational Society pages"}
                </SheetDescription>
                <nav aria-label="Mobile navigation" className="mt-7">
                  <ul className="flex flex-col gap-1">
                    {homeNavigation.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          aria-current={pathname === item.path ? "page" : undefined}
                          onClick={() => setMenuOpen(false)}
                          className={`flex min-h-11 items-center border-s-2 px-3 text-sm font-semibold transition-colors ${pathname === item.path ? "border-gold bg-pearl text-teal" : "border-transparent text-foreground hover:border-gold hover:bg-pearl/70"}`}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}


type LectureScheduleItem = {
  id: string;
  maulanaName: string;
  maulanaPhoto: string;
  topic: string;
  date: string; // YYYY-MM-DD
  venue: string; // Full venue name and address
  published: boolean;
};

// This stays empty until actual lectures are added through the Admin Dashboard.
// In the Supabase phase, this array will be replaced with published database records.
const lectureSchedule: LectureScheduleItem[] = [];

const scheduleWeekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function scheduleDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatScheduleDate(date: Date, options: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(date);
}

function MonthlyLectureSchedule() {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(() => scheduleDateKey(new Date()));

  const monthDays = (() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const offset = (new Date(year, month, 1).getDay() + 6) % 7;
    const count = new Date(year, month + 1, 0).getDate();
    return [
      ...Array.from({ length: offset }, () => null),
      ...Array.from({ length: count }, (_, index) => index + 1),
    ];
  })();

  const monthLectures = lectureSchedule
    .filter((lecture) => {
      const date = new Date(`${lecture.date}T12:00:00`);
      return lecture.published &&
        date.getFullYear() === visibleMonth.getFullYear() &&
        date.getMonth() === visibleMonth.getMonth();
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const today = scheduleDateKey(new Date());
  const upcomingLecture = lectureSchedule
    .filter((lecture) => lecture.published && lecture.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  const selectedLectures = monthLectures.filter((lecture) => lecture.date === selectedDate);
  const lectureDates = new Set(monthLectures.map((lecture) => lecture.date));

  return (
    <section aria-labelledby="monthly-lecture-heading" className="bg-pearl px-4 py-12 sm:px-6 sm:py-16 xl:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 text-center sm:mb-9">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">
            Al Mehdi Educational Society
          </span>
          <h2 id="monthly-lecture-heading" className="mt-2 font-display text-2xl font-bold text-deep sm:text-3xl">
            Monthly Lecture Schedule
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-px w-20 bg-gold" />
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
          <section className="h-full border border-border bg-card p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center bg-teal text-primary-foreground">
                <CalendarDays className="size-5" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal">Next on the schedule</p>
                <h3 className="font-display text-lg font-bold text-deep">Upcoming Lecture</h3>
              </div>
            </div>

            {upcomingLecture ? (
              <Link to="/lectures" className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                <div className="grid gap-4 sm:grid-cols-[minmax(112px,0.72fr)_1.28fr]">
                  <div className="aspect-[4/5] overflow-hidden bg-pearl">
                    {upcomingLecture.maulanaPhoto ? (
                      <img src={upcomingLecture.maulanaPhoto} alt={upcomingLecture.maulanaName} className="size-full object-cover" />
                    ) : (
                      <div className="flex size-full items-center justify-center text-teal/60">
                        <BookOpen className="size-12" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-3">
                    <span className="border border-gold/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal">Upcoming</span>
                    <div>
                      <h4 className="font-display text-lg font-bold text-deep group-hover:text-teal">{upcomingLecture.maulanaName}</h4>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{upcomingLecture.topic}</p>
                    </div>
                    <p className="flex items-center gap-2 text-sm font-medium text-deep">
                      <CalendarDays className="size-4 text-teal" />
                      {formatScheduleDate(new Date(`${upcomingLecture.date}T12:00:00`))}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock3 className="size-4 shrink-0 text-teal" />
                      Baad Namaz-e-Zuhrain
                    </p>
                    <p className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-teal" />
                      {upcomingLecture.venue}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-2 text-xs font-bold uppercase tracking-wider text-teal">
                      View Lecture <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center border border-dashed border-border bg-pearl/60 px-5 py-8 text-center">
                <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <CalendarDays className="size-6" />
                </span>
                <h4 className="font-display text-base font-semibold text-deep">No Upcoming Lecture</h4>
                <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                  Upcoming lecture details will appear here once they are added and published by the administrator.
                </p>
              </div>
            )}
          </section>

          <section className="border border-border bg-card p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal">Browse by date</p>
                <h3 className="font-display text-lg font-bold text-deep">Monthly Schedule</h3>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))} aria-label="Previous month" className="flex size-9 items-center justify-center border border-border text-deep hover:border-gold hover:bg-pearl">
                  <ChevronLeft className="size-4" />
                </button>
                <span className="min-w-32 text-center text-sm font-semibold text-deep">
                  {new Intl.DateTimeFormat("en-PK", { month: "long", year: "numeric" }).format(visibleMonth)}
                </span>
                <button type="button" onClick={() => setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))} aria-label="Next month" className="flex size-9 items-center justify-center border border-border text-deep hover:border-gold hover:bg-pearl">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {scheduleWeekdays.map((day) => (
                <div key={day} className="py-2 text-center text-[10px] font-bold uppercase tracking-wide text-muted-foreground sm:text-xs">{day}</div>
              ))}
              {monthDays.map((day, index) => {
                if (!day) return <div key={`blank-${index}`} />;
                const date = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day);
                const key = scheduleDateKey(date);
                const hasLecture = lectureDates.has(key);
                const isSelected = selectedDate === key;
                const isToday = key === today;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedDate(key)}
                    aria-pressed={isSelected}
                    className={`relative flex aspect-square min-h-9 items-center justify-center border text-xs font-medium transition-colors sm:text-sm ${
                      isSelected ? "border-teal bg-teal text-primary-foreground" :
                      isToday ? "border-gold bg-pearl text-deep" :
                      "border-transparent text-foreground hover:border-border hover:bg-pearl"
                    }`}
                  >
                    {day}
                    {hasLecture && <span aria-label="Lecture scheduled" className={`absolute bottom-1 size-1 rounded-full ${isSelected ? "bg-primary-foreground" : "bg-gold"}`} />}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <h4 className="mb-3 text-sm font-bold text-deep">
                {formatScheduleDate(new Date(`${selectedDate}T12:00:00`), { weekday: "long", day: "numeric", month: "long" })}
              </h4>
              {selectedLectures.length ? (
                <div className="space-y-3">
                  {selectedLectures.map((lecture) => (
                    <Link key={lecture.id} to="/lectures" className="flex items-center justify-between gap-3 border border-border p-3 hover:border-gold hover:bg-pearl/60">
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-deep">{lecture.maulanaName}</span>
                        <span className="mt-1 block text-xs text-muted-foreground">{lecture.topic}</span>
                        <span className="mt-1 block text-xs text-muted-foreground">Baad Namaz-e-Zuhrain · {lecture.venue}</span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-teal" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="border border-dashed border-border bg-pearl/50 px-4 py-4 text-sm leading-6 text-muted-foreground">
                  No lecture is scheduled for this date. Select another date to view its lectures.
                </p>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs text-muted-foreground">{monthLectures.length} {monthLectures.length === 1 ? "lecture" : "lectures"} this month</span>
              <Link to="/lectures" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-teal hover:text-deep">
                All Lectures <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

function SectionCards() {
  return (
    <section aria-label="Website sections" className="bg-background px-4 py-10 sm:px-6 sm:py-14 xl:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {societySections.map((section, index) => {
          const Icon = sectionIcons[index] ?? Newspaper;
          return (
            <Link
              key={section.path}
              to={section.path}
              className="group flex min-h-28 min-w-0 flex-col items-center justify-center gap-3 border border-border bg-card px-3 py-4 text-center transition duration-200 hover:-translate-y-1 hover:border-gold/70 hover:bg-pearl/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:min-h-32"
            >
              <span className="flex size-10 shrink-0 items-center justify-center border border-gold/50 text-teal transition-colors group-hover:bg-teal group-hover:text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-balance text-xs font-semibold text-deep sm:text-sm">
                {section.title}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function EmptyFeaturedArea() {
  return (
    <section aria-label="Featured visual area" className="bg-pearl px-4 py-12 sm:px-6 sm:py-16 xl:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
        <div aria-hidden="true" className="pattern-geometric aspect-[4/3] border border-border/70 bg-deep" />
        <div aria-hidden="true" className="pattern-geometric aspect-[4/3] border border-border/70 bg-deep" />
        <div aria-hidden="true" className="pattern-geometric aspect-[4/3] border border-border/70 bg-deep" />
      </div>
    </section>
  );
}

function HomeFooter() {
  return (
    <footer className="bg-deep text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-9 sm:px-6 lg:flex-row lg:items-center lg:justify-between xl:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Al Mehdi Educational Society, Home">
          <img
            src={societyLogo.url}
            alt="Al Mehdi Educational Society logo"
            className="size-11 shrink-0 object-contain"
          />
          <span className="font-display text-sm font-semibold">Al Mehdi Educational Society</span>
        </Link>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-4 gap-y-2">
          {homeNavigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="whitespace-nowrap py-1 text-xs font-medium text-primary-foreground/75 transition-colors hover:text-gold"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div aria-hidden="true" className="flex shrink-0 items-center gap-4 text-primary-foreground/75">
          <Instagram className="size-4" />
          <Youtube className="size-4" />
        </div>
      </div>
    </footer>
  );
}

export function SocietyHomePage() {
  const { language } = useSocietyLanguage();
  const isUrdu = language === "ur";

  return (
    <div className="min-h-svh bg-background">
      <HomeHeader />
      <main>
        <section className="relative isolate flex min-h-[410px] overflow-hidden bg-deep text-primary-foreground sm:min-h-[500px] xl:min-h-[660px]">
          <div aria-hidden="true" className="pattern-geometric pointer-events-none absolute inset-0 opacity-70" />
          <div
            dir={isUrdu ? "rtl" : "ltr"}
            className="relative mx-auto flex w-full max-w-7xl items-center px-6 py-12 sm:px-8 sm:py-16 xl:px-12"
          >
            <div className="flex max-w-3xl flex-col items-start gap-5 sm:gap-7">
              <img
                src={societyLogo.url}
                alt="Al Mehdi Educational Society logo"
                className="size-16 shrink-0 object-contain sm:size-20 xl:size-24"
              />
              {isUrdu ? (
                <>
                  <h1 className="font-urdu text-3xl font-semibold leading-[1.9] text-primary-foreground sm:text-4xl xl:text-5xl">
                    المہدی ایجوکیشنل سوسائٹی
                  </h1>
                  <span className="font-display text-xs font-semibold uppercase text-gold sm:text-sm">
                    Al Mehdi Educational Society
                  </span>
                </>
              ) : (
                <>
                  <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl xl:text-6xl">
                    Al Mehdi Educational Society
                  </h1>
                  <span className="font-urdu text-xl font-medium leading-relaxed text-gold sm:text-2xl">
                    المہدی ایجوکیشنل سوسائٹی
                  </span>
                </>
              )}
              <div aria-hidden="true" className="mt-2 h-px w-20 bg-gold sm:w-28" />
            </div>
          </div>
        </section>
        <MonthlyLectureSchedule />
        <SectionCards />
        <EmptyFeaturedArea />
      </main>
      <HomeFooter />
    </div>
  );
}
