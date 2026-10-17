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
      "Software Team Lead and Senior Backend Engineer in Riyadh, Saudi Arabia — background, experience, skills, and how I work across backend, AI, mobile, and QA teams.",
    og: {
      eyebrow: "About",
      title: "How I build and lead",
      subtitle: "Software Team Lead | Senior Backend Engineer · Riyadh, Saudi Arabia",
      tags: ["Python", "Django", "FastAPI", "PostgreSQL", "Engineering leadership"],
    },
  },
  portfolio: {
    path: "/portfolio",
    title: "Portfolio",
    description:
      "Projects by Abdel-Rahman Saied: Twiscope's social-intelligence products, Sanad AI, the MURI transportation backend, the Check-In (Hayyak) hospitality platform, and Fendix.",
    og: {
      eyebrow: "Portfolio",
      title: "Production systems and products",
      subtitle: "Twiscope · Sanad AI · MURI · Check-In (Hayyak) · Fendix",
    },
  },
  caseStudies: {
    path: "/case-studies",
    title: "Case Studies",
    description:
      "Engineering case studies — problem, constraints, architecture, decisions, trade-offs, and outcomes — for Twiscope, Sanad AI, Fendix, MURI, Check-In (Hayyak), and Maxpeak.",
    og: {
      eyebrow: "Case studies",
      title: "Engineering decisions behind shipped systems",
      subtitle: "Problem → constraints → architecture → decisions → trade-offs → outcomes",
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
      "One-page résumé of Abdel-Rahman Saied, Software Team Lead | Senior Backend Engineer in Riyadh — Python, Django, FastAPI, Celery, PostgreSQL, Redis, Elasticsearch, and AWS.",
    og: {
      eyebrow: "Résumé",
      title: "Abdel-Rahman Saied",
      subtitle: "Software Team Lead | Senior Backend Engineer",
      tags: ["Python", "Django / DRF", "FastAPI", "PostgreSQL", "AWS"],
    },
  },
  letsTalk: {
    path: "/lets-talk",
    title: "Let's Talk",
    description:
      "Contact Abdel-Rahman Saied about Senior Backend, Technical Lead, and Staff-level backend roles — based in Riyadh, Saudi Arabia.",
    og: {
      eyebrow: "Contact",
      title: "Let's talk",
      subtitle: "Senior Backend · Technical Lead · Staff-level backend roles",
    },
  },
} satisfies Record<string, PageCopy>;
