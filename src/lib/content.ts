import { careerAr } from "@/lib/ar/career";
import { caseStudiesAr } from "@/lib/ar/case-studies";
import { faqsAr } from "@/lib/ar/faq";
import { pagesAr } from "@/lib/ar/pages";
import { postsAr } from "@/lib/ar/posts";
import { projectsAr } from "@/lib/ar/projects";
import { uiAr } from "@/lib/ar/ui";
import { career, type Career } from "@/lib/career";
import { caseStudies } from "@/lib/case-studies";
import type { CaseStudy } from "@/lib/case-study-types";
import { faqs, type Faq } from "@/lib/faq";
import type { Locale } from "@/lib/i18n";
import { pages, type PageCopy } from "@/lib/pages";
import { posts, type Post } from "@/lib/posts";
import { projects, type Project } from "@/lib/projects";
import { uiEn, type Ui } from "@/lib/ui";

export type PageKey = keyof typeof pages;

/** Everything a page renders, in one language. English and Arabic share slugs and order. */
export type Content = {
  locale: Locale;
  ui: Ui;
  career: Career;
  projects: Project[];
  caseStudies: CaseStudy[];
  faqs: Faq[];
  posts: Post[];
  pages: Record<PageKey, PageCopy>;
};

// Arabic text writes an English term after a separate prefix: "الـ API",
// "بـ Python", "و Redis". A no-break space keeps the prefix on the same line
// as its word; the source files keep ordinary spaces so they stay easy to edit.
function gluePrefixes<T>(value: T): T {
  if (typeof value === "string") {
    return value
      .replace(/\u0640 (?=[A-Za-z0-9])/g, "\u0640\u00A0")
      .replace(/(^|[^\u0600-\u06FF])\u0648 (?=[A-Za-z0-9])/g, "$1\u0648\u00A0") as T;
  }
  if (Array.isArray(value)) return value.map(gluePrefixes) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, gluePrefixes(v)])) as T;
  }
  return value;
}

const en: Content = { locale: "en", ui: uiEn, career, projects, caseStudies, faqs, posts, pages };
const ar: Content = gluePrefixes({
  locale: "ar",
  ui: uiAr,
  career: careerAr,
  projects: projectsAr,
  caseStudies: caseStudiesAr,
  faqs: faqsAr,
  posts: postsAr,
  pages: pagesAr,
});

export function getContent(locale: Locale): Content {
  return locale === "ar" ? ar : en;
}
