import { useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Compass,
  Globe2,
  Landmark,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import societyLogo from "@/assets/al-mehdi-logo.png.asset.json";
import { useSocietyLanguage } from "@/lib/society-language";
import type { SiteLanguage } from "@/lib/society-language";

type Copy = {
  nav: { home: string; about: string; lectures: string; gallery: string; videos: string; contact: string; admin: string };
  english: string;
  urdu: string;
  eyebrow: string;
  title: string;
  arabic: string;
  tagline: string;
  description: string;
  explore: string;
  aboutButton: string;
  established: string;
  society: string;
  passage: string;
  homes: string;
  featured: string;
  featuredDescription: string;
  upcoming: string;
  upcomingSub: string;
  recent: string;
  recentSub: string;
  emptyLectures: string;
  emptyPhotos: string;
  emptyVideos: string;
  details: string;
  viewAll: string;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutBody: string;
  mission: string;
  missionBody: string;
  vision: string;
  visionBody: string;
  gatheringEyebrow: string;
  gatheringTitle: string;
  galleryEyebrow: string;
  galleryTitle: string;
  videosEyebrow: string;
  videosTitle: string;
  contactEyebrow: string;
  contactTitle: string;
  contactBody: string;
  emailLabel: string;
  venueLabel: string;
  addressPending: string;
  newsletterEyebrow: string;
  newsletterTitle: string;
  newsletterBody: string;
  emailPlaceholder: string;
  subscribe: string;
  successMessage: string;
  footerTagline: string;
  footerSmall: string;
  linkNotice: string;
};

const copyByLanguage: Record<SiteLanguage, Copy> = {
  en: {
    nav: { home: "Home", about: "Our story", lectures: "Lectures", gallery: "Gallery", videos: "Watch", contact: "Visit us", admin: "Admin sign in" },
    english: "English", urdu: "اردو", eyebrow: "Learning, gathered around a Sunday table", title: "A place to learn.\nA community to grow with.", arabic: "المہدی ایجوکیشنل سوسائٹی", tagline: "Knowledge, Awareness & Enlightenment.", description: "Every Sunday, we make space for thoughtful teaching, good questions, and a community that keeps learning together.", explore: "Explore our lectures", aboutButton: "Meet our society", established: "A weekly gathering", society: "AL MEHDI\nEDUCATIONAL SOCIETY", passage: "Knowledge grows when it is shared.", homes: "Karachi · Pakistan", featured: "This week at Al Mehdi", featuredDescription: "Join us this Sunday for an open gathering of learning and reflection.", upcoming: "Coming up", upcomingSub: "Sundays worth setting aside.", recent: "Past gatherings", recentSub: "A growing archive of learning, shared together.", emptyLectures: "Our next Sunday gathering will appear here soon.", emptyPhotos: "Photos from our gatherings will be shared here soon.", emptyVideos: "Recorded lectures will be added here as they become available.", details: "Lecture details", viewAll: "View all", aboutEyebrow: "Why we gather", aboutTitle: "Learning is better\nwhen it brings us together.", aboutBody: "Al Mehdi Educational Society creates a welcoming place for weekly Sunday lectures, meaningful conversation, and shared educational growth. We believe understanding grows when curious minds come together.", mission: "Our mission", missionBody: "To make accessible education and thoughtful conversation part of everyday life, welcoming people of every background.", vision: "Our vision", visionBody: "A connected community that learns, reflects, and grows through knowledge and a shared sense of purpose.", gatheringEyebrow: "A Sunday tradition", gatheringTitle: "One gathering. A world of ideas.", galleryEyebrow: "The moments between the words", galleryTitle: "A community, in pictures.", videosEyebrow: "Listen again", videosTitle: "Ideas that stay with you.", contactEyebrow: "Everyone is welcome", contactTitle: "Make a Sunday for us.", contactBody: "We'd love to welcome you at an upcoming Sunday lecture. Get in touch to learn more about our gatherings and where to find us.", emailLabel: "Write to our society", venueLabel: "Our Sunday gatherings", addressPending: "Gathering details will be announced here soon.", newsletterEyebrow: "Never miss a Sunday", newsletterTitle: "Keep a seat at the table.", newsletterBody: "Get the occasional note about our Sunday lectures and community gatherings.", emailPlaceholder: "Your email address", subscribe: "I'm in", successMessage: "Thanks for your interest! Event updates will be available once our contact details are connected.", footerTagline: "Knowledge, Awareness & Enlightenment.", footerSmall: "A Sunday gathering place for curious minds.", linkNotice: "Content details will be shared soon.",
  },
  ur: {
    nav: { home: "صفحۂ اول", about: "ہمارا تعارف", lectures: "خطابات", gallery: "تصاویر", videos: "ویڈیوز", contact: "رابطہ", admin: "منتظم کا داخلہ" },
    english: "English", urdu: "اردو", eyebrow: "ہر اتوار، علم و فکر کی محفل", title: "علم کا چراغ۔\nایک ساتھ، ہمیشہ۔", arabic: "المہدی ایجوکیشنل سوسائٹی", tagline: "علم، آگہی اور روشنی۔", description: "ہر اتوار، سیکھنے، سوال کرنے اور علم و محبت کے رشتے میں جڑنے کا ایک خوبصورت موقع۔", explore: "ہمارے خطابات دیکھیے", aboutButton: "ہمارا تعارف", established: "ہر ہفتے ایک نئی محفل", society: "المہدی\nایجوکیشنل سوسائٹی", passage: "علم تقسیم کرنے سے بڑھتا ہے۔", homes: "کراچی · پاکستان", featured: "اس ہفتے کی محفل", featuredDescription: "اس اتوار، علم اور فکر کی ایک خوبصورت نشست میں ہمارے ساتھ شامل ہوں۔", upcoming: "آنے والی محفلیں", upcomingSub: "ایسے اتوار جن کے لیے وقت نکالنا چاہیے۔", recent: "گزشتہ محفلیں", recentSub: "علم و یادوں کا ایک بڑھتا ہوا خزانہ۔", emptyLectures: "اگلی اتوار کی نشست کی تفصیل جلد یہاں ہوگی۔", emptyPhotos: "ہماری محفلوں کی تصاویر جلد یہاں شیئر کی جائیں گی۔", emptyVideos: "ریکارڈ شدہ خطابات جلد یہاں دیکھے جا سکیں گے۔", details: "خطاب کی تفصیل", viewAll: "سب دیکھیے", aboutEyebrow: "ہمارے اجتماع کا مقصد", aboutTitle: "علم بھی بڑھے۔\nرشتے بھی جڑیں۔", aboutBody: "المہدی ایجوکیشنل سوسائٹی ہر اتوار، تعلیمی خطابات، بامعنی گفتگو اور مل کر سیکھنے کے لیے ایک خوشگوار جگہ فراہم کرتی ہے۔ ہمارا یقین ہے کہ جستجو کرنے والے ذہن جب مل بیٹھتے ہیں، تو سمجھ اور شعور دونوں پروان چڑھتے ہیں۔", mission: "ہمارا مشن", missionBody: "ہر پس منظر سے تعلق رکھنے والے افراد کے لیے علم، گفتگو اور سیکھنے کے مواقع آسانی سے مہیا کرنا۔", vision: "ہمارا وژن", visionBody: "ایسا باخبر معاشرہ جو علم، غوروفکر اور مشترکہ مقصد سے جڑا ہوا ہو۔", gatheringEyebrow: "اتوار کی خوبصورت روایت", gatheringTitle: "ایک محفل۔ نئے خیالات کی ایک دنیا۔", galleryEyebrow: "الفاظ سے آگے، محفل کی یادیں", galleryTitle: "ہماری محفل، ہماری تصویریں۔", videosEyebrow: "دوبارہ سنیے", videosTitle: "علم کی ایسی باتیں جو یاد رہ جائیں۔", contactEyebrow: "آپ سب خوش آمدید ہیں", contactTitle: "آئیے، ایک اتوار ہمارے نام کریں۔", contactBody: "آنے والی اتوار کی علمی نشست میں آپ کو خوش آمدید کہیں گے۔ ہماری محفلوں اور مقام کی مزید تفصیل کے لیے ہم سے رابطہ کریں۔", emailLabel: "ہمیں پیغام بھیجیے", venueLabel: "اتوار کی ہماری محفلیں", addressPending: "محفل کے مقام کی تفصیل یہاں جلد بتائی جائے گی۔", newsletterEyebrow: "ہر اتوار ہمارے ساتھ", newsletterTitle: "اگلی محفل میں آپ کی جگہ محفوظ ہے۔", newsletterBody: "ہمارے اتوار کے خطابات اور کمیونٹی کی نشستوں کے بارے میں مختصر خبریں حاصل کریں۔", emailPlaceholder: "آپ کا ای میل ایڈریس", subscribe: "شامل کیجیے", successMessage: "آپ کی دلچسپی کا شکریہ! روابط شامل ہوتے ہی محفلوں کی خبریں آپ تک پہنچنے لگیں گی۔", footerTagline: "علم، آگہی اور روشنی۔", footerSmall: "ہر اتوار، علم کے متلاشی ذہنوں کی محفل۔", linkNotice: "اس صفحے کی تفصیل جلد فراہم کی جائے گی۔",
  },
};

function SocietyLogo({ small = false }: { small?: boolean }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className={`${small ? "size-12 text-xl" : "size-28 text-5xl"} flex shrink-0 items-center justify-center rounded-full bg-pearl font-urdu font-bold text-teal`} aria-label="Al Mehdi logo fallback">
      م
    </div>
  ) : (
    <img
      src={societyLogo.url}
      onError={() => setFailed(true)}
      className={`${small ? "size-12" : "size-28 sm:size-36"} shrink-0 rounded-full object-cover shadow-lg ring-2 ring-gold/60`}
      alt="Al Mehdi Educational Society logo"
    />
  );
}

function LanguageSwitch() {
  const { language, setLanguage } = useSocietyLanguage();
  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-border bg-background p-1" aria-label="Choose website language">
      {(["en", "ur"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLanguage(option)}
          aria-pressed={language === option}
          className={`${language === option ? "bg-teal text-primary-foreground" : "text-muted-foreground hover:text-foreground"} min-h-9 min-w-14 rounded-full px-3 text-xs font-semibold transition-colors ${option === "ur" ? "font-urdu" : ""}`}
        >
          {option === "en" ? "EN" : "اردو"}
        </button>
      ))}
    </div>
  );
}

function Navigation({ t, ur, pathname }: { t: Copy; ur: boolean; pathname: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.lectures, href: "/lectures" },
    { label: t.nav.gallery, href: "/gallery" },
    { label: t.nav.videos, href: "/videos" },
    { label: t.nav.contact, href: "/contact" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-9" dir={ur ? "rtl" : "ltr"}>
        <a href="/" className="flex min-w-0 items-center gap-3" aria-label={t.society.replace("\n", " ")}>
          <SocietyLogo small />
          <span className="hidden min-w-0 sm:block">
            <span className={`${ur ? "font-urdu" : "font-display"} block text-sm font-bold leading-6 text-deep sm:text-base`}>
              {ur ? "المہدی ایجوکیشنل سوسائٹی" : "Al Mehdi"}
            </span>
            <span className="block truncate text-[10px] font-semibold uppercase leading-4 tracking-normal text-muted-foreground">{ur ? "تعلیم · آگہی · روشنی" : "Educational Society · Karachi"}</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map(({ label, href }) => (
            <a key={href} href={href} aria-current={pathname === href ? "page" : undefined} className={`${pathname === href ? "text-teal" : "text-foreground/80 hover:text-teal"} ${ur ? "font-urdu text-[15px]" : "text-xs"} py-3 font-semibold transition-colors`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitch />
          <a href="/admin/login" aria-label={t.nav.admin} title={t.nav.admin} className="hidden size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-pearl hover:text-teal sm:flex"><Landmark className="size-4" /></a>
          <button className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
      </div>
      {menuOpen && <nav className="grid gap-1 border-t border-border bg-background px-5 py-3 lg:hidden" dir={ur ? "rtl" : "ltr"} aria-label="Mobile navigation">{links.map(({ label, href }) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className={`${ur ? "font-urdu text-right text-base" : "text-sm"} rounded-lg px-4 py-3 font-semibold text-foreground hover:bg-pearl hover:text-teal`}>{label}</a>)}<a href="/admin/login" className={`${ur ? "font-urdu text-right" : "text-sm"} rounded-lg px-4 py-3 font-semibold text-muted-foreground">{t.nav.admin}</a></nav>}
    </header>
  );
}

function SiteFooter({ t, ur }: { t: Copy; ur: boolean }) {
  return (
    <footer className="bg-deep text-primary-foreground" dir={ur ? "rtl" : "ltr"}>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.1fr_.8fr_1fr] lg:px-9">
        <div>
          <a href="/" className="flex items-center gap-3"><SocietyLogo small /><span className={`${ur ? "font-urdu text-base" : "font-display"} font-semibold leading-relaxed`}>{ur ? "المہدی ایجوکیشنل سوسائٹی" : "Al Mehdi Educational Society"}</span></a>
          <p className={`${ur ? "font-urdu text-sm" : "text-sm"} mt-5 max-w-xs leading-8 text-primary-foreground/75`}>{t.footerTagline} {t.footerSmall}</p>
        </div>
        <div>
          <h3 className={`${ur ? "font-urdu" : "font-display"} text-sm font-bold text-gold`}>{ur ? "ویب سائٹ" : "Explore"}</h3>
          <div className="mt-5 grid gap-3" dir={ur ? "rtl" : "ltr"}>{[[t.nav.home, "/"], [t.nav.about, "/about"], [t.nav.lectures, "/lectures"], [t.nav.gallery, "/gallery"], [t.nav.videos, "/videos"]].map(([label, href]) => <a key={href} className={`${ur ? "font-urdu text-sm" : "text-sm"} text-primary-foreground/75 transition-colors hover:text-gold`} href={href}>{label}</a>)}</div>
        </div>
        <div>
          <h3 className={`${ur ? "font-urdu" : "font-display"} text-sm font-bold text-gold`}>{t.contactTitle}</h3>
          <p className={`${ur ? "font-urdu text-sm" : "text-sm"} mt-3 leading-7 text-primary-foreground/75`}>{t.contactBody}</p>
          <a className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-foreground transition-colors hover:text-gold" href="mailto:info@almehdieducation.org"><Mail className="size-4" />{t.emailLabel}</a>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-5 py-5 text-xs text-primary-foreground/60 lg:px-9"><span>© {new Date().getFullYear()} Al Mehdi Educational Society</span><span className={ur ? "font-urdu" : ""}>{t.footerTagline}</span></div></div>
    </footer>
  );
}

function PageFrame({ children, pathname }: { children: React.ReactNode; pathname: string }) {
  const { language } = useSocietyLanguage();
  const ur = language === "ur";
  const t = copyByLanguage[language];
  return <><Navigation t={t} ur={ur} pathname={pathname} /><main className={ur ? "font-urdu text-base" : ""} dir={ur ? "rtl" : "ltr"}>{children}</main><SiteFooter t={t} ur={ur} /></>;
}

function FeatureGallery({ t, ur, home = false }: { t: Copy; ur: boolean; home?: boolean }) {
  return (
    <section id="gallery" className="overflow-hidden bg-pearl/70 py-20 sm:py-24" dir={ur ? "rtl" : "ltr"}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-9">
        <div><span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase leading-5 tracking-widest text-teal sm:text-[11px]"><span className="size-7 rounded-full border border-gold/50 bg-background p-1.5"><Compass className="size-4 text-gold" /></span>{t.galleryEyebrow}</span><h2 className={`${ur ? "font-urdu text-3xl" : "font-display text-balance text-3xl sm:text-[38px]"} mt-5 font-bold leading-[1.6] text-deep`}>{home ? t.galleryTitle : t.galleryTitle}</h2><p className={`${ur ? "text-base" : "text-sm"} mt-4 leading-8 text-muted-foreground`}>{t.emptyPhotos}</p><a href="/gallery" className={`${ur ? "font-urdu text-sm" : "text-xs"} mt-7 inline-flex items-center gap-2 font-bold text-teal transition-colors hover:text-gold`}>{t.viewAll}{ur ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}</a></div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="flex aspect-[.88] flex-col justify-end overflow-hidden rounded-sm border border-gold/15 bg-[linear-gradient(160deg,var(--color-teal),var(--color-deep))] p-4 sm:p-7"><span className="mb-auto inline-flex size-10 items-center justify-center rounded-full border border-gold/30 text-gold"><Landmark className="size-5" /></span><span className={`${ur ? "font-urdu" : "font-display"} text-lg font-semibold leading-relaxed text-primary-foreground sm:text-2xl`}>{t.society.split("\n")[0]}</span><span className={`${ur ? "text-xs" : "text-xs"} mt-1 text-primary-foreground/70`}>{t.homes}</span></div>
          <div className="flex aspect-[.88] flex-col justify-between overflow-hidden rounded-sm border border-border bg-background p-4 sm:p-7"><span className="inline-flex size-10 items-center justify-center rounded-full bg-pearl text-teal"><Sparkles className="size-5" /></span><div><span className="block text-[10px] font-bold uppercase tracking-widest text-gold">Al Mehdi · Sunday gatherings</span><p className={`${ur ? "font-urdu text-base" : "font-display text-lg"} mt-3 leading-relaxed text-deep sm:text-2xl`}>{t.passage}</p><span className={`${ur ? "font-urdu text-[11px]" : "text-[11px]"} mt-3 block text-muted-foreground`}>{t.footerTagline}</span></div></div>
        </div>
      </div>
    </section>
  );
}

function FeatureVideo({ t, ur }: { t: Copy; ur: boolean }) {
  return <section id="videos" className="bg-background py-20 sm:py-24" dir={ur ? "rtl" : "ltr"}><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-20 lg:px-9"><div className="order-2 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-sm border border-gold/15 bg-[linear-gradient(155deg,var(--color-deep),var(--color-teal))] p-8 order-first lg:order-last"><div className="pattern-geometric flex size-full items-center justify-center"><div className="flex size-16 items-center justify-center rounded-full border border-gold/60 bg-gold text-deep"><Play className="ms-1 size-6 fill-current" /></div></div></div><div><span className="text-[10px] font-bold uppercase tracking-widest text-teal sm:text-[11px]">{t.videosEyebrow}</span><h2 className={`${ur ? "font-urdu text-3xl" : "font-display text-balance text-3xl sm:text-[38px]"} mt-5 font-bold leading-[1.6] text-deep`}>{t.videosTitle}</h2><p className={`${ur ? "text-base" : "text-sm"} mt-4 leading-8 text-muted-foreground`}>{t.emptyVideos}</p><a href="/videos" className={`${ur ? "font-urdu text-sm" : "text-xs"} mt-7 inline-flex items-center gap-2 font-bold text-teal hover:text-gold`}>{t.viewAll}{ur ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}</a></div></div></section>;
}

function HomeContent() {
  const { language } = useSocietyLanguage();
  const ur = language === "ur";
  const t = copyByLanguage[language];
  const navPath = "/";
  return <PageFrame pathname={navPath}>
    <section className="relative isolate overflow-hidden bg-deep text-primary-foreground" aria-labelledby="home-title">
      <div aria-hidden="true" className="pattern-geometric pointer-events-none absolute inset-0 -z-20 opacity-90" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(115deg,transparent_24%,color-mix(in_oklab,var(--color-gold)_12%,transparent)_51%,transparent_79%)]" />
      <div className="mx-auto grid min-h-[610px] max-w-7xl items-center gap-10 px-5 pb-20 pt-16 sm:min-h-[640px] sm:pt-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-0 lg:px-9 lg:pb-24">
        <div className="relative z-10 max-w-2xl" dir={ur ? "rtl" : "ltr"}>
          <div className="inline-flex items-center gap-2 border-b border-gold/50 pb-3 text-[10px] font-semibold uppercase tracking-widest text-gold sm:text-[11px]"><Sparkles className="size-3.5" />{t.eyebrow}</div>
          <h1 id="home-title" className={`${ur ? "font-urdu text-[38px] sm:text-[46px]" : "font-display text-[40px] sm:text-[54px]"} text-balance mt-7 whitespace-pre-line font-bold leading-[1.35] text-primary-foreground`}>{t.title}</h1>
          <p className={`${ur ? "font-urdu text-base" : "font-display text-lg"} mt-5 font-semibold leading-relaxed text-primary-foreground/95`}>{t.arabic}</p>
          <p className={`${ur ? "font-urdu text-sm" : "text-sm sm:text-base"} mt-2 font-medium leading-8 text-primary-foreground/70`}>{t.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className={`min-h-12 rounded-sm bg-gold px-5 font-semibold text-deep hover:bg-gold/90 ${ur ? "font-urdu" : ""}`}><a href="/lectures">{t.explore}{ur ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}</a></Button>
            <Button asChild variant="outline" size="lg" className={`min-h-12 rounded-sm border-primary-foreground/30 bg-transparent px-5 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground ${ur ? "font-urdu" : ""}`}><a href="/about">{t.aboutButton}</a></Button>
          </div>
          <div className="mt-10 flex items-center gap-3 text-xs text-primary-foreground/65"><span className="flex size-8 items-center justify-center rounded-full border border-gold/50 text-gold"><CalendarDays className="size-4" /></span><span className={ur ? "font-urdu" : ""}>{t.established} <span className="text-gold/90">·</span> {ur ? "کراچی، پاکستان" : "Every Sunday · Karachi"}</span></div>
        </div>
        <div className="relative flex min-h-[340px] items-center justify-center sm:min-h-[400px]">
          <div className="absolute size-[272px] rounded-full border border-gold/15 sm:size-[350px]" />
          <div className="absolute size-[230px] rounded-full border border-gold/25 sm:size-[300px]" />
          <div className="relative flex w-full max-w-[390px] flex-col items-center px-7 text-center">
            <SocietyLogo />
            <p className="mt-6 font-urdu text-xl font-bold leading-[1.7] text-gold">المہدی ایجوکیشنل سوسائٹی</p>
            <p className="mt-2 max-w-[230px] whitespace-pre-line font-display text-[11px] font-semibold uppercase leading-6 tracking-[0.12em] text-primary-foreground/80">{t.society.replace(/\n/g, " ")}</p>
          </div>
          <div className="absolute bottom-7 end-1 max-w-[170px] border-e-2 border-gold px-4 py-2 text-start"><span className={`${ur ? "font-urdu text-sm" : "font-display text-sm"} block leading-7 text-primary-foreground`}>{t.passage}</span><span className="mt-1 block text-[10px] text-primary-foreground/55">{t.footerTagline}</span></div>
          <div className="absolute start-2 top-10 flex size-9 animate-float-gentle items-center justify-center rounded-full border border-gold/40 text-gold"><Sparkles className="size-4" /></div>
        </div>
      </div>
    </section>
    <section id="lectures" className="scroll-mt-20 bg-background py-20 sm:py-24" dir={ur ? "rtl" : "ltr"}><div className="mx-auto max-w-7xl px-5 lg:px-9"><div className="flex flex-wrap items-end justify-between gap-5"><div><span className="text-[10px] font-bold uppercase tracking-widest text-teal sm:text-[11px]">{t.upcoming}</span><h2 className={`${ur ? "font-urdu text-3xl" : "font-display text-3xl sm:text-4xl"} mt-3 font-bold leading-relaxed text-deep`}>{t.gatheringTitle}</h2><p className={`${ur ? "font-urdu text-sm" : "text-sm"} mt-1 leading-7 text-muted-foreground`}>{t.upcomingSub}</p></div><a href="/lectures" className={`${ur ? "font-urdu text-sm" : "text-xs"} inline-flex items-center gap-2 font-semibold text-teal hover:text-gold`}>{t.viewAll}{ur ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}</a></div>
      <div className="mt-9 border-y border-border py-10"><div className="mx-auto flex max-w-xl flex-col items-center text-center"><span className="flex size-12 items-center justify-center rounded-full border border-gold/50 bg-pearl text-teal"><CalendarDays className="size-5" /></span><h3 className={`${ur ? "font-urdu text-xl" : "font-display text-lg"} mt-4 font-semibold text-deep`}>{t.featured}</h3><p className={`${ur ? "font-urdu text-sm" : "text-sm"} mt-2 leading-7 text-muted-foreground`}>{t.emptyLectures}</p><p className={`${ur ? "font-urdu text-sm" : "text-sm"} mt-2 max-w-sm leading-7 text-muted-foreground`}>{t.featuredDescription}</p><a href="/lectures" className={`${ur ? "font-urdu text-sm" : "text-xs"} mt-5 inline-flex items-center gap-2 font-bold text-teal hover:text-gold`}>{t.explore}{ur ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}</a></div></div>
    </div></section>
    <AboutSection t={t} ur={ur} home />
    <FeatureGallery t={t} ur={ur} home />
    <FeatureVideo t={t} ur={ur} />
    <ContactSection t={t} ur={ur} />
    <NewsletterSection t={t} ur={ur} />
  </PageFrame>;
}

function AboutSection({ t, ur, home = false }: { t: Copy; ur: boolean; home?: boolean }) {
  return <section id="about" className="bg-background py-20 sm:py-24" dir={ur ? "rtl" : "ltr"}><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[.82fr_1.18fr] lg:gap-20 lg:px-9"><div className="relative flex aspect-[1.06] items-center justify-center overflow-hidden bg-deep p-8"><div className="pattern-geometric absolute inset-0 opacity-90" /><div className="relative flex flex-col items-center text-center"><SocietyLogo /><p className="mt-5 font-urdu text-xl font-semibold leading-relaxed text-gold">المہدی ایجوکیشنل سوسائٹی</p><p className="mt-2 whitespace-pre-line font-display text-xs font-semibold uppercase leading-6 tracking-[0.11em] text-primary-foreground/80">{t.society}</p></div><span className="absolute bottom-4 end-4 text-[9px] font-bold uppercase tracking-[0.11em] text-gold/80">{t.homes}</span></div><div><span className="text-[10px] font-bold uppercase tracking-widest text-teal sm:text-[11px]">{t.aboutEyebrow}</span><h2 className={`${ur ? "font-urdu text-3xl" : "font-display whitespace-pre-line text-balance text-3xl sm:text-[38px]"} mt-5 font-bold leading-[1.55] text-deep`}>{t.aboutTitle}</h2><p className={`${ur ? "font-urdu text-[15px]" : "text-sm"} mt-4 leading-8 text-muted-foreground`}>{t.aboutBody}</p><a href="/about" className={`${ur ? "font-urdu text-sm" : "text-xs"} mt-7 inline-flex items-center gap-2 font-bold text-teal transition-colors hover:text-gold`}>{t.aboutButton}{ur ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}</a><div className="mt-9 grid gap-6 border-t border-border pt-7 sm:grid-cols-2 sm:gap-8"><div><div className="mb-3 flex size-8 items-center justify-center rounded-full bg-pearl text-teal"><Compass className="size-4" /></div><h3 className={`${ur ? "font-urdu text-base" : "font-display text-sm"} font-bold text-deep`}>{t.mission}</h3><p className={`${ur ? "font-urdu text-sm" : "text-xs"} mt-2 leading-7 text-muted-foreground`}>{t.missionBody}</p></div><div><div className="mb-3 flex size-8 items-center justify-center rounded-full bg-pearl text-teal"><ArrowUpRight className="size-4" /></div><h3 className={`${ur ? "font-urdu text-base" : "font-display text-sm"} font-bold text-deep`}>{t.vision}</h3><p className={`${ur ? "font-urdu text-sm" : "text-xs"} mt-2 leading-7 text-muted-foreground`}>{t.visionBody}</p></div></div>{home && <span className="sr-only">Al Mehdi Educational Society</span>}</div></div></section>;
}

function ContactSection({ t, ur }: { t: Copy; ur: boolean }) {
  return <section id="contact" className="bg-pearl/70 py-20 sm:py-24" dir={ur ? "rtl" : "ltr"}><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_.85fr] lg:items-center lg:gap-20 lg:px-9"><div><span className="text-[10px] font-bold uppercase tracking-widest text-teal sm:text-[11px]">{t.contactEyebrow}</span><h2 className={`${ur ? "font-urdu text-3xl" : "font-display text-3xl sm:text-[38px]"} mt-5 font-bold leading-[1.5] text-deep`}>{t.contactTitle}</h2><p className={`${ur ? "font-urdu text-[15px]" : "text-sm"} mt-4 max-w-lg leading-8 text-muted-foreground`}>{t.contactBody}</p><div className="mt-8 grid gap-5 sm:grid-cols-2"><div className="border-t border-border pt-5"><span className="flex size-9 items-center justify-center rounded-full bg-background text-teal"><Mail className="size-4" /></span><h3 className={`${ur ? "font-urdu text-sm" : "text-xs"} mt-3 font-semibold text-deep`}>{t.emailLabel}</h3><a href="mailto:info@almehdieducation.org" className="mt-1 block break-all text-xs text-muted-foreground hover:text-teal">info@almehdieducation.org</a></div><div className="border-t border-border pt-5"><span className="flex size-9 items-center justify-center rounded-full bg-background text-teal"><MapPin className="size-4" /></span><h3 className={`${ur ? "font-urdu text-sm" : "text-xs"} mt-3 font-semibold text-deep`}>{t.venueLabel}</h3><p className={`${ur ? "font-urdu text-xs" : "text-xs"} mt-1 leading-6 text-muted-foreground`}>{t.addressPending}</p></div></div><div className="mt-6 flex items-center gap-2 text-xs font-medium text-teal"><Clock3 className="size-4 text-gold" />{ur ? "ہر اتوار" : "Every Sunday"} · {ur ? "کراچی، پاکستان" : "Karachi, Pakistan"}</div></div><div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-teal p-8 text-primary-foreground sm:min-h-[340px] sm:p-10"><div className="pattern-geometric absolute inset-0" /><div className="relative"><Globe2 className="size-5 text-gold" /><h3 className={`${ur ? "font-urdu text-2xl" : "font-display text-2xl"} mt-5 font-bold leading-[1.6]`}>{ur ? "علم کی محفل میں آپ کا خیرمقدم ہے۔" : "Pull up a chair. You're welcome here."}</h3><p className={`${ur ? "font-urdu text-sm" : "text-sm"} mt-3 max-w-xs leading-8 text-primary-foreground/80`}>{ur ? "ہر اتوار، علم سیکھنے اور بانٹنے کا ایک خوبصورت موقع۔" : "A little space for listening, learning, and meeting wonderful people—every Sunday."}</p></div><a href="mailto:info@almehdieducation.org" className={`${ur ? "font-urdu text-sm" : "text-sm"} relative mt-7 inline-flex items-center gap-2 font-semibold text-gold`}>{t.emailLabel}{ur ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}</a></div></div></section>;
}

function NewsletterSection({ t, ur }: { t: Copy; ur: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  return <section className="bg-background py-14 sm:py-16" dir={ur ? "rtl" : "ltr"}><div className="mx-auto grid max-w-7xl items-center gap-8 border-y border-border px-5 py-9 lg:grid-cols-[1fr_auto] lg:px-9"><div><span className="text-[10px] font-bold uppercase tracking-widest text-teal">{t.newsletterEyebrow}</span><h2 className={`${ur ? "font-urdu text-2xl" : "font-display text-2xl"} mt-2 font-bold leading-relaxed text-deep`}>{t.newsletterTitle}</h2><p className={`${ur ? "font-urdu text-sm" : "text-xs"} mt-1 leading-7 text-muted-foreground`}>{t.newsletterBody}</p></div>{submitted ? <div className="flex max-w-sm items-start gap-3 rounded-sm border border-teal/30 bg-pearl px-4 py-4 text-sm leading-7 text-deep"><Check className="mt-1 size-5 shrink-0 text-teal" /><span className={ur ? "font-urdu" : ""}>{t.successMessage}</span></div> : <form className="flex w-full gap-2 sm:max-w-md" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><Input aria-label={t.emailPlaceholder} type="email" placeholder={t.emailPlaceholder} required className={`h-12 min-w-0 rounded-sm bg-background ${ur ? "font-urdu text-right" : ""}`} /><Button type="submit" className={`${ur ? "font-urdu" : ""} h-12 shrink-0 rounded-sm bg-teal px-5 text-primary-foreground hover:bg-teal/90`}>{t.subscribe}</Button></form>}</div></section>;
}

function EditorialPage({ pathname }: { pathname: string }) {
  const { language } = useSocietyLanguage();
  const ur = language === "ur";
  const t = copyByLanguage[language];
  const content = {
    about: { title: ur ? "ایک ساتھ سیکھنے کا خوبصورت سفر" : "A community built around the joy of learning.", intro: t.aboutBody, eyebrow: t.aboutEyebrow },
    lectures: { title: ur ? "علم کے لیے ہر اتوار ایک نئی نشست" : "Make room for something meaningful this Sunday.", intro: t.emptyLectures, eyebrow: t.upcoming },
    gallery: { title: ur ? "ہماری محفلوں کی خوبصورت جھلکیاں" : "A community, captured between the words.", intro: t.emptyPhotos, eyebrow: t.galleryEyebrow },
    videos: { title: ur ? "سنیے، سیکھیے، دوبارہ دیکھیے" : "Thoughts worth sharing, again and again.", intro: t.emptyVideos, eyebrow: t.videosEyebrow },
    contact: { title: t.contactTitle, intro: t.contactBody, eyebrow: t.contactEyebrow },
  } as const;
  const key = pathname.replace(/\//g, "") as keyof typeof content;
  const page = content[key] ?? content.about;
  return <PageFrame pathname={pathname}><section className="relative overflow-hidden bg-deep py-20 text-primary-foreground sm:py-24" dir={ur ? "rtl" : "ltr"}><div aria-hidden="true" className="pattern-geometric pointer-events-none absolute inset-0" /><div className="relative mx-auto max-w-7xl px-5 lg:px-9"><span className={`${ur ? "font-urdu" : ""} text-xs font-semibold text-gold`}>{page.eyebrow}</span><h1 className={`${ur ? "font-urdu text-3xl sm:text-4xl" : "font-display text-balance text-4xl leading-tight sm:text-[48px]"} mt-5 max-w-3xl font-bold leading-[1.6]`}>{page.title}</h1><p className={`${ur ? "font-urdu text-sm" : "text-sm"} mt-5 max-w-2xl leading-8 text-primary-foreground/75`}>{page.intro}</p>{key === "lectures" && <span className={`${ur ? "font-urdu" : ""} mt-7 inline-flex items-center gap-2 text-xs text-gold"><CalendarDays className="size-4" />{ur ? "ہر اتوار · کراچی" : "Every Sunday · Karachi"}</span>}</div></section>{key === "about" && <><AboutSection t={t} ur={ur} /><FeatureGallery t={t} ur={ur} /></>}{key === "lectures" && <section className="bg-background py-16" dir={ur ? "rtl" : "ltr"}><div className="mx-auto max-w-7xl px-5 lg:px-9"><div className="border-y border-border py-12 text-center"><span className="mx-auto flex size-12 items-center justify-center rounded-full bg-pearl text-teal"><CalendarDays className="size-5" /></span><p className={`${ur ? "font-urdu text-lg" : "font-display text-lg"} mt-4 font-semibold text-deep`}>{t.emptyLectures}</p><a href="mailto:info@almehdieducation.org" className={`${ur ? "font-urdu text-sm" : "text-sm"} mt-5 inline-flex items-center gap-2 font-semibold text-teal hover:text-gold`}>{t.contactTitle}<MessageCircle className="size-4" /></a></div></div></section>}{key === "gallery" && <FeatureGallery t={t} ur={ur} />}{key === "videos" && <FeatureVideo t={t} ur={ur} />}{key === "contact" && <ContactSection t={t} ur={ur} />}<NewsletterSection t={t} ur={ur} /></PageFrame>;
}

export function SocietySitePage({ pathname }: { pathname: string }) {
  return pathname === "/" ? <HomeContent /> : <EditorialPage pathname={pathname} />;
}

export function SocietyHome() {
  return <SocietySitePage pathname="/" />;
}

export function arrowDirection(ur: boolean) {
  return ur ? ArrowLeft : ArrowDown;
}