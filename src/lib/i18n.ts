// Two locales. English keeps every existing URL; Arabic mirrors each page
// under /ar with the same slugs, so switching language is a prefix swap.
export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];

/** The URL of a page in a locale: "/about" → "/ar/about". */
export function localePath(locale: Locale, path: string): string {
  if (locale === "en") return path;
  return path === "/" ? "/ar" : `/ar${path}`;
}

export function localeOf(pathname: string): Locale {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}

/** The locale-independent path: "/ar/about" → "/about". */
export function basePath(pathname: string): string {
  if (pathname === "/ar") return "/";
  return pathname.startsWith("/ar/") ? pathname.slice(3) : pathname;
}

/** Long date in the locale's words, with Western digits in both languages. */
export function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === "ar" ? "ar-EG-u-nu-latn" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Text with inline links, e.g. ["See ", { href: "/x", text: "this" }, "."]. */
export type Rich = readonly (string | { href: string; text: string })[];
