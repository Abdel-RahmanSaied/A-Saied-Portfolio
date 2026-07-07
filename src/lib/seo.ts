import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/site";
import type { Post } from "@/lib/posts";

/**
 * Standard per-page metadata: canonical URL plus OpenGraph/Twitter cards that
 * match the page (fields set here fully replace the root layout's, so every
 * page needs its own to avoid mismatched share previews).
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": "/feed.xml" },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: site.siteName,
      locale: "en_US",
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

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: site.name,
        alternateName: [...site.alternateNames],
        description: `${site.nameFull} (${site.nameArabic}) is a ${site.jobTitle} based in ${site.location.city}, ${site.location.country}, known for building Twiscope, Fendix, and MURI.`,
        url: site.url,
        jobTitle: site.jobTitle,
        email: `mailto:${site.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.city,
          addressCountry: site.location.countryCode,
        },
        sameAs: [site.social.github, site.social.linkedin, site.social.x],
        knowsAbout: [...site.knowsAbout],
        mainEntityOfPage: absoluteUrl("/about"),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: site.url,
        name: site.siteName,
        description: site.description,
        publisher: { "@id": PERSON_ID },
        inLanguage: "en",
      },
      // Flagship projects as first-class entities credited to the Person, so
      // knowledge graphs associate "Abdel-Rahman Saied" with these products.
      {
        "@type": "SoftwareApplication",
        "@id": `${site.url}/case-studies/twiscope#project`,
        name: "Twiscope",
        url: "https://twiscope.net/",
        applicationCategory: "BusinessApplication",
        description:
          "Arabic OSINT social intelligence platform processing 5M+ data points daily across Twitter/X, Instagram, TikTok, Google, and news sources, with ML-driven trend detection and real-time alerting.",
        creator: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
        subjectOf: { "@type": "WebPage", "@id": absoluteUrl("/case-studies/twiscope") },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${site.url}/case-studies/fendix#project`,
        name: "Fendix",
        url: "https://fendix.dev",
        sameAs: ["https://github.com/Abdel-RahmanSaied/Fendix"],
        applicationCategory: "SecurityApplication",
        operatingSystem: "Linux, macOS, Windows",
        description:
          "Open-source Go security scanner that correlates DAST and SAST findings — a vulnerability only fails the build when both engines independently agree, cutting false positives by ~70%.",
        creator: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
        subjectOf: { "@type": "WebPage", "@id": absoluteUrl("/case-studies/fendix") },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${site.url}/case-studies/muri#project`,
        name: "MURI",
        url: "https://muri.sa",
        applicationCategory: "TravelApplication",
        description:
          "Student transportation platform with dedicated client, driver, and admin apps — modular Django API, PostGIS geospatial routing, and real-time WebSocket trip tracking.",
        creator: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
        subjectOf: { "@type": "WebPage", "@id": absoluteUrl("/case-studies/muri") },
      },
    ],
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl("/about"),
    name: `About ${site.name}`,
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

export function blogPostingJsonLd(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}/#article`,
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags.join(", "),
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
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

export function blogIndexJsonLd(posts: Post[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog/#blog`,
    url: absoluteUrl("/blog"),
    name: `${site.name} — Engineering Blog`,
    description:
      "Engineering articles on distributed backend systems, observability, scaling, and technical leadership.",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    inLanguage: "en",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.date,
      description: post.summary,
    })),
  };
}
