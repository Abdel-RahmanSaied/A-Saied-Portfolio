// Title, description and share-card copy for each top-level page. Read by
// the page's metadata export and by its opengraph-image.tsx so the two
// can never disagree.
export type PageCopy = {
  path: string;
  title: string;
  description: string;
  og: { eyebrow: string; title: string; subtitle: string; tags?: readonly string[] };
};

export const pages = {
  about: {
    path: "/about",
    title: "About",
    description:
      "Software Team Lead and Senior Software Engineer in Riyadh, Saudi Arabia — backend and distributed systems across stacks, technical leadership, experience, and working style.",
    og: {
      eyebrow: "About",
      title: "How I build and lead",
      subtitle: "Software Team Lead | Senior Software Engineer, Backend · Riyadh, Saudi Arabia",
      tags: ["Software engineering", "Backend architecture", "Distributed systems", "Cloud", "Engineering leadership"],
    },
  },
  portfolio: {
    path: "/portfolio",
    title: "Portfolio",
    description:
      "Projects by Abdel-Rahman Saied: the Twiscope media-intelligence platform, Sanad AI, the MURI transportation backend, the Check-In (Hayyak) hospitality platform, Fendix, and Qatf.",
    og: {
      eyebrow: "Portfolio",
      title: "Production systems and products",
      subtitle: "Twiscope · Sanad AI · MURI · Check-In (Hayyak) · Fendix · Qatf",
    },
  },
  caseStudies: {
    path: "/case-studies",
    title: "Case Studies",
    description:
      "Engineering case studies — problem, constraints, architecture, decisions, trade-offs, and outcomes — for Twiscope, Sanad AI, Fendix, Qatf, MURI, Check-In (Hayyak), and Maxpeak.",
    og: {
      eyebrow: "Case studies",
      title: "Engineering decisions behind shipped systems",
      subtitle: "Problem → constraints → architecture → decisions → trade-offs → outcomes",
    },
  },
  openSource: {
    path: "/open-source",
    title: "Open Source",
    description:
      "Open-source projects by Abdel-Rahman Saied: Qatf, an Arabic-first tool that turns long videos into vertical clips (Apache-2.0), and the Fendix application security engine (MIT). Licences, status, features, and case studies.",
    og: {
      eyebrow: "Open source",
      title: "Code I publish in the open",
      subtitle: "Qatf (Apache-2.0) · Fendix engine (MIT)",
      tags: ["Python", "Go", "FastAPI", "Whisper", "ffmpeg"],
    },
  },
  philosophy: {
    path: "/engineering-philosophy",
    title: "Engineering Philosophy",
    description:
      "How Abdel-Rahman Saied approaches reliable backend systems, observability, scaling, security, product impact, and hands-on technical leadership.",
    og: {
      eyebrow: "Engineering philosophy",
      title: "Clear, reliable, useful systems",
      subtitle: "Principles for backend architecture and hands-on technical leadership",
    },
  },
  blog: {
    path: "/blog",
    title: "Blog",
    description:
      "Engineering articles on distributed backend systems, observability, caching, ML inference, Django, FastAPI, and technical leadership — written from production work.",
    og: {
      eyebrow: "Blog",
      title: "Notes from production backend work",
      subtitle: "Observability · scaling · caching · geospatial · security tooling",
    },
  },
  resume: {
    path: "/resume",
    title: "Resume",
    description:
      "One-page résumé of Abdel-Rahman Saied, Software Team Lead and Senior Software Engineer in Riyadh — backend architecture, distributed systems, cloud delivery, data, AI, and technical leadership.",
    og: {
      eyebrow: "Résumé",
      title: "Abdel-Rahman Saied",
      subtitle: "Software Team Lead | Senior Software Engineer, Backend",
      tags: ["Software engineering", "Backend architecture", "Distributed systems", "Cloud", "Leadership"],
    },
  },
  letsTalk: {
    path: "/lets-talk",
    title: "Let's Talk",
    description:
      "Contact Abdel-Rahman Saied about Senior Software Engineer, Senior Backend, Technical Lead, and Staff-level roles — based in Riyadh, Saudi Arabia.",
    og: {
      eyebrow: "Contact",
      title: "Let's talk",
      subtitle: "Senior Software Engineer · Technical Lead · Staff-level roles",
    },
  },
} satisfies Record<string, PageCopy>;
