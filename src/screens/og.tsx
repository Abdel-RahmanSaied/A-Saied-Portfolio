// Share-card images for every page, in either language. Each route's
// opengraph-image.tsx re-exports one of these with its locale.
import { getContent, type PageKey } from "@/lib/content";
import { formatDate, type Locale } from "@/lib/i18n";
import { renderOg } from "@/lib/og";
import { site } from "@/lib/site";

type SlugParams = { params: Promise<{ slug: string }> };

export function homeOg(locale: Locale) {
  const { ui } = getContent(locale);
  return {
    alt: `${ui.site.name} — ${ui.site.jobTitle}`,
    Image: () =>
      renderOg(
        {
          title: ui.site.name,
          subtitle: ui.site.jobTitle,
          tags: ui.og.homeTags,
          footer: locale === "ar" ? ui.site.location : `${site.location.city}, ${site.location.country}`,
        },
        locale,
      ),
  };
}

export function pageOg(key: PageKey, locale: Locale) {
  const copy = getContent(locale).pages[key];
  return { alt: copy.og.title, Image: () => renderOg(copy.og, locale) };
}

export function caseStudyOg(locale: Locale) {
  const { ui, caseStudies } = getContent(locale);
  return {
    alt: ui.og.caseStudyAlt,
    Image: async ({ params }: SlugParams) => {
      const { slug } = await params;
      const study = caseStudies.find((c) => c.slug === slug);
      return renderOg(
        {
          eyebrow: study ? `${ui.og.caseStudy} · ${study.kicker}` : ui.og.caseStudy,
          title: study?.headline ?? ui.og.caseStudy,
          tags: study?.tags.slice(0, 5) ?? [],
        },
        locale,
      );
    },
  };
}

export function postOg(locale: Locale) {
  const { ui, posts } = getContent(locale);
  return {
    alt: ui.og.blogAlt,
    Image: async ({ params }: SlugParams) => {
      const { slug } = await params;
      const post = posts.find((p) => p.slug === slug);
      return renderOg(
        {
          eyebrow: post ? `${ui.og.blog} · ${formatDate(post.date, locale)} · ${post.readTime}` : ui.og.blog,
          title: post?.title ?? ui.og.blog,
          tags: post?.tags ?? [],
        },
        locale,
      );
    },
  };
}
