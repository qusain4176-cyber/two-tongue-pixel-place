import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Camera,
  Clock3,
  Compass,
  Globe2,
  Landmark,
  MapPin,
  Menu,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import societyLogo from "@/assets/al-mehdi-logo.png.asset.json";
import { useSocietyLanguage } from "@/lib/society-language";

type PageKey =
  | "home"
  | "about"
  | "lectures"
  | "recent"
  | "all"
  | "gallery"
  | "gallery-detail"
  | "videos"
  | "contact"
  | "lecture-detail"
  | "admin";

const copy = {
  en: {
    nav: ["Home", "About", "Lectures", "Recent lectures", "Gallery", "Videos", "Contact"],
    tagline: "Knowledge, Awareness & Enlightenment.",
    homeTitle: "A place to learn.\nA community to grow with.",
    intro: "Every Sunday, Al Mehdi Educational Society brings people together for thoughtful teaching, good questions, and shared learning.",
    explore: "Explore lectures",
    aboutUs: "About the society",
    sunday: "Every Sunday · Karachi, Pakistan",
    upcoming: "Upcoming lectures",
    recent: "Recently conducted",
    upcomingNote: "Published lectures will appear here when society content is connected.",
    recentNote: "Past gatherings and their recordings will be shared here.",
    allLectures: "All lectures",
    aboutEyebrow: "Our purpose",
    aboutTitle: "Learning is better when it brings us together.",
    aboutBody: "Al Mehdi Educational Society creates a welcoming place for weekly Sunday lectures, meaningful conversation, and shared educational growth. We believe understanding grows when curious minds come together.",
    mission: "Our mission",
    missionBody: "To make accessible education and thoughtful conversation part of everyday life, welcoming people of every background.",
    vision: "Our vision",
    visionBody: "A connected community that learns, reflects, and grows through knowledge and a shared sense of purpose.",
    gallery: "A community, in pictures.",
    galleryNote: "Photographs from society gatherings will be added here.",
    videos: "Ideas that stay with you.",
    videosNote: "Recorded lectures will be available here when shared by the society.",
    visit: "Everyone is welcome",
    visitTitle: "Make a Sunday for us.",
    visitBody: "Join an upcoming Sunday lecture in Karachi. Further venue and contact details will be shared here when available.",
    venue: "Sunday gatherings",
    venueNote: "Venue details will be announced soon.",
    detailMissing: "This item is not available yet. Published society content will appear here.",
    adminTitle: "Administrator access",
    adminNote: "Administrator sign-in will be available after the society’s external service is connected and access is configured.",
    goHome: "Back to home",
    viewAll: "View all",
    language: "Choose website language",
    menuOpen: "Open navigation",
    menuClose: "Close navigation",
    footer: "A Sunday gathering place for curious minds.",
    learn: "Learn together, every Sunday",
  },
  ur: {
    nav: ["صفحۂ اول", "ہمارا تعارف", "خطابات", "گزشتہ خطابات", "تصاویر", "ویڈیوز", "رابطہ"],
    tagline: "علم، آگہی اور روشنی۔",
    homeTitle: "علم کا چراغ۔\nایک ساتھ، ہمیشہ۔",
    intro: "ہر اتوار، المہدی ایجوکیشنل سوسائٹی علم، سوال اور مل کر سیکھنے کے لیے لوگوں کو ایک جگہ جمع کرتی ہے۔",
    explore: "خطابات دیکھیے",
    aboutUs: "سوسائٹی کا تعارف",
    sunday: "ہر اتوار · کراچی، پاکستان",
    upcoming: "آنے والے خطابات",
    recent: "گزشتہ خطابات",
    upcomingNote: "سوسائٹی کا ڈیٹا منسلک ہونے پر شائع شدہ خطابات یہاں دکھائی دیں گے۔",
    recentNote: "گزشتہ محفلوں اور ان کی ریکارڈنگز کی تفصیل یہاں شیئر کی جائے گی۔",
    allLectures: "تمام خطابات",
    aboutEyebrow: "ہمارا مقصد",
    aboutTitle: "علم بھی بڑھے، رشتے بھی جڑیں۔",
    aboutBody: "المہدی ایجوکیشنل سوسائٹی ہر اتوار، تعلیمی خطابات، بامعنی گفتگو اور مل کر سیکھنے کے لیے ایک خوشگوار جگہ فراہم کرتی ہے۔ ہمارا یقین ہے کہ جستجو کرنے والے ذہن جب مل بیٹھتے ہیں تو سمجھ اور شعور پروان چڑھتے ہیں۔",
    mission: "ہمارا مشن",
    missionBody: "ہر پس منظر سے تعلق رکھنے والے افراد کے لیے علم، گفتگو اور سیکھنے کے مواقع آسانی سے مہیا کرنا۔",
    vision: "ہمارا وژن",
    visionBody: "ایسا باخبر معاشرہ جو علم، غوروفکر اور مشترکہ مقصد سے جڑا ہوا ہو۔",
    gallery: "ہماری محفل، ہماری تصویریں۔",
    galleryNote: "سوسائٹی کی محفلوں کی تصاویر یہاں شامل کی جائیں گی۔",
    videos: "علم کی ایسی باتیں جو یاد رہ جائیں۔",
    videosNote: "سوسائٹی کی فراہم کردہ ریکارڈنگز یہاں دستیاب ہوں گی۔",
    visit: "آپ سب خوش آمدید ہیں",
    visitTitle: "آئیے، ایک اتوار ہمارے نام کریں۔",
    visitBody: "کراچی میں آنے والے اتوار کے خطاب میں شامل ہوں۔ مقام اور رابطے کی مزید تفصیل دستیاب ہونے پر یہاں دی جائے گی۔",
    venue: "اتوار کی محفلیں",
    venueNote: "محفل کے مقام کی تفصیل جلد بتائی جائے گی۔",
    detailMissing: "یہ تفصیل ابھی دستیاب نہیں۔ سوسائٹی کی شائع کردہ معلومات یہاں دکھائی جائیں گی۔",
    adminTitle: "منتظم کا داخلہ",
    adminNote: "سوسائٹی کی بیرونی سروس منسلک اور رسائی ترتیب دینے کے بعد منتظم کا داخلہ دستیاب ہوگا۔",
    goHome: "صفحۂ اول پر واپس",
    viewAll: "سب دیکھیے",
    language: "ویب سائٹ کی زبان منتخب کریں",
    menuOpen: "مینو کھولیے",
    menuClose: "مینو بند کیجیے",
    footer: "ہر اتوار، علم کے متلاشی ذہنوں کی محفل۔",
    learn: "ہر اتوار، مل کر سیکھیے",
  },
} as const;

const navPaths = ["/", "/about", "/lectures", "/recently-conducted", "/gallery", "/videos", "/contact"] as const;

function SocietyLogo({ small = false }: { small?: boolean }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className={`${small ? "size-11 text-xl" : "size-32 text-5xl"} flex shrink-0 items-center justify-center rounded-full bg-pearl font-bold text-teal`} aria-label="Al Mehdi logo">
      م
    </div>
  ) : (
    <img
      src={societyLogo.url}
      onError={() => setFailed(true)}
      className={`${small ? "size-11" : "size-32 sm:size-40"} shrink-0 rounded-full object-cover ring-2 ring-gold/60`}
      alt="Al Mehdi Educational Society logo"
    />
  );
}

function LanguageSwitch() {
  const { language, setLanguage } = useSocietyLanguage();
  return (
    <div className="inline-flex items-center gap-1" aria-label={copy[language].language}>
      <Button size="sm" variant={language === "en" ? "default" : "ghost"} aria-pressed={language === "en"} onClick={() => setLanguage("en")} className="min-w-11">
        EN
      </Button>
      <Button size="sm" variant={language === "ur" ? "default" : "ghost"} aria-pressed={language === "ur"} onClick={() => setLanguage("ur")} className="min-w-14 font-urdu">
        اردو
      </Button>
    </div>
  );
}

function SiteHeader() {
  const { language } = useSocietyLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];
  const direction = language === "ur" ? "rtl" : "ltr";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-9" dir={direction}>
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label={language === "ur" ? "المہدی ایجوکیشنل سوسائٹی" : "Al Mehdi Educational Society"}>
          <SocietyLogo small />
          <span className="hidden sm:block">
            <span className={`${language === "ur" ? "font-urdu" : "font-display"} block font-bold text-deep`}>{language === "ur" ? "المہدی ایجوکیشنل سوسائٹی" : "Al Mehdi"}</span>
            <span className="block text-[10px] font-medium text-muted-foreground">{language === "ur" ? "تعلیم · آگہی · روشنی" : "Educational Society · Karachi"}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
          {t.nav.map((label, index) => (
            <Link key={navPaths[index]} to={navPaths[index]} className={`${language === "ur" ? "font-urdu text-sm" : "text-xs"} py-3 font-semibold text-foreground/80 transition-colors hover:text-teal`}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitch />
          <Button variant="ghost" size="icon" className="xl:hidden" type="button" aria-label={menuOpen ? t.menuClose : t.menuOpen} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      {menuOpen && (
        <nav className="grid gap-1 border-t border-border bg-background px-5 py-3 xl:hidden" dir={direction} aria-label="Mobile navigation">
          {t.nav.map((label, index) => (
            <Link key={navPaths[index]} to={navPaths[index]} onClick={() => setMenuOpen(false)} className={`${language === "ur" ? "font-urdu text-right" : "text-sm"} rounded-sm px-4 py-3 font-semibold text-foreground hover:bg-pearl hover:text-teal`}>
              {label}
            </Link>
          ))}
          <Link to="/admin/login" onClick={() => setMenuOpen(false)} className={`${language === "ur" ? "font-urdu text-right" : "text-sm"} rounded-sm px-4 py-3 font-semibold text-muted-foreground`}>
            {language === "ur" ? "منتظم کا داخلہ" : "Admin sign in"}
          </Link>
        </nav>
      )}
    </header>
  );
}

function SiteFooter() {
  const { language } = useSocietyLanguage();
  const t = copy[language];
  return (
    <footer className="bg-deep text-primary-foreground" dir={language === "ur" ? "rtl" : "ltr"}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-9 lg:px-9">
        <div className="flex items-center gap-3"><SocietyLogo small /><span className={`${language === "ur" ? "font-urdu" : "font-display"} font-semibold`}>{language === "ur" ? "المہدی ایجوکیشنل سوسائٹی" : "Al Mehdi Educational Society"}</span></div>
        <span className={`${language === "ur" ? "font-urdu text-sm" : "text-xs"} text-primary-foreground/70`}>{t.tagline} {t.footer}</span>
      </div>
      <div className="border-t border-primary-foreground/15 px-5 py-4 text-center text-xs text-primary-foreground/60">© {new Date().getFullYear()} Al Mehdi Educational Society</div>
    </footer>
  );
}

function EmptySection({ title, message, icon = "calendar" }: { title: string; message: string; icon?: "calendar" | "gallery" | "video" }) {
  const Icon = icon === "gallery" ? Camera : icon === "video" ? Play : CalendarDays;
  return (
    <div className="border-y border-border py-10 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-gold/50 bg-pearl text-teal"><Icon className="size-5" /></span>
      <h3 className="mt-4 font-display text-lg font-semibold text-deep">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-muted-foreground">{message}</p>
    </div>
  );
}

function HomePage() {
  const { language } = useSocietyLanguage();
  const t = copy[language];
  const ur = language === "ur";
  return (
    <>
      <section className="relative isolate overflow-hidden bg-deep text-primary-foreground" aria-labelledby="home-title">
        <div aria-hidden="true" className="pattern-geometric pointer-events-none absolute inset-0 -z-10 opacity-90" />
        <div className="mx-auto grid min-h-[590px] max-w-7xl items-center gap-10 px-5 py-14 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-9">
          <div dir={ur ? "rtl" : "ltr"}>
            <div className="inline-flex items-center gap-2 border-b border-gold/50 pb-3 text-xs font-semibold text-gold"><Sparkles className="size-4" />{t.learn}</div>
            <h1 id="home-title" className={`${ur ? "font-urdu text-4xl sm:text-5xl" : "font-display text-4xl sm:text-5xl"} mt-7 max-w-2xl whitespace-pre-line font-bold leading-[1.5] text-primary-foreground`}>{t.homeTitle}</h1>
            <p className={`${ur ? "font-urdu" : ""} mt-5 max-w-xl text-sm leading-8 text-primary-foreground/75`}>{t.intro}</p>
            <p className={`${ur ? "font-urdu" : "font-display"} mt-4 text-lg font-semibold text-gold`}>{t.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className={`${ur ? "font-urdu" : ""} min-h-11 rounded-sm bg-gold px-5 text-deep hover:bg-gold/90`}><Link to="/lectures">{t.explore}{ur ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}</Link></Button>
              <Button asChild variant="outline" className={`${ur ? "font-urdu" : ""} min-h-11 rounded-sm border-primary-foreground/40 bg-transparent px-5 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground`}><Link to="/about">{t.aboutUs}</Link></Button>
            </div>
            <div className={`${ur ? "font-urdu" : ""} mt-9 flex items-center gap-3 text-xs text-primary-foreground/70`}><CalendarDays className="size-4 text-gold" />{t.sunday}</div>
          </div>
          <div className="relative flex min-h-[320px] flex-col items-center justify-center text-center">
            <div className="absolute size-64 rounded-full border border-gold/20 sm:size-80" />
            <div className="absolute size-56 rounded-full border border-gold/30 sm:size-72" />
            <div className="relative flex flex-col items-center">
              <SocietyLogo />
              <p className="mt-5 font-urdu text-xl font-bold leading-relaxed text-gold">المہدی ایجوکیشنل سوسائٹی</p>
              <p className="mt-2 max-w-xs text-xs font-semibold text-primary-foreground/75">AL MEHDI EDUCATIONAL SOCIETY</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-background py-16 sm:py-20" dir={ur ? "rtl" : "ltr"}>
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:gap-16 lg:px-9">
          <div><div className="mb-5 flex items-center justify-between gap-4"><div><span className="text-xs font-bold text-teal">{t.upcoming}</span><h2 className={`${ur ? "font-urdu" : "font-display"} mt-2 text-2xl font-bold text-deep`}>{t.sunday}</h2></div><Link to="/lectures" className={`${ur ? "font-urdu" : ""} text-sm font-semibold text-teal hover:text-gold`}>{t.viewAll}</Link></div><EmptySection title={t.upcoming} message={t.upcomingNote} /></div>
          <div><div className="mb-5 flex items-center justify-between gap-4"><div><span className="text-xs font-bold text-teal">{t.recent}</span><h2 className={`${ur ? "font-urdu" : "font-display"} mt-2 text-2xl font-bold text-deep`}>{t.allLectures}</h2></div><Link to="/recently-conducted" className={`${ur ? "font-urdu" : ""} text-sm font-semibold text-teal hover:text-gold`}>{t.viewAll}</Link></div><EmptySection title={t.recent} message={t.recentNote} /></div>
        </div>
      </section>
      <AboutSection />
      <MediaSections />
      <ContactSection />
    </>
  );
}

function AboutSection() {
  const { language } = useSocietyLanguage();
  const t = copy[language];
  const ur = language === "ur";
  return (
    <section className="bg-pearl/70 py-16 sm:py-20" dir={ur ? "rtl" : "ltr"}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-9">
        <div className="relative flex aspect-square max-h-[440px] items-center justify-center overflow-hidden bg-teal p-8 text-center text-primary-foreground"><div aria-hidden="true" className="pattern-geometric absolute inset-0" /><div className="relative"><Landmark className="mx-auto size-7 text-gold" /><p className="mt-5 font-urdu text-2xl font-bold text-gold">المہدی ایجوکیشنل سوسائٹی</p><p className="mt-3 text-xs font-semibold">AL MEHDI EDUCATIONAL SOCIETY</p></div></div>
        <div><span className={`${ur ? "font-urdu" : ""} text-xs font-bold text-teal`}>{t.aboutEyebrow}</span><h2 className={`${ur ? "font-urdu text-3xl" : "font-display text-3xl sm:text-4xl"} mt-4 font-bold leading-relaxed text-deep`}>{t.aboutTitle}</h2><p className={`${ur ? "font-urdu" : ""} mt-4 text-sm leading-8 text-muted-foreground`}>{t.aboutBody}</p><div className="mt-8 grid gap-7 border-t border-border pt-7 sm:grid-cols-2"><div><Compass className="size-5 text-teal" /><h3 className={`${ur ? "font-urdu" : "font-display"} mt-3 font-bold text-deep`}>{t.mission}</h3><p className={`${ur ? "font-urdu" : ""} mt-2 text-sm leading-7 text-muted-foreground`}>{t.missionBody}</p></div><div><Globe2 className="size-5 text-teal" /><h3 className={`${ur ? "font-urdu" : "font-display"} mt-3 font-bold text-deep`}>{t.vision}</h3><p className={`${ur ? "font-urdu" : ""} mt-2 text-sm leading-7 text-muted-foreground`}>{t.visionBody}</p></div></div></div>
      </div>
    </section>
  );
}

function MediaSections() {
  const { language } = useSocietyLanguage();
  const t = copy[language];
  const ur = language === "ur";
  return (
    <section className="bg-background py-16 sm:py-20" dir={ur ? "rtl" : "ltr"}>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-9">
        <div><div className="mb-5 flex items-center gap-3 text-teal"><Camera className="size-5" /><span className="text-xs font-bold">{t.nav[4]}</span></div><h2 className={`${ur ? "font-urdu text-2xl" : "font-display text-3xl"} font-bold text-deep`}>{t.gallery}</h2><p className={`${ur ? "font-urdu" : ""} mt-3 text-sm leading-7 text-muted-foreground`}>{t.galleryNote}</p><EmptySection title={t.nav[4]} message={t.galleryNote} icon="gallery" /><Link to="/gallery" className={`${ur ? "font-urdu" : ""} mt-5 inline-flex text-sm font-bold text-teal hover:text-gold`}>{t.viewAll}</Link></div>
        <div><div className="mb-5 flex items-center gap-3 text-teal"><Play className="size-5" /><span className="text-xs font-bold">{t.nav[5]}</span></div><h2 className={`${ur ? "font-urdu text-2xl" : "font-display text-3xl"} font-bold text-deep`}>{t.videos}</h2><p className={`${ur ? "font-urdu" : ""} mt-3 text-sm leading-7 text-muted-foreground`}>{t.videosNote}</p><EmptySection title={t.nav[5]} message={t.videosNote} icon="video" /><Link to="/videos" className={`${ur ? "font-urdu" : ""} mt-5 inline-flex text-sm font-bold text-teal hover:text-gold`}>{t.viewAll}</Link></div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { language } = useSocietyLanguage();
  const t = copy[language];
  const ur = language === "ur";
  return (
    <section className="bg-pearl/70 py-16 sm:py-20" dir={ur ? "rtl" : "ltr"}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[1fr_.8fr] lg:gap-20 lg:px-9">
        <div><span className={`${ur ? "font-urdu" : ""} text-xs font-bold text-teal`}>{t.visit}</span><h2 className={`${ur ? "font-urdu text-3xl" : "font-display text-3xl sm:text-4xl"} mt-4 font-bold text-deep`}>{t.visitTitle}</h2><p className={`${ur ? "font-urdu" : ""} mt-4 max-w-xl text-sm leading-8 text-muted-foreground`}>{t.visitBody}</p></div>
        <div className="border-s-2 border-gold px-6 py-4"><MapPin className="size-5 text-teal" /><h3 className={`${ur ? "font-urdu" : "font-display"} mt-4 font-bold text-deep`}>{t.venue}</h3><p className={`${ur ? "font-urdu" : ""} mt-2 text-sm leading-7 text-muted-foreground`}>{t.venueNote}</p><div className={`${ur ? "font-urdu" : ""} mt-4 flex items-center gap-2 text-xs text-teal`}><Clock3 className="size-4 text-gold" />{t.sunday}</div></div>
      </div>
    </section>
  );
}

function EditorialPage({ page }: { page: PageKey }) {
  const { language } = useSocietyLanguage();
  const t = copy[language];
  const ur = language === "ur";
  const heading = page === "about" ? t.aboutTitle
    : page === "recent" ? t.recent
    : page === "all" ? t.allLectures
    : page === "gallery" || page === "gallery-detail" ? t.gallery
    : page === "videos" ? t.videos
    : page === "contact" ? t.visitTitle
    : page === "admin" ? t.adminTitle
    : page === "lecture-detail" ? t.nav[2]
    : t.upcoming;
  const intro = page === "about" ? t.aboutBody
    : page === "recent" ? t.recentNote
    : page === "all" || page === "lectures" || page === "lecture-detail" ? t.upcomingNote
    : page === "gallery" || page === "gallery-detail" ? t.galleryNote
    : page === "videos" ? t.videosNote
    : page === "contact" ? t.visitBody
    : t.adminNote;
  return (
    <>
      <section className="relative overflow-hidden bg-deep py-16 text-primary-foreground sm:py-20" dir={ur ? "rtl" : "ltr"}>
        <div aria-hidden="true" className="pattern-geometric pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-9"><span className={`${ur ? "font-urdu" : ""} text-xs font-semibold text-gold`}>{page === "about" ? t.aboutEyebrow : page === "contact" ? t.visit : t.tagline}</span><h1 className={`${ur ? "font-urdu text-3xl sm:text-4xl" : "font-display text-4xl sm:text-5xl"} mt-5 max-w-3xl font-bold leading-[1.5]`}>{heading}</h1><p className={`${ur ? "font-urdu" : ""} mt-5 max-w-2xl text-sm leading-8 text-primary-foreground/75`}>{intro}</p></div>
      </section>
      <section className="bg-background py-14 sm:py-16" dir={ur ? "rtl" : "ltr"}>
        <div className="mx-auto max-w-7xl px-5 lg:px-9">
          {page === "about" ? <AboutSection />
            : page === "gallery" || page === "gallery-detail" ? <EmptySection title={t.nav[4]} message={t.galleryNote} icon="gallery" />
            : page === "videos" ? <EmptySection title={t.nav[5]} message={t.videosNote} icon="video" />
            : page === "contact" ? <ContactSection />
            : page === "admin" ? <div className="mx-auto max-w-2xl py-8 text-center"><Landmark className="mx-auto size-8 text-teal" /><p className={`${ur ? "font-urdu" : ""} mt-5 text-sm leading-8 text-muted-foreground`}>{t.adminNote}</p></div>
            : page === "all" ? <div className="grid gap-10 lg:grid-cols-2"><div><EmptySection title={t.upcoming} message={t.upcomingNote} /></div><div><EmptySection title={t.recent} message={t.recentNote} /></div></div>
            : <EmptySection title={page === "recent" ? t.recent : t.upcoming} message={page === "recent" ? t.recentNote : page === "lecture-detail" ? t.detailMissing : t.upcomingNote} />}
        </div>
      </section>
      <section className="bg-pearl/70 py-12" dir={ur ? "rtl" : "ltr"}><div className="mx-auto max-w-7xl px-5 lg:px-9"><Link to="/" className={`${ur ? "font-urdu" : ""} inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-gold`}>{ur ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}{t.goHome}</Link></div></section>
    </>
  );
}

export function SocietySitePage({ page }: { page: PageKey }) {
  const { language } = useSocietyLanguage();
  return <div className={language === "ur" ? "font-urdu" : ""}><SiteHeader /><main>{page === "home" ? <HomePage /> : <EditorialPage page={page} />}</main><SiteFooter /></div>;
}