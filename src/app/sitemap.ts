import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

const CASE_STUDIES = ["twiscope", "fendix", "muri", "hayyak", "maxpeak"];

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPostDate = posts
    .map((p) => p.date)
    .sort()
    .at(-1);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/case-studies"), changeFrequency: "monthly", priority: 0.9 },
    {
      url: absoluteUrl("/blog"),
      lastModified: latestPostDate ? new Date(latestPostDate) : undefined,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    { url: absoluteUrl("/portfolio"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/resume"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/engineering-philosophy"), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/lets-talk"), changeFrequency: "yearly", priority: 0.6 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = CASE_STUDIES.map((slug) => ({
    url: absoluteUrl(`/case-studies/${slug}`),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...postRoutes];
}
