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
  headline: "Software Team Lead | Senior Software Engineer, Backend",
  location: "Riyadh, Saudi Arabia",
  availability: "Open to Senior Software Engineer, Senior Backend, Technical Lead, and Staff-level roles — on-site in Riyadh, remote, or relocation.",

  summary:
    "Software Team Lead and Senior Software Engineer with 6+ years building SaaS and distributed backend systems. Built and directly manage a team of up to 13 engineers, with responsibility for hiring, performance reviews and delivery. Partner with the CEO on engineering priorities while remaining hands-on in architecture, code and production. Choose languages and tools to suit the problem.",

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
      title: "Software Team Lead | Senior Software Engineer, Backend",
      engagement: "Full-time",
      start: "Aug 2024",
      end: "Present",
      summary:
        "Directly manage up to 13 engineers across backend, frontend, mobile, AI and QA. Own hiring, performance reviews, promotions, planning and production delivery for Twiscope and MURI, alongside architecture and code review.",
      highlights: [
        "Twiscope: built the original backend and led workflow and caching improvements. Internal production logs showed a comparable ~100,000-post collection and analysis job falling from over five hours to around three minutes on unchanged resources.",
        "Sanad AI: led architecture and retrieval design with AI engineers; personally built SQS report ingestion, service integration, deployment and tracing.",
        "Delivery: designed and operated GitHub Actions with self-hosted runners. Twiscope production deployment requires passing SAST/SCA security gates for the exact release commit.",
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
    { value: 2, suffix: " yrs", label: "As Twiscope's sole backend developer" },
    { value: 2, suffix: "", label: "Payment gateways integrated (Tap, HyperPay)" },
  ],
} as const satisfies Career;
