// Shape of a case study. Content lives in case-studies.ts; the page,
// the index, the share card, llms.txt and JSON-LD all read from it.

export type ArchNode = { label: string; detail: string };
export type ArchLayer = { name: string; nodes: ArchNode[] };

export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  headline: string;
  /** One or two sentences: index card, meta description, llms.txt. */
  summary: string;
  readTime: string;
  /** e.g. "Software Team Lead · ASAS IT · Aug 2024 – present". */
  role: string;
  links: { label: string; href: string }[];
  tags: string[];
  /** Small, verifiable facts for the index card (counts, scope, stack) — never unmeasured performance numbers. */
  facts: { value: string; label: string }[];

  problem: string[];
  constraints: string[];
  architecture: { intro: string; layers: ArchLayer[]; notes?: string[] };
  /** Optional product breakdown (Twiscope has several products on one platform). */
  products?: { name: string; summary: string; points: string[]; scope?: string }[];
  /** Optional feature list, grouped; rendered at #features so other pages can link to it. */
  features?: { group: string; items: string[] }[];
  decisions: { title: string; body: string }[];
  tradeoffs: { choice: string; cost: string }[];
  outcomes: { title: string; body: string }[];
  /** What I personally owned or contributed. */
  myRole: string[];
  /** Honest scope notes: what isn't supported, what's unmeasured, what's private. */
  scopeNotes: string[];
  next?: string;
};
