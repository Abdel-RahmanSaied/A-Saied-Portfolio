// Career record: the single source for /resume (and its PDF), /about,
// llms.txt and the Person JSON-LD. Keep every line here defensible —
// docs/evidence-matrix.md records where each claim comes from.

export type Role = {
  company: string;
  /** Omitted when not stated in the owner's records. */
  location?: string;
  title: string;
  /** Omitted when not stated in the owner's records. */
  engagement?: "Full-time" | "Freelance";
  start: string; // "Mon YYYY"
  end: string; // "Mon YYYY" | "Present"
  summary: string;
  highlights: string[];
};

export type SkillGroup = { label: string; items: string[] };

/** The shape both the English record below and src/lib/ar/career.ts satisfy. */
export type Career = {
  name: string;
  headline: string;
  location: string;
  availability: string;
  summary: string;
  skills: readonly { label: string; items: readonly string[] }[];
  experience: readonly {
    company: string;
    location?: string;
    title: string;
    engagement?: "Full-time" | "Freelance";
    start: string;
    end: string;
    summary: string;
    highlights: readonly string[];
  }[];
  education: { degree: string; school: string; location: string; year: string; note: string };
  languages: readonly string[];
  highlights: readonly { value: number; suffix: string; label: string }[];
};

export const career = {
  name: "Abdel-Rahman Mohamed Saied",
  headline: "Software Team Lead | Senior Backend Engineer",
  location: "Riyadh, Saudi Arabia",
  availability: "Open to Senior Backend, Technical Lead, and Staff-level backend roles — on-site in Riyadh, remote, or relocation.",

  summary:
    "Software Team Lead and Senior Backend Engineer with 6+ years of professional experience, most of it building Python SaaS platforms and distributed backends. I lead a cross-functional team of up to 13 engineers across backend, frontend, mobile, AI, and QA while staying hands-on with architecture, code review, delivery planning, and production operations.",

  skills: [
    { label: "Backend", items: ["Python", "Go", "Django", "Django REST Framework", "FastAPI", "Celery", "REST API design", "Authentication & RBAC"] },
    { label: "Data & messaging", items: ["PostgreSQL", "PostGIS", "Redis", "Elasticsearch", "AWS SQS"] },
    { label: "Cloud & delivery", items: ["AWS (EC2, RDS, S3, ALB)", "Terraform", "Docker", "Kong API Gateway", "GitHub Actions", "Elastic APM", "Prometheus"] },
    { label: "Engineering practice", items: ["Service boundaries", "Async pipelines", "Multi-tenancy", "Third-party & payment integrations", "Code review", "Mentoring"] },
  ] satisfies SkillGroup[],

  experience: [
    {
      company: "ASAS IT",
      location: "Riyadh, Saudi Arabia",
      title: "Software Team Lead | Senior Backend Engineer",
      engagement: "Full-time",
      start: "Aug 2024",
      end: "Present",
      summary:
        "Lead a cross-functional team of up to 13 engineers (backend, frontend, mobile, AI, QA); own architecture, code review, planning, and production delivery for Twiscope and MURI.",
      highlights: [
        "Twiscope: sole backend developer until Oct 2025, now leading the team on a five-product social-intelligence platform (Django/DRF, Celery, PostgreSQL, Elasticsearch). Built Decision Hub (Celery-chord pipelines, deterministic scoring, Elasticsearch snapshots), the X alert engine, subscriptions and RBAC, a Kong gateway with a FastAPI auth service, and Terraform-managed AWS infrastructure.",
        "Sanad AI: lead the team building Twiscope's Arabic/English RAG assistant (FastAPI, BGE-M3, Elasticsearch BM25 + kNN with reciprocal rank fusion, allow-list-bounded LLM index routing); personally built its SQS ingestion pipeline, deployment workflows, and Elastic APM tracing.",
        "MURI: led the team building a student-transportation platform (Django/DRF, PostGIS, Celery, HyperPay); personally set up the backend, JWT/OTP auth and deployment pipeline, and built its PostGIS geography models and geofenced trip validation.",
      ],
    },
    {
      company: "ASAS IT",
      location: "Riyadh, Saudi Arabia",
      title: "Senior Software Engineer, Backend",
      engagement: "Full-time",
      start: "Sep 2023",
      end: "Aug 2024",
      summary:
        "Started Twiscope's backend as its sole developer: Django/DRF services and Celery pipelines for X API v2 keyword and account analysis, Instagram, TikTok and Google reports, subscriptions and quotas, and containerised deployment on AWS.",
      highlights: [],
    },
    {
      company: "Check-In (Hayyak)",
      location: "Riyadh, Saudi Arabia",
      title: "Technical Lead, Backend",
      engagement: "Freelance",
      start: "Apr 2024",
      end: "Jan 2026",
      summary:
        "Backend lead and primary contributor for a hotel guest self check-in platform: multi-hotel data model, Oracle OPERA Cloud (OHIP) integration with check-out folio settlement, Tap Payments and HyperPay behind one gateway layer, support chat, and a FastAPI adapter for Saudi Shomoos reporting.",
      highlights: [],
    },
    {
      company: "Prime Consulting Office (PCO)",
      title: "Software Engineer",
      start: "Nov 2022",
      end: "Oct 2023",
      summary:
        "Built backend solutions for consulting clients, translating their requirements into REST API contracts and technical specifications.",
      highlights: [],
    },
    {
      company: "ClouDev Solutions",
      location: "Egypt",
      title: "Backend Software Engineer",
      engagement: "Full-time",
      start: "Sep 2022",
      end: "Jul 2023",
      summary: "Developed REST APIs, backend integrations, and production service improvements.",
      highlights: [],
    },
    {
      company: "Co-Source",
      location: "Egypt",
      title: "Desktop Software Engineer",
      engagement: "Full-time",
      start: "Aug 2020",
      end: "May 2022",
      summary: "Developed Python desktop applications (PyQt/PySide) and automated reporting workflows.",
      highlights: [],
    },
  ] satisfies Role[],

  education: {
    degree: "B.Sc. Computer Science",
    school: "Higher Technological Institute (HTI)",
    location: "Egypt",
    year: "2022",
    note: "Graduation project graded A+",
  },

  languages: ["Arabic (native)", "English (professional)"],

  // Headline numbers shown on the homepage and /about. Only scope facts
  // that can be checked — no unmeasured performance percentages.
  highlights: [
    { value: 6, suffix: "+", label: "Years building production software" },
    { value: 13, suffix: "", label: "Engineers led across five disciplines" },
    { value: 5, suffix: "", label: "Twiscope products on one backend" },
    { value: 2, suffix: "", label: "Payment gateways integrated (Tap, HyperPay)" },
  ],
} as const satisfies Career;
