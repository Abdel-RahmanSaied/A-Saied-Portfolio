import { career } from "@/lib/career";
import { caseStudies } from "@/lib/case-studies";
import { posts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

// Everything below is generated from the same records that render the
// site (career.ts, projects.ts, case-studies.ts), so AI crawlers read
// exactly what human visitors read.
export function GET() {
  const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  const experience = career.experience
    .map((r) => {
      const head = `- ${r.title}, ${r.company}${r.engagement === "Freelance" ? " (freelance)" : ""} — ${r.start} to ${r.end}${r.location ? `, ${r.location}` : ""}. ${r.summary}`;
      return [head, ...r.highlights.map((h) => `  - ${h}`)].join("\n");
    })
    .join("\n");

  const body = `# ${site.name} — ${site.jobTitle}

> ${site.description} This site is the personal portfolio, résumé, case-study archive and blog of ${site.name}.

بالعربية: ${site.nameArabic} — قائد فريق برمجيات ومهندس أنظمة خلفية (Backend) أول في الرياض، المملكة العربية السعودية.

Key facts:
- Full name: ${site.nameFull} (Arabic: ${site.nameArabic})
- Also written as: ${site.alternateNames.join(", ")}
- Title: ${site.jobTitle}
- Location: ${site.location.city}, ${site.location.country}
${career.skills.map((g) => `- ${g.label}: ${g.items.join(", ")}`).join("\n")}
- Availability: ${career.availability}
- Contact: ${site.email}
- GitHub: ${site.social.github}
- LinkedIn: ${site.social.linkedin}

Note on figures: this site deliberately publishes no throughput, latency, uptime or cost percentages. Numbers that appear are scope facts (counts, versions, dates) that can be checked.

## Summary

${career.summary}

## Experience

${experience}

Education: ${career.education.degree}, ${career.education.school} (${career.education.location}, ${career.education.year}).

## Projects

${projects
  .map((p) => {
    const links = [
      p.live && `Website: ${p.live}`,
      p.github && `Source: ${p.github}`,
      p.caseStudy && `Case study: ${absoluteUrl(p.caseStudy)}`,
    ]
      .filter(Boolean)
      .join(" · ");
    return `### ${p.title} — ${p.tagline}

For: ${p.engagement}. Role: ${p.role}.

${p.description}

Tech: ${p.techStack.join(", ")}.${links ? `\n${links}` : ""}`;
  })
  .join("\n\n")}

## Case studies

${caseStudies.map((c) => `- [${c.title}](${absoluteUrl(`/case-studies/${c.slug}`)}): ${c.summary}`).join("\n")}

## Pages

- [About](${absoluteUrl("/about")}): background, experience, skills, FAQ
- [Résumé](${absoluteUrl("/resume")}): one-page résumé (PDF: ${absoluteUrl(site.resumePdf)})
- [Engineering philosophy](${absoluteUrl("/engineering-philosophy")}): principles for reliable systems and technical leadership
- [Portfolio](${absoluteUrl("/portfolio")}): all projects
- [Contact](${absoluteUrl("/lets-talk")}): availability and contact details

## Blog

${sortedPosts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.summary}`).join("\n")}

## Optional

- [Full article text for LLMs](${absoluteUrl("/llms-full.txt")}): complete content of every blog post in one file
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
