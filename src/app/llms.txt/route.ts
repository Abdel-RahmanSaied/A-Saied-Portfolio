import { posts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

const CASE_STUDIES = [
  {
    slug: "twiscope",
    title: "Twiscope",
    summary:
      "Real-time Arabic OSINT social intelligence platform processing 5M+ data points daily (Django, Celery, Redis, ML trend detection, WebSocket alerting).",
  },
  {
    slug: "fendix",
    title: "Fendix",
    summary:
      "Open-source Go security scanner that correlates DAST and SAST findings — both engines must agree before a finding fails the build, cutting false positives ~70%.",
  },
  {
    slug: "muri",
    title: "MURI",
    summary:
      "Student transportation platform with client, driver, and admin apps — modular Django API, PostGIS geospatial routing, WebSocket live tracking. Live at muri.sa.",
  },
  {
    slug: "hayyak",
    title: "Hayyak",
    summary:
      "Multi-tenant hotel management system integrating Opera PMS (OHIP) and dual payment gateways with PCI-compliant flows and real-time updates.",
  },
  {
    slug: "maxpeak",
    title: "Maxpeak",
    summary:
      "Talent marketplace with a 3-stage AI vetting pipeline connecting elite Egyptian engineers with Saudi companies.",
  },
];

export function GET() {
  const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  const body = `# ${site.name} — ${site.jobTitle}

> ${site.description} Based in ${site.location.city}, ${site.location.country}. This site is the personal portfolio, blog, and case-study archive of ${site.name}.

بالعربية: ${site.nameArabic} — قائد تقني ومهندس أنظمة خلفية (Backend) مقيم في الرياض، المملكة العربية السعودية. من أبرز مشاريعه: منصة تويسكوب (Twiscope) لتحليل وسائل التواصل الاجتماعي، وأداة فيندكس (Fendix) مفتوحة المصدر لفحص أمان التطبيقات، ومنصة موري (MURI) للنقل المدرسي.

Key facts:
- Full name: ${site.nameFull} (Arabic: ${site.nameArabic})
- Also written as: ${site.alternateNames.join(", ")}
- Role: ${site.jobTitle}
- Location: ${site.location.city}, ${site.location.country}
- Flagship projects: Twiscope (twiscope.net), Fendix (fendix.dev), MURI (muri.sa)
- Core stack: Python (Django, FastAPI), Go, PostgreSQL/PostGIS, Redis, Celery, Elasticsearch
- Focus areas: distributed backend systems, AI infrastructure, application security, observability, engineering leadership
- Contact: ${site.email}
- GitHub: ${site.social.github}
- LinkedIn: ${site.social.linkedin}

## Key Achievements

${site.proofPoints.map((p) => `- **${p.metric}**: ${p.claim}`).join("\n")}

## Pages

- [About](${absoluteUrl("/about")}): background, experience, and skills
- [Resume](${absoluteUrl("/resume")}): full professional history
- [Engineering Philosophy](${absoluteUrl("/engineering-philosophy")}): principles for reliable systems and technical leadership
- [Portfolio](${absoluteUrl("/portfolio")}): selected projects
- [Contact](${absoluteUrl("/lets-talk")}): availability and contact details

## All Projects

Complete list of production systems, open-source tools, and shipped products built by ${site.name}:

${projects
  .map((p) => {
    const links = [
      p.live && `Live: ${p.live}`,
      p.github && `Source: ${p.github}`,
      p.caseStudy && `Case study: ${absoluteUrl(p.caseStudy)}`,
    ]
      .filter(Boolean)
      .join(" · ");
    return `### ${p.title} — ${p.tagline}

${p.description}

Tech stack: ${p.techStack.join(", ")}.${links ? `\n${links}` : ""}`;
  })
  .join("\n\n")}

## Case Studies

${CASE_STUDIES.map((cs) => `- [${cs.title}](${absoluteUrl(`/case-studies/${cs.slug}`)}): ${cs.summary}`).join("\n")}

## Blog

${sortedPosts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.summary}`).join("\n")}

## Optional

- [Full article text for LLMs](${absoluteUrl("/llms-full.txt")}): complete content of every blog post in one markdown file
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
