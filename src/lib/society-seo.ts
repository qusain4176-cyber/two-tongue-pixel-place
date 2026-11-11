export function societyHead(title: string, description: string) {
  const fullTitle = title === "Al Mehdi Educational Society"
    ? title
    : `${title} | Al Mehdi Educational Society`;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}