import type { CaseStudy } from "./case-study-types";

// Case-study content. Every factual claim here is traceable in
// docs/evidence-matrix.md; numbers are scope facts (counts, versions),
// never unmeasured performance figures.

const twiscope: CaseStudy = {
  slug: "twiscope",
  title: "Twiscope",
  kicker: "Media intelligence and decision support",
  headline: "Twiscope: a shared backend for a growing media-intelligence platform",
  summary:
    "Twiscope is an Arabic/English platform for media monitoring, analysis and decision support. Its public suite now spans account and topic analysis, influencer intelligence, AI-assisted report analysis, channel monitoring and more. This study focuses on the shared backend scope I built: X analysis pipelines, Decision Hub (Sadeed), the alert engine, subscriptions, access control and the service edge on AWS.",
  readTime: "11 min read",
  role: "Sole backend developer (Oct 2023 – Oct 2025) · Software Team Lead since Aug 2024 · ASAS IT",
  links: [{ label: "twiscope.net", href: "https://twiscope.net/" }],
  tags: ["Django / DRF", "Celery", "Redis", "PostgreSQL", "Elasticsearch", "Kong", "FastAPI", "AWS", "Terraform"],
  facts: [
    { value: "5", label: "Backend product areas covered here" },
    { value: "6", label: "Data sources integrated" },
    { value: "2 yrs", label: "As sole backend developer" },
    { value: "Kong", label: "Gateway in front of 4 services" },
  ],
  problem: [
    "Communications and research teams in the region need to understand conversations about keywords, accounts, influencers and brands on X and other networks — in Arabic as well as English. Generic social-listening tools handle Arabic poorly and don't map to how these teams work.",
    "The backend scope covered by this study had five product areas on one platform: deep on-demand reports, influencer monitoring by quarter, decision dashboards that score a brand against its competitors, scheduled alerts and notifications — all sharing the same data collection, subscriptions and organisation permissions.",
  ],
  constraints: [
    "X API v2 has strict rate limits and a cost per request, so every collection path needs budgets and quotas.",
    "Subscriptions are per product and per platform, with daily and monthly quotas, shared across an organisation.",
    "Organisations have roles (owner, admin, member, viewer) that every product must respect.",
    "Collection and analysis can take minutes; none of it may block an API request.",
    "For two years the backend had one developer, so the design had to stay operable by a very small team.",
  ],
  architecture: {
    intro:
      "Requests enter through a Kong gateway that verifies JWTs and rate-limits before routing to a FastAPI auth service, the Django/DRF backend, a realtime lookup service and the Sanad AI service. Heavy work runs in Celery; Elasticsearch holds snapshots, alert events and the news feed.",
    layers: [
      {
        name: "Clients",
        nodes: [
          { label: "Web app", detail: "Angular application with a React 3D view (built by teammates; I own its packaging and deployment)." },
          { label: "Influencers Impact app", detail: "Flutter mobile app built by teammates on the backend's APIs." },
        ],
      },
      {
        name: "Edge",
        nodes: [
          { label: "AWS load balancer → Kong 3.8", detail: "DB-less declarative config: RS256 JWT verification, rate limiting, CORS, and a unified API docs portal." },
          { label: "Auth service (FastAPI)", detail: "Issues RS256 access and refresh tokens; compatible with the existing Django password hashes." },
        ],
      },
      {
        name: "Services",
        nodes: [
          { label: "Django/DRF backend", detail: "About 25 apps: Deep-In, Influencer Impact, Decision Hub, Alert System, subscriptions, organisations." },
          { label: "Realtime lookup service", detail: "On-demand live queries to X, TikTok, Instagram and Google." },
          { label: "Sanad AI", detail: "Retrieval-augmented assistant; exchanges report and enrichment events over SQS." },
          { label: "Notifications service (FastAPI)", detail: "Push and email delivery with its own Celery workers." },
        ],
      },
      {
        name: "Async and data",
        nodes: [
          { label: "Celery + Beat", detail: "Redis broker; queues for reports, Decision Hub, scheduled reports and sentiment backfills." },
          { label: "PostgreSQL (RDS)", detail: "Relational data and report results." },
          { label: "Elasticsearch", detail: "Decision Hub snapshots, alert events, the news feed, word rollups, and logs." },
          { label: "SQS · S3", detail: "Report-ready and enrichment-done events with Sanad; media storage." },
        ],
      },
      {
        name: "Infrastructure",
        nodes: [
          { label: "Terraform on AWS", detail: "VPC across two availability zones, an Auto Scaling group and internal load balancer per service, GPU instance for AI inference." },
          { label: "Delivery", detail: "GitHub Actions on self-hosted runners: security gate, restart, health check, AMI bake, launch-template update, rollback." },
          { label: "Observability", detail: "Prometheus metrics for Django and Celery, Elastic APM, logs in Elasticsearch." },
        ],
      },
    ],
  },
  products: [
    {
      name: "Deep-In",
      summary: "On-demand analysis reports.",
      points: [
        "X keyword reports via full-archive search, with reply enrichment under a per-run request budget.",
        "X account timeline and mentions analysis.",
        "Word, hashtag, emoji, country, top-account and engagement aggregates, plus sentiment from a pretrained-model service.",
        "Instagram, TikTok and Google keyword, hashtag and account reports on demand.",
        "Completed reports publish an event to SQS so Sanad AI can write summaries back.",
      ],
      scope: "Collection runs per report; only the news feed is ingested continuously.",
    },
    {
      name: "Influencer Impact",
      summary: "Influencer monitoring by category and quarter.",
      points: [
        "Staff-managed influencer categories; monitoring a category for a quarter runs a timeline analysis for every influencer in it.",
        "Per-period aggregates and Elasticsearch word rollups feed category rankings, top words, hashtags, emoji and sentiment.",
        "Dashboard hardening: concurrent composite indexes, a per-user Redis response cache, a burst throttle, and cache hit/miss metrics.",
      ],
      scope: "X only. The mobile app was built by teammates.",
    },
    {
      name: "Sadeed / Decision Hub",
      summary: "Decision centres that score a brand against its competitors.",
      points: [
        "A decision centre holds a brand, followed accounts, competitors and keywords, refreshed hourly, every six hours, or daily.",
        "A Beat dispatcher starts one Celery chord per centre: parallel per-entity collection, then a single scoring callback.",
        "Six deterministic weighted indices — reputation, satisfaction, reach, impact, opportunity and risk — with weights versioned per user or globally.",
        "Tenant-scoped Elasticsearch snapshots power trends and scoreboards; stored windows can be replayed and rescored.",
      ],
      scope: "X only. Forecasting is not implemented.",
    },
    {
      name: "Alert System",
      summary: "Scheduled monitoring with deduplicated digests.",
      points: [
        "Each alert gets its own Beat schedule (every 15 minutes by default, at least every 5).",
        "AND-combined conditions on keyword, mention, sentiment, language and location, with cooldown and minimum-match gates.",
        "Deduplication by a database unique constraint per alert and item; events are also indexed in Elasticsearch, with a repair command if that write fails.",
        "One digest per scan by email or HTTPS webhook; webhook targets must resolve to public IPs, checked at save time and send time.",
      ],
      scope: "The engine supports X. Delivery is at-least-once.",
    },
    {
      name: "Notification System",
      summary: "In-app, push and email delivery.",
      points: [
        "In-app notification records that clients poll.",
        "Firebase push and SMTP email through a FastAPI service with its own Celery workers.",
        "Pending, sent and failed states; retries only for transient errors; Redis idempotency keys suppress duplicate sends.",
      ],
      scope: "Built mainly by teammates; I scaffolded the service.",
    },
  ],
  decisions: [
    {
      title: "A modular monolith first, services where boundaries were clear",
      body: "With one backend developer, the products started as Django apps sharing subscriptions, permissions and data, with all slow work in Celery tasks. Pieces with clear, independent boundaries — authentication, notifications, the AI assistant, live lookups — were split into their own services behind the gateway.",
    },
    {
      title: "One collection strategy, three consumers",
      body: "X collection is implemented once and selected per caller: reports persist results to PostgreSQL, alerts fetch and evaluate without persisting, and Decision Hub collects under a reply-enrichment budget. Rate-limit handling honours X's reset header and falls back to capped exponential backoff.",
    },
    {
      title: "Chords so scores are comparable",
      body: "Decision Hub fans out collection for every entity in a centre in parallel and scores them all in one callback at the same instant, so a brand and its competitors are measured against the same window. A per-centre lock prevents overlapping runs, and each run is recorded.",
    },
    {
      title: "Deterministic, explainable scoring",
      body: "Indices are weighted formulas over normalised components such as sentiment share, authority, volume, engagement and momentum. If a component can't be computed it is marked absent and the remaining weights are renormalised rather than silently scored as zero.",
    },
    {
      title: "Deduplicate in the database",
      body: "Alert events rely on a unique constraint, with each insert in its own savepoint so a duplicate is a cheap no-op. Elasticsearch documents reuse the database id, which makes re-indexing idempotent.",
    },
    {
      title: "Authenticate at the edge",
      body: "Kong verifies RS256 tokens and applies rate limits before traffic reaches any service, and authentication moved out of the monolith into a FastAPI service that issues the tokens while staying compatible with existing password hashes.",
    },
  ],
  tradeoffs: [
    { choice: "Monolith with shared Celery workers", cost: "Fast to build and operate with one developer; today one worker container consumes all main queues, so a heavy queue can delay others." },
    { choice: "Scheduled alerts instead of streaming", cost: "Predictable cost under X API limits, but alerts arrive on their schedule (minutes), not in real time." },
    { choice: "Deterministic indices", cost: "Explainable and stable, but no forecasting." },
    { choice: "On-demand collection", cost: "API spend only when a report is requested; there is no continuous archive except the news feed." },
    { choice: "Self-managed Elasticsearch on EC2", cost: "Full control and lower cost, at the price of operating backups and upgrades ourselves." },
  ],
  outcomes: [
    { title: "Five backend product areas, one platform", body: "In the scope covered here, Deep-In, Influencer Impact, Decision Hub, the Alert System and notifications share collection, subscriptions, permissions and infrastructure." },
    { title: "Six data sources", body: "X API v2, EnsembleData for Instagram and TikTok, Google Custom Search, LinkedIn, and a news feed indexed into Elasticsearch every five minutes." },
    { title: "A secured service edge", body: "Every request passes JWT verification and rate limiting at the gateway; services sit in private subnets behind internal load balancers." },
    { title: "Repeatable deployments", body: "Each deploy runs a security gate, restarts the service, health-checks it and bakes a new machine image; deploy jobs typically finish in under two minutes." },
  ],
  myRole: [
    "Sole backend developer from October 2023 to October 2025; I took on team leadership in August 2024 alongside the backend role and remain the largest contributor (about 70% of backend commits overall).",
    "Built the X analysis pipelines and the shared clients for X, Instagram, TikTok and Google.",
    "Built Decision Hub (Sadeed) end to end and the Alert System engine; a teammate built most of the alert delivery tasks.",
    "Built the influencer-monitoring backend, subscriptions and quotas, JWT authentication and organisation roles.",
    "Built the Kong gateway configuration, the FastAPI auth service, the realtime lookup service, the Terraform infrastructure, the deployment pipeline and the monitoring stack.",
    "Teammates built the web and mobile frontends, most of the notification service, scheduled reports, file exports, and the LinkedIn and news ingestion.",
  ],
  scopeNotes: [
    "Earlier versions of this site quoted data-volume, latency and uptime figures that I can't back with measurements I'm able to share; they have been removed.",
    "There is no WebSocket or push channel: alerts run on schedules, and the realtime service answers live lookups on request.",
    "Sentiment comes from pretrained Hugging Face models served by a separate service; no models are trained in this platform.",
    "The repositories contain large test suites (about 3,300 test functions), but CI currently runs security scans and deployments, not the tests.",
    "Twiscope is an ASAS IT product; this study stays at architecture level and omits internal configuration.",
    "Twiscope's public product suite has evolved beyond the five backend areas covered here; twiscope.net is the source of truth for current product names and availability.",
  ],
  next: "sanad-ai",
};

const sanad: CaseStudy = {
  slug: "sanad-ai",
  title: "Sanad AI",
  kicker: "RAG analytics assistant",
  headline: "Sanad AI: grounded Arabic and English answers over Twiscope reports",
  summary:
    "Twiscope's retrieval-augmented assistant answers questions about social-media analytics reports in Arabic or English, with the sources it used. I lead the team that builds it and personally own its ingestion pipeline, deployment, and tracing; this study is explicit about which parts were mine.",
  readTime: "9 min read",
  role: "Software Team Lead · ASAS IT · repo owner and reviewer",
  links: [],
  tags: ["FastAPI", "Elasticsearch", "BGE-M3", "Reciprocal rank fusion", "AWS SQS", "OpenRouter", "Elastic APM"],
  facts: [
    { value: "3", label: "Chat scopes" },
    { value: "7", label: "Report types routable" },
    { value: "BM25 + kNN", label: "Hybrid retrieval" },
    { value: "AR / EN", label: "Question languages" },
  ],
  problem: [
    "Twiscope produces analytics reports on X keywords and accounts, TikTok keywords, accounts and hashtags, and Instagram hashtags and accounts. Analysts wanted to ask questions about those reports — “which accounts drove the most engagement?”, “how did this hashtag compare with last quarter?” — in Arabic or English, instead of reading dashboards.",
    "A generic chatbot was not acceptable: answers had to be grounded in the report's own data, carry the numbers the report actually contains, compare several reports when asked, and only ever use reports the user's subscription allows.",
  ],
  constraints: [
    "Questions arrive in Modern Standard Arabic, Gulf and Egyptian colloquial Arabic, English, or a mix.",
    "Access control must be deterministic: subscription entitlements and report scoping are enforced by code, never delegated to a language model.",
    "Reciprocal rank fusion had to run in the application rather than rely on native Elasticsearch support, to remain compatible with the target cluster.",
    "Reports keep arriving from the Twiscope platform; ingestion has to be idempotent and able to resume a half-processed report.",
    "Every extra model call adds latency and cost, so the number of LLM calls per question had to stay small and bounded.",
  ],
  architecture: {
    intro:
      "A FastAPI service behind Nginx answers chat requests synchronously with async I/O; a separate worker ingests reports from SQS into Elasticsearch. Retrieval is hybrid (lexical and vector) and the language model only sees documents that code has already scoped to the caller's reports.",
    layers: [
      {
        name: "Request path",
        nodes: [
          { label: "Twiscope web app", detail: "Calls the assistant with the user's JWT; questions in Arabic or English." },
          { label: "FastAPI API", detail: "RS256 JWT verification, then an entitlement check against the subscription service before any retrieval." },
          { label: "Intent classifier", detail: "Rules first (greetings, small talk, abuse), an LLM only for ambiguous questions." },
          { label: "LLM index router", detail: "Suggests which indices to search; code intersects the answer with a per-platform allow-list." },
        ],
      },
      {
        name: "Retrieval",
        nodes: [
          { label: "BGE-M3 embeddings", detail: "1024-dimension dense vectors from a self-hosted Text Embeddings Inference server." },
          { label: "BM25 + kNN per index", detail: "Two queries per index run in parallel, each filtered to the authorised report and platform." },
          { label: "Reciprocal rank fusion", detail: "Client-side, unweighted, k = 60, de-duplicated by document id." },
          { label: "Context builder", detail: "Per-report quotas and a character budget; reports with no matches are named explicitly." },
        ],
      },
      {
        name: "Generation",
        nodes: [
          { label: "OpenAI GPT models via OpenRouter", detail: "One grounded answer per question; temperature 0.3, non-streaming." },
          { label: "Response", detail: "Sanitised answer, the source documents used, per-stage timings, and token counts." },
        ],
      },
      {
        name: "Ingestion and operations",
        nodes: [
          { label: "SQS worker", detail: "Reads a report from PostgreSQL, transforms it per platform, embeds, bulk-indexes, and writes a bilingual summary." },
          { label: "Processing traces", detail: "Every stage of every report is recorded, so a failed report resumes from the stage that failed." },
          { label: "Elastic APM", detail: "Tracing across the API and both queue workers, plus request and error logs." },
          { label: "Deployment", detail: "GitHub Actions on a self-hosted runner: backup, restart, health check, rollback, then a fresh machine image." },
        ],
      },
    ],
  },
  decisions: [
    {
      title: "The model chooses where to look; code decides what may be seen",
      body: "The LLM router only returns index names. Code intersects them with an allow-list for the platforms in the request, ignores any other hints, and falls back to fixed defaults if the output is empty or invalid. Report and platform filters are built in Python and injected into every Elasticsearch query, and the entitlement check runs before retrieval. A prompt-injected question can change which eligible index is searched, not which reports are visible.",
    },
    {
      title: "Hybrid retrieval with client-side reciprocal rank fusion",
      body: "BM25 catches exact Arabic terms, hashtags and handles that embeddings blur; kNN over BGE-M3 catches paraphrases and cross-language matches. Each index gets both queries in parallel and the ranked lists are fused with RRF (k = 60) in the service, because the target cluster predates native RRF. If one sub-query fails, the other list is used on its own.",
    },
    {
      title: "Always ground on report aggregates",
      body: "Report-level aggregates and summaries are added to every search regardless of routing, and prompts name each platform's report-total field. Without this, the model treated the handful of retrieved posts as the whole report and produced wrong totals.",
    },
    {
      title: "Rules before the classifier model",
      body: "A rule-based first stage answers greetings, small talk and abusive input without retrieval, normalising Arabic text (diacritics, alef and taa marbuta variants) before matching. Only questions the rules can't place pay for an LLM classification call.",
    },
    {
      title: "Idempotent, resumable ingestion",
      body: "Document ids are deterministic and scoped to the report, so re-indexing overwrites instead of duplicating. A processing trace per report lets the worker skip completed stages. Transient failures leave the message on the queue for redelivery; malformed or permanently invalid messages are removed.",
    },
    {
      title: "Degrade rather than fail",
      body: "If an embedding batch fails during ingestion, those documents are indexed without vectors and stay searchable through BM25. Classifier and router failures fall back to defaults instead of failing the request.",
    },
  ],
  tradeoffs: [
    { choice: "LLM index routing", cost: "One extra model call per question (latency and spend), bounded by deterministic fallbacks." },
    { choice: "Client-side RRF", cost: "Two Elasticsearch round-trips per index and a fixed candidate depth of 20 per list; fusion is unweighted." },
    { choice: "English-only summary embeddings", cost: "One vector space for all questions, but Arabic summary text isn't searched directly." },
    { choice: "30-second entitlement cache", cost: "Fewer calls to the subscription service; a revoked grant can stay usable for up to 30 seconds per process, and an outage of that service blocks chat." },
    { choice: "Comparisons written by the model", cost: "Rankings and differences across reports come from the model following strict prompt rules over retrieved numbers, not from deterministic code." },
  ],
  outcomes: [
    { title: "Three chat scopes", body: "Single report, a user's own reports (up to 1,000 per request), and an entitlement-gated all-reports mode — each with its own retrieval strategy." },
    { title: "Answers that show their sources", body: "Every answer returns the documents it used, per-stage timings and token counts, so quality problems can be traced to retrieval or generation." },
    { title: "Seven report types", body: "X keyword and account, TikTok keyword, account and hashtag, Instagram hashtag and account, each with its own eligible indices and ranking fields." },
    { title: "Repeatable delivery", body: "Pushes to the production branch deploy through GitHub Actions with backup, health check and rollback, then bake a new machine image." },
  ],
  myRole: [
    "Started the FastAPI service and repository and set its structure.",
    "Built the first SQS ingestion worker and the report-processing pipeline from PostgreSQL to Elasticsearch, including the X keyword and account query builders.",
    "Implemented RS256 JWT verification for the API.",
    "Built the deployment workflows (GitHub Actions → systemd, with backup and rollback, then machine-image refresh).",
    "Added Elastic APM tracing to the API and both queue workers.",
    "Built a separate GPU sentiment service for Arabic dialects (three Hugging Face models, batched fp16 inference); it is deployed alongside Sanad but not used by chat.",
    "As team lead and repo owner, reviewed and merged the team's work, including the router and hybrid-retrieval changes. The retrieval core — classifier, LLM router, hybrid search and RRF, prompts, and the embedding and LLM clients — was designed and written by two teammates.",
  ],
  scopeNotes: [
    "No latency, accuracy, cost or traffic numbers are published here; none are measured in a form I can share.",
    "Answers are not streamed, and the system is not real-time: reports are ingested asynchronously.",
    "Observability is Elastic APM plus logs in Elasticsearch; there is no Prometheus or Grafana for this service.",
    "The repository has a large unit-test suite that CI does not yet run. Next improvements: run tests in CI, tighten ingestion error handling and queue visibility windows, and bound fan-out for very large multi-report requests.",
  ],
  next: "fendix",
};

const fendix: CaseStudy = {
  slug: "fendix",
  title: "Fendix",
  kicker: "Application security decision platform",
  headline: "Fendix: release decisions backed by security evidence",
  summary:
    "An open-source Go CLI and a hosted platform that turn SAST, DAST, SCA and imported SARIF results into confidence-scored findings and a coverage-aware release decision. I created it and maintain it on my own.",
  readTime: "10 min read",
  role: "Creator and sole maintainer · independent · Mar 2026 – present",
  links: [
    { label: "fendix.dev", href: "https://www.fendix.dev" },
    { label: "Source (MIT)", href: "https://github.com/Fendix-app/Fendix" },
  ],
  tags: ["Go", "Python", "Semgrep", "SARIF", "Sigstore cosign", "Django", "Next.js"],
  facts: [
    { value: "85", label: "Checks in the v3.6.3 catalog" },
    { value: "18", label: "Finding categories" },
    { value: "53", label: "Releases since Apr 2026" },
    { value: "MIT", label: "Open-source engine" },
  ],
  problem: [
    "Most CI security gates fail a build on severity alone. Unproven findings block releases, teams learn to override the gate, and real issues get lost in the noise.",
    "The opposite failure is quieter: a scanner that didn't run — missing tool, wrong configuration, unreachable target — produces no findings and looks exactly like a clean pass. A team needs to know whether a release meets its security bar, why, and whether the evidence is complete.",
  ],
  constraints: [
    "Run inside CI in minutes, with no dependency on a hosted service for the open-source path.",
    "Deterministic and explainable: no machine-learning model in detection, scoring or decisions.",
    "Never hide findings — every observation stays in the report; only whether it blocks can change.",
    "Work with tools teams already run, through SARIF 2.1.0 import and export.",
    "Trustworthy distribution: signed artifacts, published SBOMs, and no telemetry from the CLI.",
  ],
  architecture: {
    intro:
      "A Go orchestrator runs native analyzers, orchestrates Semgrep and a Python taint-analysis sidecar, imports SARIF, then scores each finding and decides whether it blocks. The hosted workspace adds coverage rules and a single release decision per scan.",
    layers: [
      {
        name: "Evidence inputs",
        nodes: [
          { label: "Running API (DAST)", detail: "15 native HTTP checks: passive, authenticated, two-user IDOR, and opt-in active probes." },
          { label: "Source and specs (SAST)", detail: "Secrets (18 rules), textscan (29 rules), Semgrep (23 Python rules), Python AST taint analysis, OpenAPI checks." },
          { label: "Dependencies (SCA)", detail: "OSV lookups for pip and npm manifests, govulncheck for Go modules." },
          { label: "Imported SARIF", detail: "Results from CodeQL, Semgrep, Trivy or any SARIF 2.1.0 tool." },
        ],
      },
      {
        name: "Evidence engine",
        nodes: [
          { label: "Correlation", detail: "Static and runtime findings merge when categories relate and locations match: route pattern, endpoint, path suffix, then shared segment." },
          { label: "Confidence score", detail: "Deterministic 0–100 score with one published reason per rule that fired; HIGH ≥ 70, MEDIUM ≥ 40." },
          { label: "Coverage", detail: "Each analyzer records ok, skipped or failed with a reason code." },
        ],
      },
      {
        name: "Decisions",
        nodes: [
          { label: "CLI gate", detail: "Each finding is BLOCK, WARN or INFO; exit code 0, 1 (blocking), or 2 (error or enforced coverage gap)." },
          { label: "Hosted release decision", detail: "One decision per scan: BLOCK, INCOMPLETE (required evidence missing), WARN, or PASS — with reasons." },
        ],
      },
      {
        name: "Delivery",
        nodes: [
          { label: "GitHub Action", detail: "Verifies the signed release before running, uploads SARIF to code scanning, gates on the exit code." },
          { label: "Hosted workspace", detail: "Django, Celery and PostgreSQL backend; Next.js frontend in English and Arabic." },
          { label: "Integrations", detail: "Jira issues, Slack and Teams notifications, GitHub checks." },
        ],
      },
    ],
  },
  decisions: [
    {
      title: "Gate on confidence, not severity (v2.0)",
      body: "A finding at or above the --fail-on threshold blocks only when its confidence band and supporting evidence justify it; otherwise it is reported as WARN. This was a breaking change, so --enforce-confidence=false restores the old severity-only behaviour exactly, locked by a test across 54 severity and threshold combinations.",
    },
    {
      title: "Correlation is a signal, not the gate",
      body: "When a static finding and a runtime finding describe the same issue at the same route, they merge into one correlated finding and gain confidence. It is one of seven independent signals. Strong single-source evidence — a live response that shows the issue, or a real credential in production source — can block on its own, and correlation never removes findings.",
    },
    {
      title: "Every point of the score has a reason",
      body: "Confidence starts from a base and each rule adds or subtracts a fixed amount with a plain-language reason. Tests enforce that the reasons sum to the score, so anyone can see why a finding blocked.",
    },
    {
      title: "Coverage is a first-class outcome",
      body: "A scanner that didn't run is recorded as skipped or failed, never silently absent. In the hosted workspace, missing required evidence produces INCOMPLETE rather than PASS; on the CLI, opt-in flags turn coverage gaps into a failing exit code.",
    },
    {
      title: "Imported results can't vouch for themselves",
      body: "SARIF from other tools is kept out of native correlation. It can corroborate a native finding only when an independent tool reports the same CWE at the same normalised location.",
    },
    {
      title: "A verifiable supply chain",
      body: "Binaries, Linux packages, SBOMs and container images are signed with cosign keyless signing; each binary ships CycloneDX and SPDX SBOMs and an SLSA v1.0 provenance statement (Level 2). The GitHub Action checks the signed build record before running.",
    },
  ],
  tradeoffs: [
    { choice: "Confidence-gated failures", cost: "Builds that used to fail can now pass; teams that want the old behaviour must opt out explicitly, and those decisions are flagged as policy overrides." },
    { choice: "Go binary plus a Python sidecar", cost: "The deepest analysis (Python taint) needs the Python engine tree or the official container; the standalone binary records it as unavailable." },
    { choice: "Uneven language depth", cost: "Python has interprocedural, sanitizer-aware taint analysis; Go, JavaScript/TypeScript and Java rely on line-local pattern rules." },
    { choice: "Deterministic rules over learned models", cost: "Fully explainable decisions, but detection is bounded by the rules that exist." },
    { choice: "Linux and macOS only", cost: "Releases target linux and darwin on amd64 and arm64 plus a multi-arch container; there is no Windows build." },
  ],
  outcomes: [
    { title: "Evidence-based gate shipped", body: "Confidence-gated decisions since v2.0 (August 2026), with stable finding fingerprints since v3.0 and per-occurrence suppression since v3.6." },
    { title: "Verifiable releases", body: "53 releases since April 2026; current releases are signed and ship SBOMs and provenance. I verified the v3.6.3 binary and container signatures with cosign." },
    { title: "Published, caveated benchmarks", body: "CI-gated corpora (for example a 56-case synthetic SAST corpus) with their limits stated: they measure the rules on curated cases, not a real-world detection rate." },
    { title: "Open source plus hosted", body: "The MIT engine runs anywhere in CI; the hosted workspace adds organisations, roles, MFA, an audit log and release decisions." },
  ],
  myRole: [
    "Created Fendix and remain its only maintainer: the Go engine and Python analyzers, the hosted backend and frontend, the release pipeline, and the documentation.",
    "Designed the evidence model: correlation rules, confidence scoring, coverage tracking, and both decision layers.",
    "Built the signed release and packaging pipeline (binaries, .deb/.rpm, container images, SBOMs, provenance, Homebrew tap).",
  ],
  scopeNotes: [
    "The effect of correlation on false positives has not been measured; it is described as a mechanism. An earlier version of this site claimed a measured reduction and described a stricter gate than the one that shipped; both claims have been removed.",
    "Managed CI and tamper-evident decision records are in limited availability; the public demo workspace uses sample data.",
    "Fendix holds no third-party security certification, and I don't claim customer or adoption numbers.",
    "--offline is not yet fully hermetic when the Python dependency check runs; the README documents the workaround.",
  ],
  next: "qatf",
};

const muri: CaseStudy = {
  slug: "muri",
  title: "MURI",
  kicker: "Student transportation platform",
  headline: "MURI: subscriptions, seats and trips for student transport",
  summary:
    "A subscription-based student transportation platform for Saudi Arabia: student and driver apps, an admin portal, and a Django/PostGIS backend. As team lead I set up the backend and its delivery pipeline and built its geography and trip-validation pieces; teammates built most of the platform features described here.",
  readTime: "8 min read",
  role: "Software Team Lead · ASAS IT · 2025",
  links: [],
  tags: ["Django", "DRF", "PostGIS", "Celery", "Redis", "HyperPay", "Firebase", "Flutter", "Angular"],
  facts: [
    { value: "3", label: "Apps: student, driver, admin" },
    { value: "PostGIS", label: "Geography, SRID 4326" },
    { value: "Double-entry", label: "Driver wallet ledger" },
    { value: "AR / EN", label: "Bilingual end to end" },
  ],
  problem: [
    "Families subscribe students to daily transport on fixed routes. Behind that simple promise the operator has to sell seats without overselling vehicles, generate every trip for the subscription period, take card payments, track drivers, and pay them — across students, drivers and administrators.",
    "Payments make it harder: a gateway confirmation can arrive late, twice, or not at all, and a paid subscription that never activates is worse than a failed payment.",
  ],
  constraints: [
    "Seat allocation must be safe under concurrent purchases — never oversell a vehicle.",
    "HyperPay notifications can be delayed or duplicated; activation must be idempotent.",
    "Drivers work on mobile networks; trip actions must be validated against where and when they happen.",
    "Arabic and English throughout, including app copy that changes without an app release.",
    "A small team, so operational pieces had to stay simple.",
  ],
  architecture: {
    intro:
      "A modular Django REST backend on PostgreSQL/PostGIS, with Celery and Redis for schedules and background work. Three clients share it: two Flutter apps and an Angular admin portal.",
    layers: [
      {
        name: "Clients",
        nodes: [
          { label: "Student app (Flutter)", detail: "Subscribe and pay, follow the trip on a map, show a QR code at pickup." },
          { label: "Driver app (Flutter)", detail: "Assigned trips, location uploads, QR pickup scans, SOS reports, wallet." },
          { label: "Admin portal (Angular 19)", detail: "Users, geography, routes and trips, packages, payments, settings." },
        ],
      },
      {
        name: "Backend (Django/DRF)",
        nodes: [
          { label: "Auth and user modules", detail: "JWT with phone OTP; separate client, driver and administrator apps." },
          { label: "Subscriptions and trips", detail: "Packages, seat allocation, trip generation, cancellations and change requests." },
          { label: "Payments and accounts", detail: "HyperPay client and webhooks; double-entry ledger and driver wallets." },
          { label: "Regions, notifications, support", detail: "PostGIS geography, Firebase push templates, server-driven translations." },
        ],
      },
      {
        name: "Async, data and infrastructure",
        nodes: [
          { label: "Celery + beat", detail: "Reminders, expiries, missed trips, payment reconciliation, route ordering, proximity pushes." },
          { label: "PostgreSQL + PostGIS", detail: "Geography columns for cities, district polygons, stops and trip points." },
          { label: "HyperPay · FCM · S3", detail: "Card and Apple Pay payments, push notifications, documents and media." },
          { label: "AWS delivery", detail: "Docker Compose on EC2 in an Auto Scaling group; deploys bake a new machine image." },
        ],
      },
    ],
  },
  decisions: [
    {
      title: "Allocate seats under row locks, in a fixed order",
      body: "Seat allocation runs in one transaction that locks the route's trip rows with SELECT … FOR UPDATE, always in the same (priority, id) order so concurrent purchases can't deadlock, then checks remaining seats per slot and fails cleanly when a route is full. Payment confirmation also locks the subscription and does nothing if it isn't awaiting payment, so a duplicate confirmation is harmless.",
    },
    {
      title: "Webhooks trigger work; the gateway decides",
      body: "HyperPay notifications are decrypted and authenticated (AES-256-GCM), logged, and handed to Celery. The task locks the transaction and re-fetches its status from HyperPay instead of trusting the payload; activation is dispatched only after the database transaction commits.",
    },
    {
      title: "Reconcile instead of hoping",
      body: "Three scheduled safety nets: re-poll transactions stuck in progress, re-drive subscriptions that were charged but never activated (up to five attempts, then alert an admin), and refund automatically when seats can't be allocated after payment.",
    },
    {
      title: "A ledger for driver money",
      body: "Driver earnings, commissions, bonuses and deductions are journal entries in a double-entry ledger that rejects unbalanced postings. Wallet holds change under row locks with F-expressions, and revenue can be recognised at payment or as trips complete.",
    },
    {
      title: "Validate trip actions by place and time",
      body: "Geography is stored as PostGIS geography (SRID 4326). A driver can start a trip only within 100 m of the route start and between 20 minutes early and 10 minutes late, and can end it only within 100 m of the route end; QR pickups must happen within 50 m of the stop, in order.",
    },
    {
      title: "Server-driven app copy",
      body: "App strings live in a translation store on the backend and are served to both apps, so wording in Arabic and English can change without shipping new app builds.",
    },
  ],
  tradeoffs: [
    { choice: "Polling for live location", cost: "Simple infrastructure; drivers upload at most every 10 seconds and students poll every 10 seconds, so the map can lag by up to about 20 seconds." },
    { choice: "Point-to-point distances in Python", cost: "Fine for checking one driver against one stop; a table-wide nearest-driver search would need spatial SQL instead." },
    { choice: "Generate all trips at payment", cost: "Simple scheduling and reporting; changes go through cancellations and change requests." },
    { choice: "Beat and Redis on the app instance", cost: "Simple at one instance; scaling out first requires moving the scheduler and cache to shared infrastructure." },
    { choice: "Fixed-speed ETAs for stop ordering", cost: "Predictable and cheap (OR-Tools ordering for longer routes), but not traffic-aware." },
  ],
  outcomes: [
    { title: "End-to-end subscriptions", body: "Choose a package, pay, get seats allocated, and receive generated trips for the whole period — with expiry and renewal reminders." },
    { title: "Driver operations", body: "Geofenced trip start and end, QR pickups, absence marking, SOS reports with an admin workflow, and wallet withdrawals." },
    { title: "Payments that self-heal", body: "Webhook re-fetch, scheduled reconciliation and automatic refunds cover the delayed, duplicated and missing-notification cases." },
    { title: "Shipped apps", body: "The student and driver apps are published on Google Play and the App Store." },
  ],
  myRole: [
    "Led the team as Software Team Lead, and bootstrapped the backend: project structure, settings, logging, JWT and phone-OTP authentication, and the base permission classes.",
    "Built the deployment pipeline: Docker Compose build, health check, machine-image bake and launch-template rollout.",
    "Modelled geography with PostGIS (city centres and district polygons) and loaded the Saudi seed data.",
    "Built the geofenced trip start/end validation and the server-driven translation store.",
    "Teammates built the apps and admin portal, the Terraform, payments, the wallet ledger, notifications, route ordering, QR pickup, SOS and almost all of the tests; I describe those as team features.",
  ],
  scopeNotes: [
    "No user or traffic numbers are claimed. The public marketing domain wasn't reachable when this was written, so there is no link.",
    "There are no WebSockets: live location is REST uploads plus polling.",
    "The repository has several hundred tests, but CI runs deployments and a security scan, not the test suite.",
  ],
  next: "maxpeak",
};

const hayyak: CaseStudy = {
  slug: "hayyak",
  title: "Check-In (Hayyak)",
  kicker: "Hotel guest-journey platform",
  headline: "Check-In: guest self check-in on top of Oracle OPERA",
  summary:
    "The backend for a hotel guest app (first branded Hayyak, later Check-In): guests claim their OPERA reservation, add co-guests, check in, extend, and check out with in-app payment, across multiple hotels. I led the backend as its primary contributor and repository owner.",
  readTime: "9 min read",
  role: "Technical Lead, Backend · freelance · Apr 2024 – Jan 2026",
  links: [],
  tags: ["Django", "DRF", "Oracle OPERA (OHIP)", "Tap Payments", "HyperPay", "Celery", "Django Channels", "FastAPI"],
  facts: [
    { value: "3 levels", label: "Organisation → group → hotel" },
    { value: "2", label: "Payment gateways, one interface" },
    { value: "OPERA Cloud", label: "System of record (OHIP)" },
    { value: "AR / EN", label: "Bilingual" },
  ],
  problem: [
    "Hotels in Saudi Arabia run Oracle OPERA, and arrival still means queueing at the front desk for identity checks, room assignment and payment. The product's goal was to let guests do that from their phone.",
    "OPERA had to remain the system of record: every action a guest takes in the app — room assignment, check-in, a folio charge, check-out — must land in OPERA exactly as a front-desk agent's would. And the platform had to serve several hotels, each with its own OPERA credentials, payment gateway and stay policies.",
  ],
  constraints: [
    "OPERA Cloud is authoritative; the app must never drift from it.",
    "Per-hotel configuration: OHIP credentials, payment gateway, and early check-in / late check-out windows and fees.",
    "Card data must never reach the backend — only gateway tokens.",
    "Guests must complete identity verification before they can be added to a reservation.",
    "Arabic and English throughout, and support for Saudi accommodation reporting (Shomoos).",
  ],
  architecture: {
    intro:
      "A Django REST API with Daphne for WebSockets, Celery for webhooks and notifications, Redis, and PostgreSQL. OPERA is called synchronously through OHIP so the guest sees OPERA's real answer; payments run through one gateway layer with two providers.",
    layers: [
      {
        name: "Clients",
        nodes: [
          { label: "Guest app (Flutter)", detail: "On-device passport/ID reading (MRZ and NFC chip) and face matching; gateway SDKs capture cards." },
          { label: "Hotel staff portal", detail: "Organisation, group and hotel configuration, rooms and options." },
          { label: "Django admin", detail: "Operations and support." },
        ],
      },
      {
        name: "Backend",
        nodes: [
          { label: "Django REST API", detail: "Guest identity records, hotels and staff roles, OPERA-backed reservations, payments, notifications." },
          { label: "Daphne + Channels", detail: "Knox-authenticated WebSockets for guest ↔ staff support chat." },
          { label: "Celery + beat", detail: "Webhook processing, push and email fan-out, re-checking payments stuck in progress." },
          { label: "PostgreSQL · Redis · Cloud Storage", detail: "Shared multi-hotel schema; broker, cache and channel layer; media and documents." },
        ],
      },
      {
        name: "External systems",
        nodes: [
          { label: "Oracle OPERA Cloud (OHIP)", detail: "Per-hotel OAuth2; reservations, front office and cashiering APIs." },
          { label: "Tap Payments · HyperPay", detail: "Gateway chosen per hotel; signed or encrypted webhooks." },
          { label: "Firebase Cloud Messaging", detail: "Push notifications to guests." },
          { label: "Shomoos adapter (FastAPI)", detail: "Sidecar that wraps the Saudi accommodation-reporting API." },
        ],
      },
    ],
  },
  decisions: [
    {
      title: "Multi-hotel tenancy in one schema",
      body: "Organisation → Hotel Group → Hotel, with staff roles (super user, moderator, group manager, branch manager) and per-hotel rows for OHIP credentials, gateway and stay policies. Isolation is enforced in querysets and permission classes; guests and hotel staff are separate user models with separate token tables.",
    },
    {
      title: "OPERA first: pull before every action, push every change",
      body: "Before a guest checks in, extends or checks out, the backend refreshes the reservation from OHIP, then pushes the action — room assignment, check-in, folio postings, check-out — back to OPERA in the same request, so the app reflects OPERA's actual state rather than a local copy.",
    },
    {
      title: "Check-out as an orchestrated settlement",
      body: "Check-out reads the OPERA folio windows, classifies each as unpaid, overpaid or settled, charges any outstanding balance through the hotel's gateway, posts the payment to each window, closes the folios, and only then checks the guest out — mapping OPERA's unsettled-balance error to a clear domain error.",
    },
    {
      title: "Two gateways behind one interface",
      body: "Tap and HyperPay are strategies behind a common gateway layer selected per hotel. Transactions move through explicit states with an audit log. Webhooks are verified (Tap HMAC, HyperPay AES-GCM) and treated as a signal to re-fetch the transaction from the gateway under a row lock, never as the source of truth. Cards are entered in the gateway SDKs; the backend stores tokens, brand and last four digits only.",
    },
    {
      title: "Shomoos behind its own adapter",
      body: "A small FastAPI service wraps the government accommodation API for guests, visitors and lookups, normalising its fault format into one response envelope with Swagger documentation, so Django never deals with the upstream protocol directly.",
    },
  ],
  tradeoffs: [
    { choice: "Synchronous OHIP calls", cost: "Simple, immediate and consistent with OPERA, but a slow OPERA response slows the guest's request; there is no queued retry layer yet." },
    { choice: "Shared schema for all hotels", cost: "One database to operate; isolation depends on every queryset and permission check being correct." },
    { choice: "Gateway per hotel, no automatic failover", cost: "Clean reconciliation per hotel; a provider outage affects that hotel's payments until it is switched." },
    { choice: "Re-fetch on every webhook", cost: "An extra gateway call per event in exchange for never trusting webhook bodies." },
    { choice: "On-device identity verification", cost: "Fast for guests; the server stores the documents and results but does not re-verify them." },
  ],
  outcomes: [
    { title: "End-to-end guest stay", body: "Claim a reservation, add registered or unregistered co-guests, check in, extend, take a late check-out, and check out with payment — with OPERA updated at each step." },
    { title: "Hotel-level configuration", body: "Each hotel carries its own OPERA credentials, gateway, and paid early check-in / late check-out rules." },
    { title: "Support chat", body: "Real-time guest ↔ staff chat over authenticated WebSockets." },
    { title: "Safe deployments", body: "Containerised services (Gunicorn, Daphne, Celery, Nginx) deployed by GitHub Actions with a pre-deploy backup and automatic rollback." },
  ],
  myRole: [
    "Primary backend contributor and repository owner (a little over half of backend commits).",
    "Designed the multi-hotel data model and staff roles.",
    "Built the OHIP client and the check-in and check-out orchestration, including folio settlement.",
    "Built the support chat on Django Channels and set up containerised deployment and CI/CD.",
    "Co-designed the payments layer with a teammate, who wrote most of the gateway and notification code.",
    "Co-developed the Shomoos adapter; the Flutter guest app and the second staff portal were built by teammates.",
  ],
  scopeNotes: [
    "No adoption or efficiency metrics are claimed; none were instrumented.",
    "Automatic reporting of checked-in guests to Shomoos was built on a branch that was not merged.",
    "This study covers the Django/DRF backend and integrations in my repositories.",
  ],
  next: "muri",
};

const maxpeak: CaseStudy = {
  slug: "maxpeak",
  title: "Maxpeak",
  kicker: "Technical hiring marketplace · pre-launch",
  headline: "Maxpeak: an LLM-assisted first stage for vetting engineers",
  summary:
    "The backend for a bilingual marketplace connecting Saudi companies with engineers from Egypt. I built the Django API, its authentication, and the automated first stage of a three-stage vetting flow: a Celery pipeline that extracts CV text and scores it with an LLM. The product is pre-launch.",
  readTime: "6 min read",
  role: "Backend and frontend · independent build · 2025–2026",
  links: [{ label: "maxpeak.net", href: "https://www.maxpeak.net/" }],
  tags: ["Django 5.2", "DRF", "Celery", "Redis", "PostgreSQL", "OpenRouter", "Next.js"],
  facts: [
    { value: "3", label: "Vetting stages modelled" },
    { value: "Stage 1", label: "Automated (CV screening)" },
    { value: "94", label: "Unit tests on CV extraction" },
    { value: "AR / EN", label: "Bilingual" },
  ],
  problem: [
    "Hiring engineers across borders is a trust problem: companies can't easily evaluate candidates remotely, and candidates can't easily prove their level. Maxpeak's model is to do the vetting before a company sees a profile: ATS screening, a technical assessment, then an expert interview.",
    "The first stage has to handle every applicant, so it had to be automated without becoming a black box.",
  ],
  constraints: [
    "CVs arrive as PDF or Word documents in English, Arabic, or both.",
    "Screening must not block the upload request; it can take tens of seconds.",
    "The model provider should be swappable without touching business logic.",
    "Other services must be able to verify user tokens without holding the signing secret.",
  ],
  architecture: {
    intro:
      "A Django REST API with Celery workers. CV uploads trigger an asynchronous extract-then-parse pipeline whose result advances or stops the candidate's vetting workflow.",
    layers: [
      {
        name: "API",
        nodes: [
          { label: "Accounts and auth", detail: "Candidate, company, interviewer and admin roles; RS256 JWT with a JWKS endpoint; Google, LinkedIn and GitHub sign-in." },
          { label: "Companies and jobs", detail: "Company profiles, team members, hiring preferences, job offers with accept/reject." },
          { label: "Vetting workflow", detail: "ATS screening → technical assessment → expert interview, with tiers." },
        ],
      },
      {
        name: "CV pipeline (Celery)",
        nodes: [
          { label: "Text extraction", detail: "PDF and DOCX text extraction; image-only files are rejected with a clear message." },
          { label: "LLM parsing", detail: "Structured profile, skills, summary and a 0–100 screening score; OpenRouter by default, other providers pluggable." },
          { label: "Stage gate", detail: "A score of 70 or more advances the candidate; the result is written to the vetting workflow." },
        ],
      },
    ],
  },
  decisions: [
    { title: "Asymmetric tokens with a JWKS endpoint", body: "RS256-signed JWTs let any future service verify tokens with the public key alone, and token blacklisting supports log-out-everywhere." },
    { title: "Pluggable model strategies", body: "The parser talks to a strategy interface; OpenRouter (a GPT-4o-mini class model by default) is configured, with Anthropic and a local Ollama model as drop-in alternatives." },
    { title: "Two Celery tasks with retries", body: "Extraction and parsing are separate tasks, so a model outage retries the parse without re-reading the file, and uploads return immediately." },
    { title: "Reject what can't be read reliably", body: "Scanned, image-only CVs fail fast with an instruction to upload a text PDF or DOCX, instead of guessing with OCR." },
  ],
  tradeoffs: [
    { choice: "One holistic LLM score", cost: "Simple to build and explain, but not a calibrated rubric; it needs validation against expert decisions before it can carry more weight." },
    { choice: "A fixed pass threshold", cost: "Predictable behaviour, but candidates near the threshold are treated the same as clear passes or fails." },
    { choice: "No OCR", cost: "Higher extraction reliability at the cost of turning away scanned CVs." },
  ],
  outcomes: [
    { title: "Working first stage", body: "Upload → extract → parse → score → advance or stop, asynchronously, with retries." },
    { title: "Tested extraction layer", body: "94 unit tests cover PDF and DOCX text extraction and its error cases." },
    { title: "Foundations for the rest", body: "The data model for assessments, interviews, tiers and company subscriptions exists; their logic is still to be built." },
  ],
  myRole: [
    "Designed and built the Django API, authentication, CV pipeline and vetting data model.",
    "Built the Next.js frontend with Arabic right-to-left support.",
  ],
  scopeNotes: [
    "Pre-launch: the product website (maxpeak.net) is public, but the platform backend is not publicly deployed yet.",
    "Only the first vetting stage is automated; assessment scoring, interviews, payments, in-app messaging and the replacement guarantee are planned, not built.",
    "No hiring or user numbers are claimed.",
  ],
};

const qatf: CaseStudy = {
  slug: "qatf",
  title: "Qatf",
  kicker: "Open-source video tool",
  headline: "Qatf: long videos into vertical clips, with Arabic done properly",
  summary:
    "An open-source tool (Apache-2.0) that turns a long video into 9:16 clips with word-by-word captions. A language model picks the moments; transcription, cut placement and rendering stay deterministic, and right-to-left Arabic captions are a first-class path. I created it and maintain it; it is a working prototype.",
  readTime: "8 min read",
  role: "Creator and maintainer · independent, open source · Aug 2026 – present",
  links: [{ label: "Source (Apache-2.0)", href: "https://github.com/Abdel-RahmanSaied/Qatf" }],
  tags: ["Python", "FastAPI", "faster-whisper", "ffmpeg", "libass", "SQLite", "React", "TypeScript", "Docker"],
  facts: [
    { value: "5", label: "Pipeline stages" },
    { value: "8", label: "Model presets" },
    { value: "4", label: "Word-by-word caption styles" },
    { value: "Apache-2.0", label: "Open-source licence" },
  ],
  problem: [
    "Cutting a long talk into Reels, Shorts and TikTok clips by hand is slow, and the tools that automate it are built around English. On Arabic they mishear technical terms, and right-to-left captions can render with the words in the wrong order.",
    "Letting a language model choose the clips creates a second problem: models are good at finding the interesting passages and bad at timing, so clips open or close in the middle of a word.",
  ],
  constraints: [
    "Arabic and right-to-left captions have to work as well as English, and be checked on rendered frames rather than assumed.",
    "The model may choose passages and propose approximate timings, but code places every final cut on a real word boundary from the audio.",
    "Switching model provider, hosted or local, must need no code change and must not affect cut accuracy.",
    "One command to run on a laptop or a GPU machine; a GPU speeds things up but is not required.",
    "Every default needs a recorded measurement, including the options that were tried and rejected.",
  ],
  architecture: {
    intro:
      "Five stages behind one job model. Whisper turns speech into words with timings, one model call picks the passages, and everything about where a cut lands is deterministic. The same pipeline runs behind a CLI, a FastAPI service and a React web UI.",
    layers: [
      {
        name: "Inputs",
        nodes: [
          { label: "Upload", detail: "Multipart upload, 2 GB by default." },
          { label: "Server path", detail: "Sandboxed to a media root, so a request can't name an arbitrary file." },
          { label: "YouTube link", detail: "Fetched with yt-dlp, on an exact-host allowlist." },
        ],
      },
      {
        name: "Pipeline",
        nodes: [
          { label: "Audio", detail: "ffmpeg demux, with optional denoising." },
          { label: "Transcribe", detail: "faster-whisper large-v3 on the GPU when usable, or the video's own caption track." },
          { label: "Select", detail: "The only model call: which passages, at MM:SS resolution." },
          { label: "Snap", detail: "Each boundary moved onto a real word; deterministic." },
          { label: "Render", detail: "9:16 reframe and burned-in word-by-word captions, H.265 or H.264." },
        ],
      },
      {
        name: "Interfaces",
        nodes: [
          { label: "CLI", detail: "Plan only, edit plan.json, then render exactly that plan." },
          { label: "HTTP API", detail: "FastAPI; every start returns 202 and a job id, and the client polls." },
          { label: "Web UI", detail: "React and Vite, in English and Arabic with a mirrored layout." },
        ],
      },
      {
        name: "State",
        nodes: [
          { label: "SQLite (WAL)", detail: "Job records, word corrections, and a transcript cache keyed on model, language and vocabulary." },
        ],
      },
    ],
    notes: [
      "Imports run one way, api → jobs → pipeline → llm → core. A smoke test reads the core package's source and fails on any import that points back up.",
      "Stages 1, 4 and 5 never call a model, so changing the provider can't change where a cut lands or how a clip renders.",
    ],
  },
  features: [
    {
      group: "Bring a video",
      items: [
        "Upload a file (2 GB by default), name a file already on the server, or paste a YouTube link.",
        "Only youtube.com, m.youtube.com, music.youtube.com and youtu.be are accepted; anything else is refused.",
      ],
    },
    {
      group: "Speech to words",
      items: [
        "Whisper from tiny to large-v3, on the GPU when one is usable, or forced to CUDA or CPU. A named device never silently falls back.",
        "Language forced or detected; for a YouTube link, the video's own caption track can replace Whisper when it has per-word timings.",
        "For Arabic: a vocabulary list to spell terms your way, denoising for noisy audio, and fix-ups that respell a word everywhere.",
        "Correct any word afterwards, by hand or with model suggestions you accept one by one. Only caption text changes, never a cut.",
      ],
    },
    {
      group: "Picking the moments",
      items: [
        "Choose how many clips (5 by default) and how long each may be (30–75 s; 52 s is the product's conservative default for short-form clips).",
        "A clip outside the requested length is kept and flagged, never silently dropped.",
        "Any provider, with thinking on or off. Stop before rendering to edit starts, ends, titles and order; edited cuts are moved back onto words.",
      ],
    },
    {
      group: "Captions",
      items: [
        "Four word-by-word styles (box, pill, marker, youtube) where the spoken word lights up, on right-to-left Arabic as well as English.",
        "A one-line-at-a-time fallback, or no captions at all; font and words per line are configurable.",
        "Captions sit about 70% down the frame, above where TikTok and Shorts place their buttons.",
      ],
    },
    {
      group: "The video",
      items: [
        "Crop a 9:16 slice, blur the full frame over a blurred background, or track the largest face.",
        "1080p, 1440p, 4K, any size, or the source resolution; H.265 tagged for Apple devices, or H.264.",
        "Encode preset, quality (CRF 20 by default) and 10-bit output for 10-bit sources.",
      ],
    },
    {
      group: "While it runs, and after",
      items: [
        "Live progress for the download and the render, measured from ffmpeg rather than guessed, plus a cancel button.",
        "Download clips one by one or all at once; re-render with new options without transcribing again.",
        "A health check reports ffmpeg, the active provider, its credential and whether transcription will get a GPU, before a job starts.",
        "Provider, model and thinking can be changed from the Settings page without a restart.",
      ],
    },
  ],
  decisions: [
    {
      title: "The model proposes the moment; code places the cut",
      body: "Stage 3 reads the transcript in roughly 12-second windows and proposes the start and end in MM:SS. Stage 4 moves each proposal onto a real word timestamp from Whisper. The model can change which passage is selected, but the audio determines the final cut boundary, so swapping providers cannot make a clip open mid-word.",
    },
    {
      title: "Arabic captions are verified on rendered frames",
      body: "A libass bidi behaviour reordered Arabic words whenever the highlighted word changed style, and the obvious tests all passed. The fix gives every word its own caption cue. A render check walks the highlight along a line, renders one frame per position and asserts it moves right to left; the caption styles themselves were chosen from real renders of an Arabic video.",
    },
    {
      title: "Text edits can never move a cut",
      body: "The transcript editor changes words only, and hand-edited plan boundaries are always re-snapped onto word times. A spelling fix after rendering therefore only re-runs the render stage.",
    },
    {
      title: "Every default has a number behind it",
      body: "Crop is the default framing because it keeps about three times the subject pixels of blur and rendered 1.8× faster in the recorded test; the encode preset, codec and transcription levers each have a measurement, and the options that were tried and rejected are written down too.",
    },
    {
      title: "Checks that can fail",
      body: "Each render fixture renders a control and asserts that the control fails, and the API load test asserts rather than reports. The load test found the health check starting an ffmpeg process on every request, which no sequential test could see.",
    },
  ],
  tradeoffs: [
    { choice: "Model picks, code cuts", cost: "Snapping to words can add a few seconds per clip, so asking for 60 s can produce 63 s. The 52-second default leaves a conservative margin for short-form clips; it is a product choice, not a YouTube Shorts limit." },
    { choice: "Track the largest face", cost: "There is no active-speaker model yet, so a two-person shot can frame the listener, and the tracking constants are unmeasured starting values." },
    { choice: "An in-process job queue on SQLite", cost: "One command to run, but jobs don't survive a restart and cancel only takes effect between steps." },
    { choice: "No built-in authentication", cost: "The API has to sit behind something else before a port is exposed." },
    { choice: "GPU reserved by default in Docker", cost: "Fast transcription on a GPU machine; without one, the compose file needs a small edit and large-v3 runs slowly on CPU." },
  ],
  outcomes: [
    { title: "Verified end to end", body: "A 12-minute 4K ProRes Arabic video recorded in a moving car went through all five stages with a real provider and produced 8 vertical clips with burned-in Arabic captions — through the CLI on a GPU, and separately through the HTTP API." },
    { title: "Arabic transcription: 23 errors to 3", body: "On that recording, tracked transcription errors fell from 23 to 3 with a 30-term vocabulary list, denoising and fix-ups, as recorded in the repository's quality notes." },
    { title: "Tested without a GPU", body: "CI runs the database, pipeline, provider and API suites on Python 3.10 and 3.12, a 24-thread load test, the frontend tests and type check, a real ffmpeg render check and the Docker build." },
    { title: "Open to contributors", body: "Apache-2.0 with DCO sign-off and a contributing guide ranked by value per effort. The first outside contribution, a redesign of every screen with an Arabic interface, has been merged." },
  ],
  myRole: [
    "Created Qatf and maintain it: the pipeline, the provider layer, the job system, the HTTP API, the CLI, the first web UI and the documentation — 117 of its 119 commits.",
    "Ran the measurements behind the defaults: transcription levers on Arabic, framing modes, codecs and encode presets, and the API under concurrent load.",
    "Reviewed and merged the current UI design, including its Arabic and right-to-left layout, contributed by @Dabash99 (PR #4).",
  ],
  scopeNotes: [
    "A working prototype, not production: the API has no authentication, jobs don't survive a restart, and cancel can't interrupt an ffmpeg or Whisper call already running.",
    "Only OpenRouter has been run against its real endpoint; the other providers are tested on the requests Qatf sends, not on real replies.",
    "Whisper's word-timing accuracy on Arabic hasn't been measured, although cuts and caption highlights both depend on it.",
    "The right-to-left caption check runs where the caption font resolves; on the current CI runner it doesn't, so CI skips that check rather than failing.",
    "No loudness normalisation, silence trimming or scene-change detection yet, and no usage or adoption numbers are claimed.",
  ],
  next: "hayyak",
};

export const caseStudies: CaseStudy[] = [twiscope, sanad, fendix, qatf, hayyak, muri, maxpeak];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
