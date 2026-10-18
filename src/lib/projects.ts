// Single source of truth for all projects: rendered by the homepage,
// /portfolio and /resume, and consumed by llms.txt and JSON-LD so wording
// never drifts. Claims here must match docs/evidence-matrix.md.
export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** One line for the résumé's "Selected projects" section. */
  resume?: string;
  techStack: string[];
  category: "Platform" | "AI / ML" | "Security" | "Hospitality" | "Mobility" | "Marketplace" | "Mobile";
  /** Who the work was for: employer, freelance client, or independent. */
  engagement: string;
  role: string;
  image?: string;
  github?: string;
  live?: string;
  caseStudy?: string;
  featured?: boolean;
  /** Set when the source is public; these projects are listed on /open-source. */
  openSource?: {
    /** SPDX identifier, e.g. "MIT" or "Apache-2.0". */
    license: string;
    status: string;
    highlights: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "twiscope",
    title: "Twiscope",
    tagline: "Social intelligence platform",
    description:
      "Arabic/English social-intelligence SaaS with five products on one backend: Deep-In (X keyword and account reports), Influencer Impact, Sadeed / Decision Hub (brand-vs-competitor scoring), an alert engine, and notifications. Django/DRF and Celery behind a Kong gateway, with PostgreSQL, Elasticsearch and Terraform-managed AWS. I remained its sole backend developer for two years and took on team leadership as the work grew.",
    techStack: ["Django / DRF", "Celery", "Redis", "PostgreSQL", "Elasticsearch", "Kong", "FastAPI", "Terraform", "AWS"],
    category: "Platform",
    engagement: "ASAS IT",
    role: "Backend lead → Team Lead",
    live: "https://twiscope.net/",
    caseStudy: "/case-studies/twiscope",
    featured: true,
    image: "/assets/twiscope-logo.png",
  },
  {
    slug: "sanad-ai",
    title: "Sanad AI",
    tagline: "Twiscope's RAG analytics assistant",
    description:
      "Twiscope's Arabic/English retrieval-augmented assistant for analytics reports: hybrid BM25 + kNN retrieval over BGE-M3 embeddings fused with reciprocal rank fusion, LLM index routing bounded by deterministic allow-lists, and SQS-based report ingestion. I lead the team and personally own ingestion, deployment and tracing.",
    techStack: ["FastAPI", "Elasticsearch", "BGE-M3", "AWS SQS", "OpenRouter", "Elastic APM"],
    category: "AI / ML",
    engagement: "ASAS IT",
    role: "Team lead & contributor",
    caseStudy: "/case-studies/sanad-ai",
    featured: true,
  },
  {
    slug: "fendix",
    title: "Fendix",
    tagline: "Application security decision platform",
    description:
      "Turns SAST, DAST, SCA and imported SARIF results into deterministic, confidence-scored findings and a coverage-aware release decision for CI. An open-source Go CLI (MIT) with signed releases and SBOMs, plus a commercial hosted workspace.",
    resume:
      "Independent project I created and maintain — application security decision platform: confidence-scored SAST/DAST/SCA findings and coverage-aware release decisions; open-source Go CLI (MIT) with signed releases, plus a hosted platform (fendix.dev).",
    techStack: ["Go", "Python", "Semgrep", "Django", "Next.js", "Sigstore cosign"],
    category: "Security",
    engagement: "Independent",
    role: "Creator & maintainer",
    github: "https://github.com/Fendix-app/Fendix",
    live: "https://www.fendix.dev",
    caseStudy: "/case-studies/fendix",
    featured: true,
    openSource: {
      license: "MIT",
      status: "53 releases since Apr 2026",
      highlights: [
        "Confidence-scored findings from SAST, DAST and SCA, plus imported SARIF 2.1.0 from tools like CodeQL, Semgrep and Trivy.",
        "Gates a release on confidence, not severity alone, and every point of a finding's score has a written reason.",
        "Coverage-aware: a scanner that didn't run is recorded as skipped or failed, never mistaken for a clean pass.",
        "Deterministic: no machine-learning model in detection, scoring or decisions.",
        "Signed releases with CycloneDX and SPDX SBOMs and SLSA provenance, and no telemetry from the CLI.",
      ],
    },
  },
  {
    slug: "qatf",
    title: "Qatf",
    tagline: "Long videos into vertical clips, Arabic first",
    description:
      "Open-source tool that turns a long video into 9:16 clips with word-by-word captions for Reels, Shorts and TikTok. Whisper transcribes, a swappable language model picks the moments, and every cut is snapped onto a real word boundary. Arabic right-to-left captions are a first-class path. CLI, FastAPI service and React web UI; a working prototype.",
    techStack: ["Python", "FastAPI", "faster-whisper", "ffmpeg", "React", "TypeScript", "SQLite", "Docker"],
    category: "AI / ML",
    engagement: "Independent",
    role: "Creator & maintainer",
    github: "https://github.com/Abdel-RahmanSaied/Qatf",
    caseStudy: "/case-studies/qatf",
    openSource: {
      license: "Apache-2.0",
      status: "Working prototype",
      highlights: [
        "Whisper transcribes, a language model picks the moments, and every cut is snapped onto a real word boundary.",
        "Word-by-word captions on right-to-left Arabic as well as English, in four styles, checked on rendered frames.",
        "Any model in one setting: Anthropic, OpenAI, Kimi, GLM, OpenRouter, or local Ollama and vLLM.",
        "Review before rendering: edit the picks, titles and order; edited cuts are moved back onto words.",
        "CLI, HTTP API and an English and Arabic web UI, started with one docker compose up.",
      ],
    },
  },
  {
    slug: "muri",
    title: "MURI",
    tagline: "Student transportation platform",
    description:
      "Subscription-based student transportation platform with student, driver and admin apps on a Django/PostGIS backend: seat allocation under row locks, generated trips, geofenced trip validation, HyperPay with reconciliation, and a double-entry driver ledger. I led the team and set up the backend and its delivery pipeline.",
    techStack: ["Django", "DRF", "PostgreSQL / PostGIS", "Celery", "Redis", "HyperPay", "Flutter", "Angular"],
    category: "Mobility",
    engagement: "ASAS IT",
    role: "Team lead",
    caseStudy: "/case-studies/muri",
  },
  {
    slug: "hayyak",
    title: "Check-In (Hayyak)",
    tagline: "Hotel guest self check-in platform",
    description:
      "Backend for a hotel guest app, first branded Hayyak: guests claim their Oracle OPERA reservation, add co-guests, check in, extend and check out with in-app payment. Multi-hotel data model, OPERA Cloud (OHIP) integration with folio settlement, Tap and HyperPay behind one gateway layer, support chat, and a FastAPI adapter for Saudi Shomoos reporting.",
    techStack: ["Django", "DRF", "Oracle OPERA (OHIP)", "Tap Payments", "HyperPay", "Celery", "Django Channels", "FastAPI"],
    category: "Hospitality",
    engagement: "Freelance",
    role: "Technical Lead, Backend",
    caseStudy: "/case-studies/hayyak",
  },
  {
    slug: "maxpeak",
    title: "Maxpeak",
    tagline: "Technical hiring marketplace (pre-launch)",
    description:
      "Pre-launch marketplace connecting Saudi companies with engineers from Egypt. Django API with RS256/JWKS authentication and social sign-in, plus the automated first vetting stage: a Celery pipeline that extracts CV text and scores it with an LLM.",
    techStack: ["Django 5.2", "DRF", "Celery", "Redis", "PostgreSQL", "OpenRouter", "Next.js"],
    category: "Marketplace",
    engagement: "Independent",
    role: "Backend & frontend",
    live: "https://www.maxpeak.net/",
    caseStudy: "/case-studies/maxpeak",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
