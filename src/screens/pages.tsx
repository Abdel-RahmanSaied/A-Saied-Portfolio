// Every page, written once and rendered in either language. The route files
// under app/(en) and app/(ar)/ar only pick the locale; titles, copy, data and
// structured data all come from getContent(locale).
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import CaseStudyView from "@/components/case-study/CaseStudyView";
import AboutView from "@/components/views/AboutView";
import BlogClient from "@/components/views/BlogClient";
import CaseStudiesIndex from "@/components/views/CaseStudiesIndex";
import HomeScreen from "@/components/views/HomeScreen";
import LetsTalkClient from "@/components/views/LetsTalkClient";
import NotFoundView from "@/components/views/NotFoundView";
import OpenSourceView from "@/components/views/OpenSourceView";
import PhilosophyView from "@/components/views/PhilosophyView";
import PortfolioClient from "@/components/views/PortfolioClient";
import PostClient from "@/components/views/PostClient";
import ResumeDocument from "@/components/views/ResumeDocument";
import { getContent, type PageKey } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";
import {
  blogIndexJsonLd,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  caseStudyJsonLd,
  faqJsonLd,
  languageAlternates,
  openSourceJsonLd,
  pageMetadata,
  portfolioJsonLd,
  profilePageJsonLd,
} from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

type LocaleProps = { locale: Locale };
type SlugProps = { locale: Locale; params: Promise<{ slug: string }> };

export function pageMeta(key: PageKey, locale: Locale): Metadata {
  return pageMetadata(getContent(locale).pages[key], locale);
}

export function homeMeta(locale: Locale): Metadata {
  return {
    alternates: {
      canonical: localePath(locale, "/"),
      languages: languageAlternates("/"),
      types: { "application/rss+xml": "/feed.xml" },
    },
  };
}

export function HomePage({ locale }: LocaleProps) {
  const { ui, career, projects } = getContent(locale);
  return <HomeScreen locale={locale} ui={ui} career={career} projects={projects} />;
}

export function AboutPage({ locale }: LocaleProps) {
  const { ui, career, faqs } = getContent(locale);
  return (
    <>
      <JsonLd data={profilePageJsonLd(locale)} />
      <JsonLd data={faqJsonLd(faqs)} />
      <AboutView locale={locale} ui={ui} career={career} faqs={faqs} />
    </>
  );
}

export function PortfolioPage({ locale }: LocaleProps) {
  const { ui, projects } = getContent(locale);
  return (
    <>
      <JsonLd data={portfolioJsonLd(projects, locale)} />
      <PortfolioClient locale={locale} ui={ui} projects={projects} />
    </>
  );
}

export function CaseStudiesPage({ locale }: LocaleProps) {
  const { ui, caseStudies } = getContent(locale);
  return <CaseStudiesIndex locale={locale} ui={ui} caseStudies={caseStudies} />;
}

export function caseStudyParams() {
  return getContent("en").caseStudies.map((c) => ({ slug: c.slug }));
}

export async function caseStudyMeta(locale: Locale, params: Promise<{ slug: string }>): Promise<Metadata> {
  const { slug } = await params;
  const study = getContent(locale).caseStudies.find((c) => c.slug === slug);
  if (!study) return {};
  return pageMetadata(
    {
      title: locale === "ar" ? `دراسة حالة ${study.title}: ${study.kicker}` : `${study.title} case study — ${study.kicker}`,
      description: study.summary,
      path: `/case-studies/${study.slug}`,
    },
    locale,
  );
}

export async function CaseStudyPage({ locale, params }: SlugProps) {
  const { slug } = await params;
  const { ui, caseStudies } = getContent(locale);
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();
  const next = study.next ? caseStudies.find((c) => c.slug === study.next) : undefined;
  return (
    <>
      <JsonLd data={caseStudyJsonLd(study, locale)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.nav.home, path: localePath(locale, "/") },
          { name: ui.nav.caseStudies, path: localePath(locale, "/case-studies") },
          { name: study.title, path: localePath(locale, `/case-studies/${study.slug}`) },
        ])}
      />
      <CaseStudyView locale={locale} ui={ui} study={study} next={next} />
    </>
  );
}

export function OpenSourcePage({ locale }: LocaleProps) {
  const { ui, projects, caseStudies } = getContent(locale);
  return (
    <>
      <JsonLd data={openSourceJsonLd(projects.filter((p) => p.openSource), locale)} />
      <OpenSourceView locale={locale} ui={ui} projects={projects} caseStudies={caseStudies} />
    </>
  );
}

export function PhilosophyPage({ locale }: LocaleProps) {
  return <PhilosophyView locale={locale} ui={getContent(locale).ui} />;
}

export function BlogPage({ locale }: LocaleProps) {
  const { ui, posts } = getContent(locale);
  return (
    <>
      <JsonLd data={blogIndexJsonLd(posts, locale)} />
      <BlogClient locale={locale} ui={ui} posts={posts} />
    </>
  );
}

export function postParams() {
  return getContent("en").posts.map((p) => ({ slug: p.slug }));
}

export async function postMeta(locale: Locale, params: Promise<{ slug: string }>): Promise<Metadata> {
  const { slug } = await params;
  const { ui, posts } = getContent(locale);
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  const url = localePath(locale, path);
  const fullTitle = `${post.title} | ${ui.site.name}`;
  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    authors: [{ name: ui.site.name, url: absoluteUrl(localePath(locale, "/")) }],
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
      types: { "application/rss+xml": "/feed.xml" },
    },
    openGraph: {
      title: fullTitle,
      description: post.summary,
      url: absoluteUrl(url),
      siteName: site.siteName,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
      type: "article",
      publishedTime: post.date,
      ...(post.updated ? { modifiedTime: post.updated } : {}),
      authors: [site.url],
      tags: [...post.tags],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: post.summary,
      site: site.social.xHandle,
      creator: site.social.xHandle,
    },
  };
}

export async function PostPage({ locale, params }: SlugProps) {
  const { slug } = await params;
  const { ui, posts } = getContent(locale);
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <>
      <JsonLd data={blogPostingJsonLd(post, locale)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: ui.nav.home, path: localePath(locale, "/") },
          { name: ui.nav.blog, path: localePath(locale, "/blog") },
          { name: post.title, path: localePath(locale, `/blog/${post.slug}`) },
        ])}
      />
      <PostClient locale={locale} ui={ui} post={post} />
    </>
  );
}

export function ResumePage({ locale }: LocaleProps) {
  const { ui, career, projects } = getContent(locale);
  return <ResumeDocument locale={locale} ui={ui} career={career} projects={projects} />;
}

export function LetsTalkPage({ locale }: LocaleProps) {
  return <LetsTalkClient locale={locale} ui={getContent(locale).ui} />;
}

export function NotFoundPage({ locale }: LocaleProps) {
  return <NotFoundView locale={locale} ui={getContent(locale).ui} />;
}
