import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPost } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PostClient from "./PostClient";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  const fullTitle = `${post.title} | ${site.name}`;
  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    authors: [{ name: site.name, url: site.url }],
    alternates: {
      canonical: path,
      types: { "application/rss+xml": "/feed.xml" },
    },
    openGraph: {
      title: fullTitle,
      description: post.summary,
      url: absoluteUrl(path),
      siteName: site.siteName,
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <>
      <JsonLd data={blogPostingJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <PostClient post={post} />
    </>
  );
}
