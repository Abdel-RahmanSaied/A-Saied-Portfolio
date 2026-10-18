// Single source of truth for the /about FAQ: rendered visibly by AboutView
// and emitted as FAQPage structured data — the two must always match.
// Answers must stay consistent with career.ts, projects.ts and the case studies.
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Who is Abdel-Rahman Saied?",
    a: "Abdel-Rahman Mohamed Saied (عبدالرحمن محمد سعيد), also written Abdelrahman Saied or Abdelrahman Saeed, is a Software Team Lead and Senior Software Engineer at ASAS IT in Riyadh, Saudi Arabia, specializing in backend and distributed systems. He works across languages and stacks and leads a cross-functional team of up to 13 engineers across backend, frontend, mobile, AI, and QA.",
  },
  {
    q: "What is Twiscope?",
    a: "Twiscope is an Arabic/English media-monitoring, analysis and decision-support platform built at ASAS IT. Its public suite spans account and topic analysis, influencer intelligence, AI-assisted report analysis, channel monitoring, campaign tools, audience-opinion research and social-account management. Abdel-Rahman's case study covers the shared Django/DRF and Celery backend scope he built for Deep-In, influencer monitoring, Decision Hub, alerts, subscriptions and access control. He was Twiscope's sole backend developer from October 2023 to October 2025 and now leads the team.",
  },
  {
    q: "What is Sanad AI?",
    a: "Sanad AI is Twiscope's retrieval-augmented assistant for analytics reports. It answers Arabic and English questions using hybrid Elasticsearch BM25 and vector retrieval over BGE-M3 embeddings, fused with reciprocal rank fusion, with access control enforced by code rather than the language model. Abdel-Rahman leads the team and built its ingestion pipeline, deployment and tracing; teammates built the retrieval core.",
  },
  {
    q: "What is Fendix?",
    a: "Fendix is an application security decision platform that Abdel-Rahman created and maintains independently. Its open-source Go CLI (MIT) turns SAST, DAST, SCA and imported SARIF results into deterministic, confidence-scored findings; a hosted workspace adds coverage-aware release decisions (PASS, WARN, BLOCK or INCOMPLETE). See fendix.dev.",
  },
  {
    q: "What is MURI?",
    a: "MURI is a subscription-based student transportation platform built at ASAS IT, with student, driver and admin apps on a Django/PostGIS backend. Abdel-Rahman led the team: he set up the backend, authentication and deployment pipeline and built its PostGIS geography models and geofenced trip validation; teammates built most of the platform's features.",
  },
  {
    q: "What is Check-In (Hayyak)?",
    a: "Check-In, first branded Hayyak, is a hotel guest self check-in platform integrated with Oracle OPERA Cloud. Abdel-Rahman led its Django backend as a freelancer from April 2024 to January 2026: multi-hotel data model, OPERA (OHIP) integration with check-out folio settlement, Tap Payments and HyperPay, and a Shomoos reporting adapter.",
  },
  {
    q: "How can I contact Abdel-Rahman Saied?",
    a: "By email at abdelrahmansaied080@gmail.com, through the contact page at www.asaied.dev/lets-talk, or via LinkedIn and GitHub (Abdel-RahmanSaied).",
  },
];
