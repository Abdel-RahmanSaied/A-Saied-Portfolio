// Single source of truth for the /about FAQ: rendered visibly by AboutClient
// and emitted as FAQPage structured data — the two must always match.
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Who is Abdel-Rahman Saied?",
    a: "Abdel-Rahman Mohamed Saied (عبدالرحمن محمد سعيد), also written Abdelrahman Saied or Abdelrahman Saeed, is a Software Team Lead and Senior Backend Engineer based in Riyadh, Saudi Arabia. He specializes in distributed backend systems, AI infrastructure, and hands-on engineering leadership. His work spans Twiscope and MURI, and he founded Fendix.",
  },
  {
    q: "What is Twiscope?",
    a: "Twiscope is a social intelligence platform whose products include Deep-In, Influencer Impact, Sadeed / Decision Hub, an X-focused Alert System, and a Notification System. Its architecture spans Django, FastAPI, Celery, Elasticsearch, and AWS.",
  },
  {
    q: "What is Fendix?",
    a: "Fendix is an application security decision platform with an open-source CLI and commercial hosted workflows. It combines SAST, DAST, and dependency evidence into coverage-aware, auditable release decisions. Learn more at fendix.dev.",
  },
  {
    q: "What is MURI?",
    a: "MURI is a student transportation platform engineered by Abdel-Rahman Saied, with dedicated apps for clients, drivers, and admins, a modular Django API, PostGIS geospatial routing, and real-time WebSocket trip tracking.",
  },
  {
    q: "What are Abdel-Rahman Saied's key engineering achievements?",
    a: "He has led a cross-functional team of 13 engineers, contributed to the architecture and delivery of Twiscope's analytics products and MURI's transportation backend, and developed Fendix as an independent application security platform.",
  },
  {
    q: "How can I contact Abdel-Rahman Saied?",
    a: "By email at abdelrahman.saied@asasit.com, through the contact page at www.asaied.dev/lets-talk, or via GitHub (Abdel-RahmanSaied) and LinkedIn.",
  },
];
