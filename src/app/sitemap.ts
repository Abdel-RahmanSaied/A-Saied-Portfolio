import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { caseStudies } from "@/lib/case-studies";
import { localePath, locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

type Entry = Omit<MetadataRoute.Sitemap[number], "url">;

// Every page exists in English and at /ar in Arabic; each URL lists both.
function inEveryLanguage(path: string, entry: Entry): MetadataRoute.Sitemap {
  const languages = {
    en: absoluteUrl(path),
    ar: absoluteUrl(localePath("ar", path)),
    "x-default": absoluteUrl(path),
  };
  return locales.map((locale) => ({ url: absoluteUrl(localePath(locale, path)), ...entry, alternates: { languages } }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPostDate = posts
    .map((p) => p.date)
    .sort()
    .at(-1);

  const staticRoutes: [string, Entry][] = [
    ["/", { changeFrequency: "monthly", priority: 1 }],
    ["/about", { changeFrequency: "monthly", priority: 0.9 }],
    ["/case-studies", { changeFrequency: "monthly", priority: 0.9 }],
    [
      "/blog",
      {
        lastModified: latestPostDate ? new Date(latestPostDate) : undefined,
        changeFrequency: "weekly",
        priority: 0.9,
      },
    ],
    ["/portfolio", { changeFrequency: "monthly", priority: 0.8 }],
    ["/open-source", { changeFrequency: "monthly", priority: 0.8 }],
    ["/resume", { changeFrequency: "monthly", priority: 0.8 }],
    ["/engineering-philosophy", { changeFrequency: "yearly", priority: 0.7 }],
    ["/lets-talk", { changeFrequency: "yearly", priority: 0.6 }],
  ];

  const caseStudyRoutes: [string, Entry][] = caseStudies.map((c) => [
    `/case-studies/${c.slug}`,
    { changeFrequency: "yearly", priority: 0.8 },
  ]);

  const postRoutes: [string, Entry][] = posts.map((post) => [
    `/blog/${post.slug}`,
    { lastModified: new Date(post.date), changeFrequency: "yearly", priority: 0.7 },
  ]);

  return [...staticRoutes, ...caseStudyRoutes, ...postRoutes].flatMap(([path, entry]) => inEveryLanguage(path, entry));
}
