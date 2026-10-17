# Evidence matrix

Where each public claim on asaied.dev comes from. Update this file whenever
`src/lib/career.ts`, `src/lib/projects.ts`, `src/lib/case-studies.ts`,
`src/lib/faq.ts` or a blog post makes a new factual claim.

Checked on 2026-10-17 against the default branch of each repository.
Evidence is cited at repository and module level; line-level citations are
kept privately by the owner.

**Classifications**

| Label | Meaning |
|---|---|
| Implementation | Present in code and wired end to end (model, logic, entry point) |
| Tests | Covered by tests that pass in CI |
| Production | Observable on a public production surface (site, release, store listing, CI run) |
| Documented | Stated in docs/README only; not independently verified |
| Owner | Not derivable from code; rests on the owner's statement (marked "confirmed" once the owner has explicitly confirmed it) |

Note: Twiscope, Sanad AI, MURI and Check-In have large test suites, but their CI
runs deployments and security scans only, so none of their claims is rated **Tests**.

## Career and identity

| Claim | Class | Evidence / note |
|---|---|---|
| Title "Software Team Lead \| Senior Backend Engineer" | Owner | Owner's 2026 CV drafts |
| 6+ years of professional experience (from Aug 2020) | Owner — confirmed 2026-10-17 | Owner's CV dates |
| Leads a cross-functional team of up to 13 (backend, frontend, mobile, AI, QA) | Owner — confirmed 2026-10-17 | Not derivable from code; contributors across Twiscope/MURI/Sanad repos are consistent with a multi-disciplinary team |
| ASAS IT: Senior Software Engineer Sep 2023 – Aug 2024; Team Lead Aug 2024 – present | Owner | 2026 CV drafts say Sep 2023; the 2024 PDF said Aug 2023 — confirm |
| Check-In (Hayyak): freelance, Apr 2024 – Jan 2026 | Owner — confirmed 2026-10-17 | Matches repo activity (Apr 2024 – Jan 2026) |
| ClouDev Sep 2022 – Jul 2023; Co-Source Aug 2020 – May 2022; B.Sc. HTI 2022 | Owner | CV drafts |
| Prime Consulting Office (PCO): Software Engineer, Nov 2022 – Oct 2023 | Owner — inclusion confirmed 2026-10-17 | Title and dates from the owner's 2024 CV; location and employment type not stated, so not shown |

## Twiscope (ASAS IT)

| Claim | Class | Evidence / note |
|---|---|---|
| Sole backend developer Oct 2023 – Oct 2025; ~70% of backend commits overall | Implementation | `TwiScope-backend` git history (939 of 940 non-merge commits before 2025-10-22; 69% overall) |
| Five products on one backend: Deep-In, Influencer Impact, Sadeed / Decision Hub, Alert System, Notification System | Implementation | `TwiScope-backend`: X_Apps, InfluencersApp + X_Statistics_Monitor, DecisionHub_App, Alert_System, notificationApp + notifications_service |
| Decision Hub: Beat dispatcher → Celery chord per centre; six deterministic weighted indices; tenant-scoped Elasticsearch snapshots; replay/rescore | Implementation | `DecisionHub_App` (dispatch, pipeline, scoring strategies, es_query, replay tasks). X only; forecasting `not_implemented` |
| Alert engine: per-alert Beat schedules, AND conditions, DB-level dedup, email/webhook digests with public-IP SSRF guard | Implementation | `Alert_System` (scheduling, engine, evaluation and delivery tasks, webhook_security). X only; at-least-once |
| Notifications: in-app records, FCM push, SMTP, Redis idempotency keys | Implementation | `notificationApp`, `notifications_service` — mainly teammates' code |
| Six data sources (X API v2, EnsembleData for Instagram/TikTok, Google CSE, LinkedIn, news feed) | Implementation | Platform clients and Celery tasks; news ingested every 5 min |
| Kong 3.8 DB-less gateway with RS256 JWT, rate limiting, CORS | Implementation | `Twiscope-Api-Gateway` (bundled plugins only) |
| FastAPI auth service issuing RS256 access/refresh tokens | Implementation | `TwiscopeAuthService` |
| Terraform: VPC across two AZs, Auto Scaling group + internal ALB per service, GPU instance | Implementation | `Twiscope-infrastructure-terraform` (owner-authored) |
| Deploys bake an AMI and update the launch template; jobs typically under two minutes | Production | GitHub Actions run history (19–96 s jobs) |
| Prometheus metrics for Django and Celery; Elastic APM | Implementation | `monitoring/`, django-prometheus, APM config |
| Web app and mobile app built by teammates | Implementation | Contributor history of the frontend/mobile repos |
| twiscope.net is live | Production | Fetched 2026-10-17 |
| Twiscope's internal product names may be published | Owner — confirmed 2026-10-17 | Deep-In, Sadeed / Decision Hub, Influencer Impact |

## Sanad AI (ASAS IT)

| Claim | Class | Evidence / note |
|---|---|---|
| Hybrid BM25 + kNN per index, client-side RRF (k = 60) | Implementation | `Sanad-AI-Agent` retrieval strategies — written by teammates |
| LLM chooses indices only; allow-list intersection, fallbacks; report/platform filters built in code; entitlement check before retrieval | Implementation | Router, chat service, Elasticsearch strategy, subscription validator |
| BGE-M3 (1024-d dense) on self-hosted TEI; OpenAI GPT models via OpenRouter | Implementation | Embedding client, compose, OpenRouter client |
| Three chat scopes; seven report types | Implementation | Chat endpoints and platform enum |
| Owner built: service bootstrap, first SQS ingestion pipeline, JWT verification, deploy workflows, Elastic APM, sentiment microservice; reviewed/merged team PRs | Implementation | git history and blame |
| Deploy pipeline runs and completes | Production | GitHub Actions runs (e.g. 2026-10-15) |

## Fendix (independent)

| Claim | Class | Evidence / note |
|---|---|---|
| Creator and sole maintainer | Implementation | Only member of the Fendix-app org; ~95% of commits across engine, backend, frontend, tap |
| Go listed as a skill | Implementation | The Fendix engine is a Go codebase; ~96% of its commits are the owner's |
| Confidence-gated build decisions since v2.0; legacy gate restorable exactly | Tests | Engine decision package; oracle test across 54 combinations; CI passing |
| Hosted release decisions PASS / WARN / BLOCK / INCOMPLETE | Tests | `fendix-backend` decision policy; backend test run passing |
| 85 checks across 18 categories (v3.6.3 catalog) | Production | Public security catalog and fendix.dev checks page |
| 53 releases since Apr 2026; current releases cosign-signed with SBOMs and SLSA v1.0 provenance (L2) | Production | GitHub releases; v3.6.3 binary and image signatures verified with cosign |
| Linux and macOS (amd64/arm64) only | Production | Release assets: no Windows build has shipped |
| Engine MIT; hosted platform closed source | Production | LICENSE; fendix.dev license page |
| CI-gated synthetic corpora (e.g. 56-case SAST corpus) | Tests | BENCHMARKS.md; corpus-limited, not a real-world rate |
| Managed CI / tamper-evident records in limited availability | Implementation | Feature flag off by default |

## MURI (ASAS IT)

| Claim | Class | Evidence / note |
|---|---|---|
| Seat allocation under ordered `SELECT … FOR UPDATE`; idempotent payment confirmation | Implementation | `MURI-Backend` seat allocation service, subscription tasks (teammates) |
| HyperPay: AES-256-GCM webhooks, re-fetch under row lock, three reconciliation layers, automatic refunds | Implementation | Payments app, subscription tasks (teammates) |
| Double-entry ledger for driver wallets | Implementation | Accounts app (teammates) |
| Geofenced trip start/end (100 m; 20 min early to 10 min late); QR pickup within 50 m | Implementation | Driver serializers — start/end validation is owner-authored |
| PostGIS geography (SRID 4326) for cities, district polygons, stops | Implementation | Regions and trips models — owner-authored geography models and seed data |
| Live location via REST uploads (≤ every 10 s) and 10 s polling | Implementation | Driver and student apps |
| Owner: backend skeleton, JWT/OTP auth, deploy pipeline, translation store | Implementation | git blame (about 8% of surviving backend code overall) |
| Student and driver apps published on Google Play and the App Store | Production | Store listings (published under the employer; not linked) |
| muri.sa reachable | — | Not reachable on 2026-10-17; no link published |

## Check-In / Hayyak (freelance — confirmed by owner)

| Claim | Class | Evidence / note |
|---|---|---|
| Hayyak and Check-In are the same product (renamed 2025) | Implementation | `Hayyak-Backend` history, app identifiers |
| Organisation → Hotel Group → Hotel with staff roles; per-hotel OHIP credentials and gateway | Implementation | hotelsApp, hotelAuthentication (owner-authored) |
| OPERA Cloud (OHIP) pull-before-action; check-out folio settlement | Implementation | Opera_integration, reservation tasks (owner-authored) |
| Tap and HyperPay behind one gateway layer; verified webhooks re-fetch status; tokens only | Implementation | payments app — mostly a teammate's code |
| Support chat over Django Channels | Implementation | supportChat (owner-authored) |
| Deploys with backup and automatic rollback | Production | GitHub Actions history |
| Shomoos FastAPI adapter | Implementation | shomoos-service (co-developed); automatic push from check-in only on an unmerged branch |

## Maxpeak (independent — confirmed by owner; ASAS IT has no claim)

| Claim | Class | Evidence / note |
|---|---|---|
| RS256 JWT with JWKS; Google/LinkedIn/GitHub sign-in | Implementation | `maxpeak-backend` authentication module |
| Celery pipeline: PDF/DOCX extraction → LLM parse → 0–100 score; ≥ 70 advances stage 1 | Implementation | cv_processing, cv_parsing, candidate tasks |
| 94 unit tests on CV extraction | Implementation | Tests present; no CI runs |
| Pre-launch; platform backend not publicly deployed | Production | API domain does not resolve (2026-10-17) |

## Claims removed from the site

| Former claim | Why removed |
|---|---|
| 5M+ data points/day; 25% latency reduction; 3x throughput; 99.9% uptime; 40% faster deploys; 30% AWS cost cut | No measurement found in any repository; 99.9% exists only as a requirements target |
| Real-time WebSocket alerts in < 2 s; Django Channels consumers (Twiscope); WebSocket trip tracking < 1 s (MURI) | No WebSocket code in any Twiscope or MURI repo history; alerts are scheduled, tracking is polling |
| ML trend prediction / anomaly detection on dedicated workers | Not in code; sentiment uses pretrained models in a separate service |
| Go microservices / Go gateway | No Go in any Twiscope repository |
| Fendix: ~70% fewer false positives; fails only when both engines agree; zero runtime dependencies; Windows; old Homebrew tap | Contradicted by Fendix's README, BENCHMARKS.md, release assets and gate history |
| Hayyak: Tap→HyperPay failover; Celery/DLQ OHIP sync; nightly reconciliation; tenant middleware; Nafath/Absher; 90% automation; 60% fewer conflicts | Not in code or no measurement |
| MURI: Redis quota locks; PostGIS proximity queries and the 50,000-driver benchmark; 50+ permission tests; 100K users; Go service; Nafath / MoT APIs | Not in code or contradicted |
| Maxpeak: chat, contact protection, replacement-guarantee flow, payments, ~60% workload cut, shadow-mode calibration | Not implemented (planned in the product docs) |
| Gymawy, ElevenLabs Dubbing, Deep Linkup listings | Overstated relative to the code; removed from the site |
| Rotating titles "Systems Architect", "AI Infrastructure Lead"; "Staff Backend Engineer" as a held title | Not titles held; Staff-level appears only as a career target |
