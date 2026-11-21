export const societySections = [
  { path: "/articles", title: "ARTICLES" },
  { path: "/aims-goals", title: "AIMS & GOALS" },
  { path: "/lectures", title: "LECTURES" },
  { path: "/majalis", title: "MAJALIS" },
  { path: "/publications", title: "PUBLICATIONS" },
  { path: "/sign-board", title: "SIGN BOARD" },
  { path: "/software", title: "SOFTWARE" },
  { path: "/open-book-quiz", title: "OPEN BOOK QUIZ" },
  { path: "/quiz-dashboard", title: "QUIZ DASHBOARD" },
  { path: "/donation", title: "DONATION" },
] as const;

export type SocietySection = (typeof societySections)[number];