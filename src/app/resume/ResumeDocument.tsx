import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { career } from "@/lib/career";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

// One document, two presentations: the dark web page on screen, and a
// white single-column A4 sheet in print. The downloadable PDF is this
// page printed (npm run resume:pdf), so the two cannot disagree.

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-300 border-b border-zinc-800 pb-2 mb-4 print:text-[9pt] print:text-black print:border-zinc-400 print:pb-0.5 print:mb-1.5 print:tracking-[0.12em]">
      {children}
    </h2>
  );
}

export default function ResumeDocument() {
  const selected = projects.filter((p) => p.resume);
  const contact = [
    career.location,
    site.email,
    host(site.url),
    host(site.social.linkedin),
    host(site.social.github),
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 print:min-h-0 print:bg-white print:text-black">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-16 sm:py-20 print:p-0 print:max-w-none">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 print:hidden">
          <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint">Résumé · one page</p>
          <a
            href={site.resumePdf}
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold transition-colors"
          >
            <Download className="w-4 h-4" aria-hidden="true" /> Download PDF
          </a>
        </div>

        <article className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-10 space-y-8 print:border-0 print:bg-transparent print:p-0 print:rounded-none print:space-y-[9pt] print:text-[9pt] print:leading-[1.38]">
          <header>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white print:text-[19pt] print:text-black print:leading-tight">
              {career.name}
            </h1>
            <p className="text-base font-semibold text-zinc-300 mt-1 print:text-[10.5pt] print:text-black print:mt-0">{career.headline}</p>
            <p className="text-sm text-fg-muted mt-3 print:text-[8.5pt] print:text-zinc-800 print:mt-1">
              {contact.map((c, i) => (
                <span key={c} className="inline-block whitespace-nowrap">
                  {i > 0 && <span aria-hidden="true" className="mx-2 text-zinc-600 print:mx-1.5 print:text-zinc-500">•</span>}
                  {c}
                </span>
              ))}
            </p>
          </header>

          <section>
            <Heading>Professional summary</Heading>
            <p className="text-sm text-zinc-300 leading-relaxed print:text-[9pt] print:text-zinc-900 print:leading-[1.38]">{career.summary}</p>
          </section>

          <section>
            <Heading>Technical skills</Heading>
            <dl className="space-y-1.5 text-sm print:space-y-0 print:text-[9pt]">
              {career.skills.map((g) => (
                <div key={g.label} className="sm:flex sm:gap-3">
                  <dt className="font-semibold text-zinc-200 sm:w-44 shrink-0 print:w-auto print:inline print:text-black">
                    {g.label}:
                  </dt>
                  <dd className="text-fg-muted print:inline print:ml-1 print:text-zinc-900">{g.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <Heading>Professional experience</Heading>
            <div className="space-y-6 print:space-y-[6pt]">
              {career.experience.map((role) => (
                <div key={`${role.company}-${role.title}`} className="print:break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-bold text-zinc-100 print:text-black print:text-[9.5pt]">
                      {role.title}
                      <span className="font-normal text-fg-muted print:text-zinc-800"> — {role.company}</span>
                      {role.engagement === "Freelance" && (
                        <span className="font-normal text-fg-muted print:text-zinc-800"> (freelance)</span>
                      )}
                    </h3>
                    <p className="text-xs text-fg-muted font-mono print:font-sans print:text-[8.5pt] print:text-zinc-800">
                      {role.start} – {role.end} · {role.location}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed print:text-[9pt] print:text-zinc-900 print:mt-0.5 print:leading-[1.38]">
                    {role.summary}
                  </p>
                  {role.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1.5 list-disc pl-5 marker:text-zinc-600 print:mt-0.5 print:space-y-0 print:pl-4 print:marker:text-zinc-700">
                      {role.highlights.map((h) => (
                        <li key={h} className="text-sm text-zinc-400 leading-relaxed print:text-[9pt] print:text-zinc-900 print:leading-[1.38]">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {selected.length > 0 && (
            <section>
              <Heading>Selected projects</Heading>
              <ul className="space-y-2 print:space-y-0.5">
                {selected.map((p) => (
                  <li key={p.slug} className="text-sm text-zinc-400 leading-relaxed print:text-[9pt] print:text-zinc-900 print:leading-[1.38]">
                    <span className="font-semibold text-zinc-100 print:text-black">{p.title}</span> — {p.resume}
                    {p.caseStudy && (
                      <span className="print:hidden">
                        {" "}
                        <Link href={p.caseStudy} className="text-zinc-200 underline underline-offset-2 hover:text-white">
                          Case study
                        </Link>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="grid gap-8 sm:grid-cols-2 print:grid-cols-2 print:gap-6">
            <div>
              <Heading>Education</Heading>
              <p className="text-sm font-semibold text-zinc-100 print:text-[9pt] print:text-black">
                {career.education.degree} — {career.education.school}
              </p>
              <p className="text-sm text-fg-muted print:text-[9pt] print:text-zinc-900">
                {career.education.location} · {career.education.year} · {career.education.note}
              </p>
            </div>
            <div>
              <Heading>Languages</Heading>
              <p className="text-sm text-fg-muted print:text-[9pt] print:text-zinc-900">{career.languages.join(" · ")}</p>
            </div>
          </section>
        </article>

        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 print:hidden">
          <h2 className="text-lg font-bold text-white mb-2">Evaluating technical leadership fit?</h2>
          <p className="text-sm text-fg-muted mb-5">
            The case studies cover architecture, constraints, trade-offs, and what I personally owned on each system.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold transition-colors"
            >
              Read case studies <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/lets-talk"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-200 hover:border-zinc-500 text-sm font-semibold transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
