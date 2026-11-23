import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Code2,
  Heart,
  Instagram,
  LayoutDashboard,
  Megaphone,
  Menu,
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
        <SectionCards />
        <EmptyFeaturedArea />
      </main>
      <HomeFooter />
    </div>
  );
}
