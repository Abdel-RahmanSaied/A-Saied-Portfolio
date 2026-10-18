import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/site";
import type { Post } from "@/lib/posts";
import type { Project } from "@/lib/projects";
import type { CaseStudy } from "@/lib/case-study-types";
import { uiAr } from "@/lib/ar/ui";
import { getContent } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";

/** hreflang alternates for a page that exists in both languages. */
export function languageAlternates(path: string) {
  return { en: path, ar: localePath("ar", path), "x-default": path };
}

/**
 * Standard per-page metadata: canonical URL plus OpenGraph/Twitter cards that
 * match the page (fields set here fully replace the root layout's, so every
 * page needs its own). Share images come from each route's opengraph-image.
 * `path` is the English path; Arabic pages live at /ar + path.
 */
export function pageMetadata(
  {
    title,
    description,
    path,
  }: {
    title: string;
    description: string;
    path: string;
  },
  locale: Locale = "en",
): Metadata {
  const url = localePath(locale, path);
  const fullTitle = `${title} | ${locale === "ar" ? uiAr.site.name : site.name}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
      types: { "application/rss+xml": "/feed.xml" },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(url),
      siteName: site.siteName,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      site: site.social.xHandle,
      creator: site.social.xHandle,
    },
  };
}

const PERSON_ID = `${site.url}/#person`;
const WEBSITE_ID = `${site.url}/#website`;
const localUrl = (locale: Locale, path: string) => absoluteUrl(localePath(locale, path));
const projectId = (p: Project, locale: Locale) => `${localUrl(locale, "/portfolio")}#${p.slug}`;
// Engagement is display text and is translated on the Arabic site, so who
// created what is read from the English records.
const independent = new Set(getContent("en").projects.filter((p) => p.engagement === "Independent").map((p) => p.slug));

function projectEntity(p: Project, locale: Locale) {
  return {
    "@type": "SoftwareApplication",
    "@id": projectId(p, locale),
    name: p.title,
    alternateName: p.tagline,
    description: p.description,
    applicationCategory: p.category === "Security" ? "SecurityApplication" : "BusinessApplication",
    keywords: p.techStack.join(", "),
    ...(p.live ? { url: p.live } : p.caseStudy ? { url: localUrl(locale, p.caseStudy) } : {}),
    ...(p.github ? { sameAs: [p.github] } : {}),
    ...(p.openSource ? { license: `https://spdx.org/licenses/${p.openSource.license}.html` } : {}),
    ...(p.caseStudy ? { subjectOf: { "@type": "WebPage", "@id": localUrl(locale, p.caseStudy) } } : {}),
    // Only independent work is attributed as created by the person; employer
    // and client projects are described as contributions.
    ...(independent.has(p.slug) ? { creator: { "@id": PERSON_ID } } : { contributor: { "@id": PERSON_ID } }),
  };
}

export function personJsonLd(locale: Locale = "en") {
  const { career, projects } = getContent(locale);
  const current = career.experience[0];
  const description =
    locale === "ar"
      ? `${site.nameArabic} (${site.nameFull})، مقيم في ${uiAr.site.location}. ${career.summary}`
      : `${site.nameFull} (${site.nameArabic}) is a ${site.jobTitle} based in ${site.location.city}, ${site.location.country}. ${career.summary}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: site.name,
        alternateName: [...site.alternateNames],
        description,
        url: site.url,
        jobTitle: site.jobTitle,
        worksFor: { "@type": "Organization", name: current.company },
        email: `mailto:${site.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.city,
          addressCountry: site.location.countryCode,
        },
        alumniOf: { "@type": "CollegeOrUniversity", name: career.education.school },
        sameAs: [site.social.github, site.social.linkedin, site.social.x],
        knowsAbout: [...site.knowsAbout],
        mainEntityOfPage: localUrl(locale, "/about"),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: site.url,
        name: site.siteName,
        description: site.description,
        publisher: { "@id": PERSON_ID },
        inLanguage: ["en", "ar"],
      },
      ...projects.filter((p) => p.featured).map((p) => projectEntity(p, locale)),
    ],
  };
}

export function profilePageJsonLd(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: localUrl(locale, "/about"),
    name: locale === "ar" ? `عن ${uiAr.site.name}` : `About ${site.name}`,
    inLanguage: locale,
    mainEntity: { "@id": PERSON_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function blogPostingJsonLd(post: Post, locale: Locale = "en") {
  const url = localUrl(locale, `/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}/#article`,
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags.join(", "),
    inLanguage: locale,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function caseStudyJsonLd(study: CaseStudy, locale: Locale = "en") {
  const url = localUrl(locale, `/case-studies/${study.slug}`);
  const project = getContent(locale).projects.find((p) => p.caseStudy === `/case-studies/${study.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline: study.headline,
    description: study.summary,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: study.tags.join(", "),
    inLanguage: locale,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    ...(project ? { about: projectEntity(project, locale) } : {}),
  };
}

export function portfolioJsonLd(list: Project[], locale: Locale = "en") {
  const { pages } = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${localUrl(locale, "/portfolio")}#projects`,
    name: locale === "ar" ? `${pages.portfolio.title} | ${uiAr.site.name}` : `Projects by ${site.name}`,
    description:
      locale === "ar"
        ? pages.portfolio.description
        : `Platforms, products, and integrations that ${site.name} has led, built, or founded.`,
    numberOfItems: list.length,
    itemListElement: list.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: projectEntity(p, locale),
    })),
  };
}

export function openSourceJsonLd(list: Project[], locale: Locale = "en") {
  const { pages } = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${localUrl(locale, "/open-source")}#projects`,
    name: locale === "ar" ? `${pages.openSource.title} | ${uiAr.site.name}` : `Open-source projects by ${site.name}`,
    numberOfItems: list.length,
    itemListElement: list.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: projectEntity(p, locale),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function blogIndexJsonLd(posts: Post[], locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${localUrl(locale, "/blog")}/#blog`,
    url: localUrl(locale, "/blog"),
    name: locale === "ar" ? `${getContent(locale).pages.blog.title} | ${uiAr.site.name}` : `${site.name} — Engineering Blog`,
    description:
      locale === "ar"
        ? getContent(locale).pages.blog.description
        : "Engineering articles on backend systems, observability, scaling, geospatial data, and security tooling.",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    inLanguage: locale,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: localUrl(locale, `/blog/${post.slug}`),
      datePublished: post.date,
      description: post.summary,
    })),
  };
}
