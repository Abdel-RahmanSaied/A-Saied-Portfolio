// Single source of truth for the /about FAQ: rendered visibly by AboutClient
// and emitted as FAQPage structured data — the two must always match.
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Who is Abdel-Rahman Saied?",
    a: "Abdel-Rahman Mohamed Saied (عبدالرحمن محمد سعيد), also written Abdelrahman Saied or Abdelrahman Saeed, is a Technical Lead and Staff-level Backend Engineer based in Riyadh, Saudi Arabia. He specializes in distributed backend systems, AI infrastructure, and hands-on engineering leadership, and is the creator of Twiscope, Fendix, and MURI.",
  },
  {
    q: "What is Twiscope?",
    a: "Twiscope is an Arabic OSINT social intelligence platform built by Abdel-Rahman Saied. It processes more than 5 million data points daily across Twitter/X, Instagram, TikTok, Google, and news sources, with ML-driven sentiment analysis, trend detection, and real-time alerting. It is live at twiscope.net.",
  },
  {
    q: "What is Fendix?",
    a: "Fendix is an open-source API security scanner written in Go, created by Abdel-Rahman Saied. It runs DAST and SAST engines together and only raises a build-failing alert when both independently flag the same vulnerability — cutting false positives by roughly 70%. It ships as a single signed binary and is available at fendix.dev.",
  },
  {
    q: "What is MURI?",
    a: "MURI is a student transportation platform engineered by Abdel-Rahman Saied, with dedicated apps for clients, drivers, and admins, a modular Django API, PostGIS geospatial routing, and real-time WebSocket trip tracking. It is live at muri.sa.",
  },
  {
    q: "What are Abdel-Rahman Saied's key engineering achievements?",
    a: "He has led 13 engineers as a Technical Lead and Staff-level Backend Engineer; engineered Twiscope, which ingests 5M+ data points per day across five social networks; improved production backend throughput by 3x; reduced system latency by 25% through Redis caching and async task optimization; cut deployment cycle time by 40% through CI/CD restructuring; and maintains 99.9% uptime across the production systems he owns.",
  },
  {
    q: "How can I contact Abdel-Rahman Saied?",
    a: "By email at abdelrahman.saied@asasit.com, through the contact page at www.asaied.dev/lets-talk, or via GitHub (Abdel-RahmanSaied) and LinkedIn.",
  },
];
