import Link from "next/link";
import { ArrowRight, Download, GraduationCap, Linkedin, Mail, Twitter } from "lucide-react";
import AnimatedNumber from "@/components/AnimatedNumber";
import GlowCard from "@/components/GlowCard";
import { career } from "@/lib/career";
import { faqs } from "@/lib/faq";
import { site } from "@/lib/site";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-3">{children}</p>;
}

const workingStyle = [
  "I keep architecture and implementation connected: I review designs and pull requests and still write production code.",
  "I prefer explicit service boundaries, boring operational paths, and failure handling that is designed rather than discovered.",
  "I treat integrations — payments, PMS systems, third-party APIs — as unreliable by default: retries, idempotency, and clear states.",
  "I write things down: decisions, runbooks, and trade-offs, so a team of different disciplines can move without waiting on one person.",
];

export default function AboutView() {
  return (
    <div className="relative bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 py-20 sm:py-24 space-y-24">

        {/* ── Intro ── */}
        <section className="text-center max-w-3xl mx-auto">
          <Label>About</Label>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">How I build and lead.</h1>
          <p className="text-zinc-400 leading-relaxed mb-12 text-sm sm:text-base">
            I&apos;m <span className="font-semibold text-zinc-100">{site.nameFull}</span>{" "}
            <span className="text-fg-muted">
              (<bdi lang="ar">{site.nameArabic}</bdi>)
            </span>{" "}
            — a {career.headline.replace(" | ", " and ")} based in {career.location}. I build Python backends and
            multi-service platforms, and I lead the cross-functional team that ships them.
          </p>

          <dl className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {career.highlights.map((h) => (
              <div key={h.label} className="flex flex-col-reverse p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40">
                <dt className="text-xs text-fg-muted leading-snug">{h.label}</dt>
                <dd className="text-2xl font-black text-white mb-1">
                  <AnimatedNumber value={h.value} suffix={h.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Overview ── */}
        <section>
          <GlowCard className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7 md:p-10">
            <Label>Summary</Label>
            <h2 className="text-xl font-bold text-white mb-5">Professional overview</h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed text-sm sm:text-[15px] max-w-3xl">
              <p>
                I started by shipping Python desktop software end to end at Co-Source, where reliability was visible
                in every user workflow. That shaped how I approach backends: clear domain boundaries, observable
                operations, and designing for the people who maintain the system after launch.
              </p>
              <p>
                Since 2022 my work has been backend platforms — REST APIs and integrations at ClouDev Solutions, then
                ASAS IT in Riyadh, where I moved from Senior Software Engineer to Software Team Lead. I lead a
                cross-functional team of up to 13 engineers across backend, frontend, mobile, AI, and QA, working on{" "}
                <Link href="/case-studies/twiscope" className="text-zinc-200 underline underline-offset-2 hover:text-white">Twiscope</Link>{" "}
                — a multi-product social-intelligence platform and its{" "}
                <Link href="/case-studies/sanad-ai" className="text-zinc-200 underline underline-offset-2 hover:text-white">Sanad AI</Link>{" "}
                analytics assistant — and on{" "}
                <Link href="/case-studies/muri" className="text-zinc-200 underline underline-offset-2 hover:text-white">MURI</Link>, a student-transportation platform.
              </p>
              <p>
                Outside ASAS IT, I led backend work as a freelancer on the{" "}
                <Link href="/case-studies/hayyak" className="text-zinc-200 underline underline-offset-2 hover:text-white">Check-In (Hayyak)</Link>{" "}
                hotel guest platform from April 2024 to January 2026, and I founded{" "}
                <Link href="/case-studies/fendix" className="text-zinc-200 underline underline-offset-2 hover:text-white">Fendix</Link>,
                an application security decision platform with an open-source Go CLI.
              </p>
            </div>
          </GlowCard>
        </section>

        {/* ── Skills ── */}
        <section>
          <Label>Stack</Label>
          <h2 className="text-xl font-bold text-white mb-8">Skills</h2>
          <dl className="space-y-5">
            {career.skills.map((group) => (
              <div key={group.label} className="flex flex-col sm:flex-row sm:items-start gap-3">
                <dt className="text-xs font-semibold uppercase tracking-widest text-fg-faint sm:w-44 shrink-0 sm:pt-2">{group.label}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((t) => (
                      <li key={t} className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-300 text-sm font-medium">
                        {t}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Experience ── */}
        <section>
          <Label>Journey</Label>
          <h2 className="text-xl font-bold text-white mb-10">Professional experience</h2>
          <div className="relative sm:pl-12">
          <div aria-hidden="true" className="absolute left-[17px] top-3 bottom-3 w-px bg-zinc-800 hidden sm:block" />
          <ol className="space-y-5">
            {career.experience.map((role) => (
              <li key={`${role.company}-${role.title}`} className="relative">
                <span aria-hidden="true" className="absolute -left-[36px] top-6 w-3 h-3 rounded-full bg-zinc-600 ring-4 ring-zinc-950 hidden sm:block" />
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 hover:border-zinc-700 transition-colors">
                  <h3 className="font-semibold text-zinc-100">{role.title}</h3>
                  <p className="flex flex-wrap gap-x-3 mt-1 mb-3 text-xs">
                    <span className="text-zinc-300 font-medium">
                      {role.company}
                      {role.engagement === "Freelance" ? " · Freelance" : ""}
                    </span>
                    <span aria-hidden="true" className="text-fg-faint">·</span>
                    <span className="text-fg-muted">{role.start} – {role.end}</span>
                    {role.location && (
                      <>
                        <span aria-hidden="true" className="text-fg-faint">·</span>
                        <span className="text-fg-muted">{role.location}</span>
                      </>
                    )}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{role.summary}</p>
                  {role.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {role.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-fg-muted leading-relaxed">
                          <ArrowRight className="w-3 h-3 text-zinc-600 mt-1.5 shrink-0" aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
          </div>
        </section>

        {/* ── Working style ── */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7 md:p-10">
          <Label>Working style</Label>
          <h2 className="text-xl font-bold text-white mb-7">What to expect working with me</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {workingStyle.map((point) => (
              <li key={point} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 text-sm text-zinc-400 leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Education ── */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div aria-hidden="true" className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-fg-faint">Education</h2>
          </div>
          <p className="text-base font-bold text-white mb-1">{career.education.degree}</p>
          <p className="text-zinc-300 text-sm mb-1">{career.education.school}, {career.education.location}</p>
          <p className="text-fg-muted text-sm">{career.education.year} · {career.education.note}</p>
        </section>

        {/* ── FAQ ── */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-fg-faint mb-3 text-center">FAQ</p>
          <h2 className="text-xl font-bold text-white mb-8 text-center">Common questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40">
                <h3 className="text-sm font-semibold text-zinc-100 mb-2">{f.q}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="text-center rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 md:p-14">
          <h2 className="text-2xl font-bold text-white mb-3">Let&apos;s connect</h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">{career.availability}</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center">
            <Link
              href="/lets-talk"
              className="inline-flex items-center gap-2 px-7 py-3 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-semibold rounded-xl transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" /> Get in touch
            </Link>
            {[
              { href: site.social.linkedin, icon: <Linkedin className="w-4 h-4" aria-hidden="true" />, label: "LinkedIn" },
              { href: site.social.x, icon: <Twitter className="w-4 h-4" aria-hidden="true" />, label: "X" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-semibold rounded-xl transition-colors"
              >
                {l.icon} {l.label}
              </a>
            ))}
            <a
              href={site.resumePdf}
              download
              className="inline-flex items-center gap-2 px-7 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden="true" /> Download résumé
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
