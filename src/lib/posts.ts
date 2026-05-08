export type Block =
  | { type: "p";        text: string }
  | { type: "h2";       text: string }
  | { type: "h3";       text: string }
  | { type: "code";     lang: string; code: string }
  | { type: "list";     items: string[] }
  | { type: "callout";  text: string }
  | { type: "divider" };

export type Post = {
  slug:      string;
  title:     string;
  date:      string;
  readTime:  string;
  tags:      string[];
  summary:   string;
  content:   Block[];
};

export const posts: Post[] = [
  {
    slug:     "false-positive-problem",
    title:    "Why Both Scanners Must Agree: The Insight Behind Fendix",
    date:     "2025-03-12",
    readTime: "6 min read",
    tags:     ["Security", "Go", "Open Source"],
    summary:
      "Most security scanners drown you in noise. Here's the single architectural decision that cut Fendix's false positive rate by ~70% — and why the solution was obvious in hindsight.",
    content: [
      {
        type: "p",
        text: "I've used a lot of security scanners. The experience is almost always the same: you run the tool, get back 200 findings, spend two days triaging them, and discover that maybe 15 are real. The rest are noise. And the next time a scan runs, you ignore the alerts by default because you've been trained to.",
      },
      {
        type: "p",
        text: "This is the false positive problem. It's not just annoying — it actively makes systems less secure. When every alert looks like a false alarm, engineers stop responding to alerts. The scanner becomes wallpaper.",
      },
      {
        type: "h2",
        text: "Why does this happen?",
      },
      {
        type: "p",
        text: "Security tools generally fall into two categories: DAST (Dynamic Application Security Testing) tools that probe a running application, and SAST (Static Application Security Testing) tools that analyze source code. Each has blind spots.",
      },
      {
        type: "list",
        items: [
          "DAST sees behavior but not code — it can flag an endpoint as vulnerable based on its response, but can't verify whether the code actually processes the dangerous input",
          "SAST sees code but not behavior — it can flag a dangerous-looking function call, but can't know whether it's actually reachable or exploitable at runtime",
          "Both generate findings independently, with no cross-referencing",
        ],
      },
      {
        type: "p",
        text: "The result: you get every DAST finding plus every SAST finding, with no signal about which ones actually matter.",
      },
      {
        type: "h2",
        text: "The insight: make them agree",
      },
      {
        type: "p",
        text: "The core idea behind Fendix is simple to state and surprisingly rare in practice: a finding only becomes a build-failing alert when both the DAST engine and the SAST engine independently flag the same vulnerability at the same endpoint.",
      },
      {
        type: "callout",
        text: "If DAST says an endpoint has a missing auth header, and SAST says the corresponding handler has no authentication middleware — that's a correlated finding. High confidence. Fail the build. If only one engine flags it, it's downgraded to informational and doesn't block CI.",
      },
      {
        type: "p",
        text: "This sounds obvious. The hard part is the implementation: how do you map a runtime HTTP response (what DAST sees) back to a specific code path (what SAST sees)? The two engines are looking at completely different representations of the same system.",
      },
      {
        type: "h2",
        text: "The correlation engine in Go",
      },
      {
        type: "p",
        text: "I chose Go for Fendix for three reasons: the binary size stays small, the concurrency model is clean for running both engines in parallel, and the resulting artifact can be dropped into any CI pipeline without a runtime dependency.",
      },
      {
        type: "p",
        text: "The correlation engine works by normalizing findings from both engines into a shared format — endpoint path, HTTP method, vulnerability category — and then scoring pairs by similarity. A correlated pair needs to match on all three dimensions within configurable thresholds.",
      },
      {
        type: "code",
        lang: "go",
        code: `// Simplified correlation logic
type Finding struct {
    Endpoint  string
    Method    string
    Category  VulnCategory
    Engine    Engine // DAST or SAST
    Severity  Severity
}

func correlate(dast, sast []Finding) []CorrelatedFinding {
    var results []CorrelatedFinding
    for _, d := range dast {
        for _, s := range sast {
            if d.Endpoint == s.Endpoint &&
               d.Method == s.Method &&
               d.Category == s.Category {
                results = append(results, CorrelatedFinding{
                    DAST: d, SAST: s,
                    Confidence: High,
                })
            }
        }
    }
    return results
}`,
      },
      {
        type: "h2",
        text: "The results",
      },
      {
        type: "p",
        text: "Testing Fendix against a set of intentionally vulnerable APIs, the correlation requirement reduced actionable findings by ~70% compared to running either engine alone — without missing any real vulnerabilities in the test set. Everything that was correlated was real. Everything that wasn't correlated stayed in the report but didn't block the build.",
      },
      {
        type: "p",
        text: "The other design choices — single binary, zero telemetry, signed releases via Sigstore — are downstream of the same philosophy: a security tool you don't trust is a security tool you don't use. If engineers can't verify what the tool does, they won't use it. Fendix is open source under MIT. Read the source. There's nothing to find.",
      },
      {
        type: "callout",
        text: "Fendix is available at fendix.dev. Install in 30 seconds: brew tap Abdel-RahmanSaied/fendix && brew install fendix",
      },
    ],
  },

  {
    slug:     "twiscope-architecture",
    title:    "5 Million Events a Day: Architecture Lessons from Twiscope",
    date:     "2025-01-28",
    readTime: "7 min read",
    tags:     ["Django", "Celery", "Redis", "Scale"],
    summary:
      "What we learned building a social intelligence platform that processes 5M+ data points daily — the architectural decisions that held, the ones that didn't, and what I'd do differently.",
    content: [
      {
        type: "p",
        text: "When we started building Twiscope, the first prototype worked fine at a few thousand events per day. By the time we hit production load — five platforms, multiple data types, continuous ingestion — we had rebuilt the core architecture twice. Here's what the final version looks like and why.",
      },
      {
        type: "h2",
        text: "The naive version",
      },
      {
        type: "p",
        text: "Version one was straightforward: a Django view received incoming data, processed it synchronously, and wrote to PostgreSQL. For a prototype, this was fine. For production, it had three fatal problems.",
      },
      {
        type: "list",
        items: [
          "Synchronous processing meant API response time was proportional to data volume — spikes in incoming data caused request timeouts",
          "ML inference ran in the request cycle — a 300ms model call turned every ingest endpoint into a 300ms+ wait",
          "No queue meant no backpressure — when a data source burst, the system either processed everything immediately or dropped it",
        ],
      },
      {
        type: "h2",
        text: "Separating ingestion from processing",
      },
      {
        type: "p",
        text: "The key architectural shift was decoupling ingestion from processing completely. The ingest endpoint does exactly one thing: validates the incoming payload, writes a task to the Celery queue, and returns 200. That's it. Processing happens asynchronously.",
      },
      {
        type: "code",
        lang: "python",
        code: `# Ingest endpoint — fast path only
@api_view(["POST"])
def ingest_event(request):
    serializer = EventSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    # Enqueue — never process inline
    process_event.delay(serializer.validated_data)

    return Response({"queued": True}, status=202)


# Processing happens in a Celery worker
@shared_task(bind=True, max_retries=3)
def process_event(self, event_data):
    try:
        enriched = enrich(event_data)
        store(enriched)
        if should_trigger_alert(enriched):
            dispatch_alert.delay(enriched)
    except Exception as exc:
        raise self.retry(exc=exc, countdown=2 ** self.request.retries)`,
      },
      {
        type: "h2",
        text: "Redis doing double duty",
      },
      {
        type: "p",
        text: "We use Redis for two purposes simultaneously: as the Celery broker (task queue) and as a hot-path cache for frequent queries. This was a deliberate infrastructure simplification — running a separate RabbitMQ instance for the broker added ops overhead with no meaningful benefit at our scale.",
      },
      {
        type: "p",
        text: "The 25% latency reduction we measured came almost entirely from Redis caching. The most expensive database queries — trending keywords, top influencers by platform — were being executed thousands of times per hour with identical results. Caching them with a 60-second TTL eliminated 90% of those hits.",
      },
      {
        type: "callout",
        text: "Rule of thumb: if a query result is the same for any user in any session within a time window, cache it. The hard part is deciding the right TTL — too short and the cache is ineffective, too long and users see stale data.",
      },
      {
        type: "h2",
        text: "ML inference: never in the request cycle",
      },
      {
        type: "p",
        text: "This deserves its own section because it's the most common mistake I see in systems that bolt on ML. Running model inference synchronously in an API handler feels natural — you have the data, you call the model, you return the result. But inference latency is non-deterministic. A model that averages 100ms can spike to 800ms under load. That spike becomes your API's p99 latency.",
      },
      {
        type: "p",
        text: "In Twiscope, all ML work (trend prediction, sentiment analysis, anomaly detection) runs as dedicated Celery workers. They consume from a separate queue, process at their own pace, and write results back to the database. The API layer reads pre-computed ML results — it never calls a model directly.",
      },
      {
        type: "h2",
        text: "Real-time delivery via WebSocket",
      },
      {
        type: "p",
        text: "When an alert is generated, users need to see it within seconds — not the next time they refresh. We use WebSockets for all real-time delivery. When a Celery task detects an alert-worthy event, it publishes to a Redis channel. A Django Channels consumer forwards that to connected WebSocket clients.",
      },
      {
        type: "p",
        text: "The end-to-end latency from event ingestion to alert delivery is under 2 seconds in normal operation. That number is dominated by Celery task queue time, not by network or processing time.",
      },
      {
        type: "h2",
        text: "What I'd do differently",
      },
      {
        type: "list",
        items: [
          "Start with the async queue from day one — retrofitting it onto a synchronous system is painful and introduces subtle bugs during the transition",
          "Define alert thresholds with stakeholders before building the alerting system — we changed them four times in the first month",
          "Invest in replay tooling earlier — the ability to replay historical events through updated processing logic is invaluable and we built it six months too late",
        ],
      },
    ],
  },

  {
    slug:     "when-to-use-postgis",
    title:    "PostGIS vs. Plain Coordinates: A Real-World Comparison from Building MURI",
    date:     "2024-11-15",
    readTime: "5 min read",
    tags:     ["PostgreSQL", "GIS", "Backend"],
    summary:
      "When I started building MURI's geospatial layer, I debated storing lat/lng as floats vs. using PostGIS. Here's what that decision actually looked like in practice — with real query comparisons.",
    content: [
      {
        type: "p",
        text: "When I first looked at MURI's geospatial requirements — find available drivers within 5km of a passenger, manage service regions as polygons, calculate routes — my initial instinct was to store latitude and longitude as two float columns in PostgreSQL and handle proximity math in Python. This is the path of least resistance, and for small scale, it works fine.",
      },
      {
        type: "p",
        text: "After benchmarking both approaches under realistic load, I chose PostGIS. Here's the honest comparison.",
      },
      {
        type: "h2",
        text: "The flat float approach",
      },
      {
        type: "p",
        text: "With plain lat/lng columns, a proximity query looks like this:",
      },
      {
        type: "code",
        lang: "sql",
        code: `-- Find drivers within 5km using Haversine formula
SELECT driver_id, lat, lng,
  (6371 * acos(
    cos(radians(passenger_lat)) * cos(radians(lat)) *
    cos(radians(lng) - radians(passenger_lng)) +
    sin(radians(passenger_lat)) * sin(radians(lat))
  )) AS distance_km
FROM drivers
WHERE status = 'available'
HAVING distance_km < 5
ORDER BY distance_km
LIMIT 20;`,
      },
      {
        type: "p",
        text: "This works. The math is correct. But there's a critical problem: this query cannot use a standard B-tree index on the lat/lng columns. The computation references both columns together inside a function, which means PostgreSQL scans the entire drivers table on every call. At 10,000 active drivers, that's a full table scan for every passenger request.",
      },
      {
        type: "h2",
        text: "The PostGIS approach",
      },
      {
        type: "p",
        text: "With PostGIS, the same query becomes:",
      },
      {
        type: "code",
        lang: "sql",
        code: `-- PostGIS proximity query with spatial index
SELECT driver_id,
  ST_Distance(location::geography,
    ST_Point(passenger_lng, passenger_lat)::geography) AS distance_m
FROM drivers
WHERE status = 'available'
  AND ST_DWithin(
    location::geography,
    ST_Point(passenger_lng, passenger_lat)::geography,
    5000  -- meters
  )
ORDER BY distance_m
LIMIT 20;`,
      },
      {
        type: "p",
        text: "With a GiST spatial index on the location column, ST_DWithin uses the index to eliminate the vast majority of rows before doing any distance calculation. The difference in query time is dramatic.",
      },
      {
        type: "callout",
        text: "Benchmark on 50,000 driver records: plain Haversine — 340ms average. PostGIS with GiST index — 4ms average. At scale, this isn't a micro-optimization; it's the difference between a usable system and one that falls over under load.",
      },
      {
        type: "h2",
        text: "Region polygons: the case PostGIS wins decisively",
      },
      {
        type: "p",
        text: "MURI also needs to answer: 'Is this pickup location inside a serviced region?' With flat coordinates, point-in-polygon is a complex ray casting algorithm you implement in Python. With PostGIS, it's a single function call:",
      },
      {
        type: "code",
        lang: "sql",
        code: `-- Is this location within any active service region?
SELECT r.region_id, r.name
FROM service_regions r
WHERE ST_Contains(r.boundary, ST_Point(lng, lat))
  AND r.is_active = true;`,
      },
      {
        type: "p",
        text: "The boundary column stores a POLYGON geometry. The GiST index makes this efficient regardless of how complex the polygon shapes are.",
      },
      {
        type: "h2",
        text: "When to skip PostGIS",
      },
      {
        type: "p",
        text: "PostGIS is not always the right answer. It adds a PostgreSQL extension that you need to install and maintain, and it has a learning curve. I'd skip it if:",
      },
      {
        type: "list",
        items: [
          "You only need to store a single location per record and never query by proximity (a user's home address, for example)",
          "Your dataset is small enough that a full table scan is fast — under ~1,000 rows, the index overhead isn't worth it",
          "You're on a managed database service that doesn't support PostGIS",
          "Your geo queries only need approximate answers and you can do them in application code post-fetch",
        ],
      },
      {
        type: "h2",
        text: "The verdict",
      },
      {
        type: "p",
        text: "For MURI's use case — real-time driver proximity, service region polygons, and route-aware queries — PostGIS was the right choice. The 85x query speedup under load wasn't theoretical; we measured it. If you're building any system where users ask spatial questions against dynamic data, PostGIS is worth the setup time.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}
