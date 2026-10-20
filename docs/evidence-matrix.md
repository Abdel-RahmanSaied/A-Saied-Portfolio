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

Note: the reviewed deployment workflows do not establish mandatory application-test gates for Twiscope, Sanad AI, MURI or Check-In. Twiscope’s owner confirms application testing in the broader delivery process; its workflow implementation has not been independently reviewed. Do not classify implementation claims as **Tests** solely from test-suite presence or security scans.

## Career and identity

| Claim | Class | Evidence / note |
|---|---|---|
| Title "Software Team Lead \| Senior Backend Engineer" | Owner | Owner's 2026 CV drafts |
| 6+ years of professional experience (from Aug 2020) | Owner — confirmed 2026-10-17 | Owner's CV dates |
| Built and directly manages a cross-functional team of up to 13 (backend, frontend, mobile, AI, QA); owns hiring, performance reviews, promotions, planning and delivery; works directly with the CEO | Owner — confirmed 2026-10-17 | Not derivable from code; contributors across Twiscope/MURI/Sanad repos are consistent with a multi-disciplinary team |
| ASAS IT: Senior Software Engineer Sep 2023 – Aug 2024; Team Lead Aug 2024 – present | Owner | 2026 CV drafts say Sep 2023; the 2024 PDF said Aug 2023 — confirm |
| Check-In (Hayyak): freelance, Apr 2024 – Jan 2026 | Owner — confirmed 2026-10-17 | Matches repo activity (Apr 2024 – Jan 2026) |
| ClouDev Sep 2022 – Jul 2023; Co-Source Aug 2020 – May 2022; B.Sc. HTI 2022 | Owner | CV drafts |
| Prime Consulting Office (PCO): Software Engineer, Nov 2022 – Oct 2023 | Owner — inclusion confirmed 2026-10-17 | Title and dates from the owner's 2024 CV; location and employment type not stated, so not shown |

## Twiscope (ASAS IT)

| Claim | Class | Evidence / note |
|---|---|---|
| Sole backend developer Oct 2023 – Oct 2025; ~70% of backend commits overall | Implementation | `TwiScope-backend` git history (939 of 940 non-merge commits before 2025-10-22; 69% overall) |
| Five backend product areas in the implementation scope: Deep-In, Influencer Impact, Sadeed / Decision Hub, Alert System, Notification System | Implementation | `TwiScope-backend`: X_Apps, InfluencersApp + X_Statistics_Monitor, DecisionHub_App, Alert_System, notificationApp + notifications_service. This is the case-study scope, not a count of the current public product suite. |
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
| Current public positioning: Arabic media monitoring, analysis and decision support across accounts/topics, influencer intelligence, AI-assisted reports, channel monitoring, campaign tools, audience-opinion research and social-account management | Public | `twiscope.net`, `/our-products/` and `/about-us/`, fetched 2026-10-18. The public suite lists seven offerings and marks some as coming soon; use the live site for current names and availability. |
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

### Sentiment and processing performance — clarified 2026-10-20

| Claim | Class | Evidence / boundary |
|---|---|---|
| Model-grouped batched sentiment inference and threadpool execution | Implementation | `Sanad-AI-Agent` at `a69493850e2e3b926f421ab700acea4c38713bfc`: `SentimentAnalysis/services/core/sentiment_service.py::batch_analyze_sentiment`, business analysis service, and `unified_sentiment_api.py`. Owner confirms leading this work. Separate sentiment service, not the RAG chat path. |
| About 3× development throughput; 142 → 441 texts/s at N=100; roughly 460 texts/s for larger batches | Documented benchmark | `BENCHMARKS.md`, Perf-3, captured 2026-04-27 on darwin/MPS, fp16, torch 2.10.0. N=200/500 have no matching baseline sweep. N=1 is slower on the batched path. Recorded parity check: identical labels for 24 texts, confidence tolerance 1e-3. Harness and implementation inspected, benchmark not independently rerun. Not production throughput or a general accuracy claim. |
| Comparable ~100K-post collection-and-analysis workflow: >5 hours → ~3 minutes on unchanged server resources | Owner — confirmed 2026-10-20 | User reports internal production logs and comparable post/classification/influencer counts. Includes caching and broader workflow optimizations; cache state and hit rate unspecified. Logs not inspected independently. Do not attribute this reduction solely to inference batching or extrapolate platform-wide throughput. |

### Twiscope delivery — clarified 2026-10-20

- **Implementation:** `TwiScope-backend` at `3824e98bcfe54aa77b92d4f5e9bbf6853df07bae`: `.github/workflows/Production-runner.yml` calls `security.yml` with `gate-only: true`; deployment has `needs: security` and checks out `github.sha`. Deployment uses a self-hosted runner; the security job uses GitHub-hosted infrastructure. SAST/SCA checks enforce configured policy/baseline and required analyzer coverage, not an absence-of-all-findings guarantee.
- **Implementation:** `fendix-dast.yml` provides additional pre-production security validation. Do not describe it as a mandatory production dependency.
- **Owner — confirmed:** designed and operated these workflows, with additional application testing in the delivery process. Application-test workflow locations and mandatory gate status remain unverified; do not claim that unit/integration/API/E2E tests all automatically block production.
- These workflow findings do not make the performance benchmarks CI-tested, and do not establish the same gate wiring for Sanad’s separate repository.

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

## Qatf (independent, open source)

Checked on 2026-10-18 against `Abdel-RahmanSaied/Qatf` (default branch, last push 2026-10-17).

| Claim | Class | Evidence / note |
|---|---|---|
| Creator and maintainer; 117 of 119 commits | Implementation | Git history: the owner's commits, including 69 under an unconfigured "Your Name" identity with the owner's email; 2 by @Dabash99 |
| Current UI design and Arabic interface contributed by @Dabash99 | Implementation | PR #4 (`ui-redesign`), merged 2026-09-28 |
| Apache-2.0, DCO sign-off | Production | LICENSE, NOTICE, CONTRIBUTING.md |
| Five stages; the model returns MM:SS only and stage 4 snaps cuts onto word boundaries | Implementation | `qatf/pipeline/select.py` (prompt and schema), `qatf/pipeline/cuts.py` (`snap`) |
| 8 model presets (anthropic, openai, openai-legacy, kimi, glm, ollama, vllm, openrouter) | Implementation | `qatf/llm/presets.py` |
| YouTube exact-host allowlist; media-root sandbox for server paths | Implementation | `qatf/core/constants.py`; docs/security.md |
| 4 word-by-word caption styles plus a one-line fallback | Implementation | `qatf/pipeline/captions.py` |
| RTL caption order checked by rendering frames | Implementation | `tests/verify_render.py` fixture C. CI run 39038661084 (2026-10-17) **skipped** it: fontconfig on the runner could not resolve the caption font. Stated on the site as a scope note |
| CI: backend suites on Python 3.10 and 3.12, 24-thread load test, frontend tests and type check, ffmpeg render check, Docker build | Tests | `.github/workflows/ci.yml` |
| End-to-end run: 12-minute 4K ProRes Arabic video → 8 clips, via CLI on a GPU and via the API | Documented | README "Status"; owner's run, not reproduced here |
| Arabic transcription errors 23 → 3 (vocab + denoise + fix-ups) on that recording | Documented | docs/quality.md, "Transcription — 23 errors to 3" |
| Crop keeps ~3× the subject pixels of blur and rendered 1.8× faster in the recorded test | Documented | docs/quality.md, "Reframe" (synthetic 1080p source) |
| Working prototype: no API auth, jobs don't survive a restart, only OpenRouter run against its real endpoint | Documented | README "Status"; stated on the site as scope notes |

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
| Product website maxpeak.net is live and linked | Production | Fetched 2026-10-17; the owner asked for it to be linked |

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

### Recruiting review — 2026-10-20

- Sanad ownership: owner confirms leadership of architecture, retrieval, prompts and vector-search design; AI teammates implemented the retrieval components. Personal service bootstrap, ingestion, integrations, delivery and tracing remain distinct from team implementation. Owner also confirms Prometheus/Grafana/custom monitoring in the wider operating setup; repository APM traces do not enumerate all production tooling.
- MURI reread at `942a22490f97b2f8bfcb3b0d78d607c851ba4451`: docs/architecture/package-driven-round-trip.md; Trips/services/seat_allocation_service.py; Payments/views/webhook_views.py and services/update_transaction_service.py; SubscriptionsModules/subscription/tasks.py; Accounts/services/journal_entry_service.py. Ordered row locks reduce lock-order conflicts, not a proof of freedom from all deadlocks. Refund handling has a manual-reconciliation failure path and is not generally idempotent.
- MURI deployment workflow checks out the Production branch and has no security-job dependency or application-test command. Do not transfer Twiscope exact-commit gate claims to MURI. This was source inspection, not a test run or production audit. Current operating scale and personal ownership of seat/payment design remain questions for the owner.
- Current MURI driver serializers also permit start/end proximity to the first/last active passenger stop, respectively. Updated both languages to retain this fallback rather than claiming route endpoints are the only valid locations.
