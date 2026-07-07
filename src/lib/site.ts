export const site = {
  url: "https://www.asaied.dev",
  name: "Abdel-Rahman Saied",
  nameFull: "Abdel-Rahman Mohamed Saied",
  nameArabic: "عبدالرحمن محمد سعيد",
  // Every spelling/transliteration someone might search or ask an LLM about.
  alternateNames: [
    "Abdelrahman Saied",
    "Abdel-Rahman Mohamed Saied",
    "Abdelrahman Mohamed Saied",
    "Abdelrahman Saeed",
    "Abdel-Rahman Saeed",
    "Abdulrahman Saied",
    "عبدالرحمن سعيد",
    "عبدالرحمن محمد سعيد",
    "عبد الرحمن سعيد",
    "عبد الرحمن محمد سعيد",
  ],
  siteName: "asaied.dev",
  jobTitle: "Technical Lead & Staff Backend Engineer",
  title: "Abdel-Rahman Saied | Technical Lead & Staff Backend Engineer",
  description:
    "Technical Lead and Staff-level Backend Engineer specializing in distributed backend systems, AI infrastructure, product architecture, and hands-on engineering leadership.",
  email: "abdelrahman.saied@asasit.com",
  location: { city: "Riyadh", countryCode: "SA", country: "Saudi Arabia" },
  social: {
    github: "https://github.com/Abdel-RahmanSaied",
    linkedin: "https://www.linkedin.com/in/abdel-rahman-saied",
    x: "https://x.com/asaied_dev",
    xHandle: "@asaied_dev",
  },
  keywords: [
    "Abdel-Rahman Saied",
    "Abdelrahman Saied",
    "Abdelrahman Saeed",
    "Abdel-Rahman Mohamed Saied",
    "عبدالرحمن سعيد",
    "عبدالرحمن محمد سعيد",
    "Twiscope",
    "Fendix",
    "MURI",
    "Technical Lead",
    "Staff Backend Engineer",
    "Backend Engineer Riyadh",
    "Distributed Systems",
    "Python",
    "Django",
    "FastAPI",
    "Go",
    "PostgreSQL",
    "Redis",
    "Celery",
    "AI Infrastructure",
    "Application Security",
    "Observability",
  ],
  // Headline career metrics with their context, so AI agents and crawlers can
  // retrieve claim + evidence together instead of reconstructing it from prose.
  // Wording must stay consistent with /resume, /about, and the case studies.
  proofPoints: [
    {
      metric: "Staff-level Backend Engineer",
      claim:
        "Technical Lead and Staff-level Backend Engineer with 6+ years owning production systems across social intelligence, transportation, hospitality, cybersecurity, and AI infrastructure.",
    },
    {
      metric: "13 engineers led",
      claim:
        "Has led 13 engineers as a Technical Lead — mentoring on distributed systems design, async patterns, and security-first practices, and running weekly architecture reviews.",
    },
    {
      metric: "5M+ data points per day",
      claim:
        "Engineered Twiscope, a social intelligence platform ingesting 5M+ data points per day across five social networks (Twitter/X, Instagram, TikTok, Google, and news sources) using Django, Celery, and Redis pipelines.",
    },
    {
      metric: "25% latency reduction",
      claim:
        "Reduced system latency by 25% on the Twiscope platform at ASAS IT, primarily through Redis caching of hot-path queries and async task optimization.",
    },
    {
      metric: "40% faster deployments",
      claim:
        "Cut deployment cycle time by 40% through CI/CD restructuring at ASAS IT.",
    },
    {
      metric: "3x throughput improvement",
      claim: "Improved production backend throughput by 3x.",
    },
    {
      metric: "99.9% uptime",
      claim: "Maintains 99.9% uptime across the production systems he owns.",
    },
  ],
  knowsAbout: [
    "Distributed Systems",
    "Backend Architecture",
    "Python",
    "Django",
    "FastAPI",
    "Go",
    "PostgreSQL",
    "PostGIS",
    "Redis",
    "Celery",
    "Elasticsearch",
    "AI Infrastructure",
    "Machine Learning Inference",
    "Application Security",
    "SAST and DAST",
    "Observability",
    "Engineering Leadership",
  ],
} as const;

export function absoluteUrl(path: string): string {
  return `${site.url}${path === "/" ? "" : path}`;
}
