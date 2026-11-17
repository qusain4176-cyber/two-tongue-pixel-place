import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Code2,
  Heart,
  LayoutDashboard,
  Megaphone,
  Newspaper,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import societyLogo from "@/assets/al-mehdi-logo.png.asset.json";
import { societySections, type SocietySection } from "@/lib/society-sections";
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

function SectionNavigation() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarMenu>
      {societySections.map((section, index) => {
        const Icon = sectionIcons[index] ?? Newspaper;
        return (
          <SidebarMenuItem key={section.path}>
            <SidebarMenuButton
              asChild
              isActive={pathname === section.path}
              className="h-10 rounded-sm px-3 font-semibold text-foreground/85 transition-colors hover:bg-sidebar-accent hover:text-teal data-[active=true]:border-s-2 data-[active=true]:border-gold data-[active=true]:bg-sidebar-accent data-[active=true]:text-teal"
            >
              <Link to={section.path} onClick={() => isMobile && setOpenMobile(false)}>
                <Icon className="size-4 text-teal" aria-hidden="true" />
                <span>{section.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

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

function SiteSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="gap-0 bg-deep px-4 py-5 text-primary-foreground group-data-[collapsible=icon]:px-2">
        <div className="flex min-w-0 items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <img
            src={societyLogo.url}
            alt="Al Mehdi Educational Society logo"
            className="size-11 shrink-0 object-contain"
          />
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="font-display text-sm font-bold leading-5">Al Mehdi</p>
            <p className="mt-1 text-[10px] leading-4 text-primary-foreground/75">
              Educational Society
            </p>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="mt-5 h-px w-full bg-primary-foreground/20 group-data-[collapsible=icon]:hidden"
        />
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <nav aria-label="Main navigation">
              <SectionNavigation />
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function SocietyLayout({ section }: { section: SocietySection }) {
  const { language } = useSocietyLanguage();

  return (
    <SidebarProvider defaultOpen>
      <SiteSidebar />
      <SidebarInset className="min-h-svh min-w-0 bg-background">
        <header className="sticky top-0 z-20 grid min-h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur sm:gap-5 sm:px-6">
          <SidebarTrigger className="size-9" aria-label="Toggle navigation" />
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <img
              src={societyLogo.url}
              alt=""
              aria-hidden="true"
              className="size-9 shrink-0 object-contain sm:hidden"
            />
            <span className="hidden truncate font-display text-sm font-semibold text-deep sm:block">
              Al Mehdi Educational Society
            </span>
            <span className="truncate font-display text-xs font-semibold text-teal sm:hidden">
              Al Mehdi
            </span>
          </div>
          <LanguageSwitch />
        </header>
        <main
          className="flex min-h-[calc(100svh-4rem)] flex-1 items-start"
          dir={language === "ur" ? "rtl" : "ltr"}
        >
          <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10 sm:py-24">
            <div className="h-1 w-14 bg-gold" aria-hidden="true" />
            <h1 className="mt-6 font-display text-3xl font-bold leading-tight text-deep sm:text-4xl">
              {section.title}
            </h1>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function SocietySitePage({ section }: { section: SocietySection }) {
  return <SocietyLayout section={section} />;
}