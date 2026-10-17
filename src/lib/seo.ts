import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/site";
import { career } from "@/lib/career";
import type { Post } from "@/lib/posts";
import { projects, type Project } from "@/lib/projects";
import type { CaseStudy } from "@/lib/case-study-types";

/**
 * Standard per-page metadata: canonical URL plus OpenGraph/Twitter cards that
 * match the page (fields set here fully replace the root layout's, so every
 * page needs its own). Share images come from each route's opengraph-image.
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
const projectId = (p: Project) => `${site.url}/portfolio#${p.slug}`;

function projectEntity(p: Project) {
  return {
    "@type": "SoftwareApplication",
    "@id": projectId(p),
    name: p.title,
    alternateName: p.tagline,
    description: p.description,
    applicationCategory: p.category === "Security" ? "SecurityApplication" : "BusinessApplication",
    keywords: p.techStack.join(", "),
    ...(p.live ? { url: p.live } : p.caseStudy ? { url: absoluteUrl(p.caseStudy) } : {}),
    ...(p.github ? { sameAs: [p.github] } : {}),
    ...(p.caseStudy ? { subjectOf: { "@type": "WebPage", "@id": absoluteUrl(p.caseStudy) } } : {}),
    // Only independent work is attributed as created by the person; employer
    // and client projects are described as contributions.
    ...(p.engagement === "Independent" ? { creator: { "@id": PERSON_ID } } : { contributor: { "@id": PERSON_ID } }),
  };
}

export function personJsonLd() {
  const current = career.experience[0];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: site.name,
        alternateName: [...site.alternateNames],
        description: `${site.nameFull} (${site.nameArabic}) is a ${site.jobTitle} based in ${site.location.city}, ${site.location.country}. ${career.summary}`,
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
      ...projects.filter((p) => p.featured).map(projectEntity),
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
    dateModified: post.updated ?? post.date,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags.join(", "),
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function caseStudyJsonLd(study: CaseStudy) {
  const url = absoluteUrl(`/case-studies/${study.slug}`);
  const project = projects.find((p) => p.caseStudy === `/case-studies/${study.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline: study.headline,
    description: study.summary,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: study.tags.join(", "),
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    ...(project ? { about: projectEntity(project) } : {}),
  };
}

export function portfolioJsonLd(list: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${site.url}/portfolio#projects`,
    name: `Projects by ${site.name}`,
    description: `Platforms, products, and integrations that ${site.name} has led, built, or founded.`,
    numberOfItems: list.length,
    itemListElement: list.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: projectEntity(p),
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

export function blogIndexJsonLd(posts: Post[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog/#blog`,
    url: absoluteUrl("/blog"),
    name: `${site.name} — Engineering Blog`,
    description:
      "Engineering articles on backend systems, observability, scaling, geospatial data, and security tooling.",
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
