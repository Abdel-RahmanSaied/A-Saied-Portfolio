// Single source of truth for all projects: rendered by the /portfolio page and
// consumed by the GEO surfaces (llms.txt, JSON-LD) so wording never drifts.
export type Project = {
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  image?: string;
  github?: string;
  live?: string;
  caseStudy?: string;
  category: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Twiscope",
    tagline: "OSINT Analytics Platform",
    description:
      "Multi-platform social intelligence system processing 5M+ data points daily across Twitter/X, Instagram, TikTok, Google, and news sources. Features influencer monitoring, ML-driven sentiment analysis, real-time trend alerts, subscription/payment management, and a dual frontend — Angular for the main app and React for 3D data visualization.",
    techStack: ["Python", "Django", "Celery", "Redis", "AWS", "Angular", "React", "ML"],
    live: "https://twiscope.net/",
    caseStudy: "/case-studies/twiscope",
    category: "Analytics",
    featured: true,
    image: "/assets/twiscope-logo.png",
  },
  {
    title: "Fendix",
    tagline: "API Security Scanner",
    description:
      "Open-source hybrid DAST + SAST scanner. Correlated findings cut false positives ~70% — only alerts when both engines independently agree. Ships as a single Go binary with SARIF export and signed releases.",
    techStack: ["Go", "Next.js", "TypeScript", "Docker", "GitHub Actions"],
    github: "https://github.com/Abdel-RahmanSaied/Fendix",
    live: "https://fendix.dev",
    caseStudy: "/case-studies/fendix",
    category: "Security",
    featured: true,
  },
  {
    title: "Maxpeak",
    tagline: "Elite Talent Marketplace",
    description:
      "Curated hiring platform connecting Saudi companies with vetted Egyptian engineers through a rigorous 3-stage AI-powered vetting process. Bilingual (Arabic/English), with in-app chat, analytics dashboards, payment billing, and a quality-guarantee — free replacement if the hire doesn't meet expectations.",
    techStack: ["Django 4.2", "React 18", "TypeScript", "PostgreSQL", "Redis", "Nginx"],
    live: "http://maxpeak.net/",
    caseStudy: "/case-studies/maxpeak",
    category: "Backend",
  },
  {
    title: "Sanad AI",
    tagline: "Twiscope AI Assistant",
    description:
      "Official AI assistant engine of the Twiscope platform — built on FastAPI with OpenAI integration and async SQS-based message processing. Elasticsearch powers intelligent search and analytics; Kibana and Prometheus/Grafana provide full-stack observability across all AI workloads.",
    techStack: ["FastAPI", "OpenAI", "AWS SQS", "Elasticsearch", "PostgreSQL", "Redis", "Kibana"],
    category: "AI / ML",
  },
  {
    title: "MURI",
    tagline: "Student Transportation Platform",
    description:
      "Student transportation platform serving three roles — client, driver, and admin — each with a dedicated app (Flutter Student & Driver apps, Angular 19 admin dashboard). Modular Django API with PostGIS geospatial routing, package-based subscriptions, HyperPay payments, driver wallet accounting, Firebase push, and real-time trip tracking.",
    techStack: ["Django 4.2", "Flutter", "Angular 19", "PostGIS", "Redis", "Celery", "HyperPay", "Firebase", "PostgreSQL", "AWS S3"],
    live: "https://muri.sa/",
    caseStudy: "/case-studies/muri",
    category: "Backend",
  },
  {
    title: "Check-In App",
    tagline: "Attendance & Check-In System",
    description:
      "Mobile attendance solution with QR-based check-ins, real-time presence tracking, and administrative reporting — built end-to-end with Flutter and Dart.",
    techStack: ["Flutter", "Dart"],
    live: "https://check-in.sa/",
    category: "Mobile",
  },
  {
    title: "Hayyak",
    tagline: "Hospitality Management Platform",
    description:
      "Enterprise multi-tenant hotel management and reservation system integrating with Opera PMS (OHIP) and dual payment gateways (Tap Payments + HyperPay). Full guest lifecycle from booking to check-out, with identity verification, Firebase push notifications, real-time WebSocket updates, and bilingual Arabic/English support.",
    techStack: ["Django 5.1", "Opera PMS", "Tap Payments", "HyperPay", "Celery", "Firebase", "WebSockets", "PostgreSQL"],
    caseStudy: "/case-studies/hayyak",
    category: "Backend",
  },
  {
    title: "Shmoos",
    tagline: "Accommodation System Integration",
    description:
      "FastAPI adapter for the Shomoos Saudi accommodation management system — exposing a clean REST layer over the Shomoos API for guest and visitor lifecycle management. Features automatic retry with exponential backoff, standardized response formatting, comprehensive logging, and Swagger UI docs. Deployed on GCP.",
    techStack: ["FastAPI", "GCP", "Python", "Docker", "Swagger"],
    category: "Backend",
  },
  {
    title: "ElevenLabs Dubbing",
    tagline: "AI Voice Dubbing Service",
    description:
      "Automated video dubbing pipeline powered by ElevenLabs API. Handles multi-language voice synthesis with async task queuing, orchestrating end-to-end audio replacement workflows.",
    techStack: ["Django", "ElevenLabs API", "Redis", "Celery", "Python"],
    category: "AI / ML",
  },
  {
    title: "Gymawy",
    tagline: "Fitness Mobile App",
    description:
      "Cross-platform fitness app with custom workout plans, real-time progress tracking, and push notifications. Flutter frontend backed by Django REST Framework and Firebase.",
    techStack: ["Flutter", "Django REST Framework", "Firebase", "Dart"],
    category: "Mobile",
  },
];
