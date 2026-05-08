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
    slug:     "django-caching-performance",
    title:    "Caching for Performance: Speed Up Your Django App with the Built-In Caching Framework",
    date:     "2024-01-10",
    readTime: "6 min read",
    tags:     ["Django", "Redis", "Performance", "Backend"],
    summary:
      "Django ships with a powerful caching framework that most developers underuse. Here's how to apply it correctly — from per-view caching to fine-grained object caching — with lessons from a system that cut latency 25% purely through cache strategy.",
    content: [
      {
        type: "p",
        text: "Most Django performance conversations go straight to database query optimization — adding indexes, using select_related, avoiding N+1s. That's important, but there's a layer above it that's often more impactful and faster to ship: caching. Django's built-in caching framework is mature, flexible, and works with any backend. The question is knowing when and how to apply it.",
      },
      {
        type: "p",
        text: "In Twiscope — a platform processing 5M+ social data events daily — a targeted caching strategy using Redis cut API latency by 25% without a single database schema change. Here's the framework and the approach.",
      },
      {
        type: "h2",
        text: "Django's caching backends",
      },
      {
        type: "p",
        text: "Django supports multiple cache backends out of the box. The right choice depends on your infrastructure and requirements.",
      },
      {
        type: "list",
        items: [
          "LocMemCache — in-process memory cache, fast but per-process and not shared across workers. Good for development only.",
          "FileBasedCache — stores cache on disk. Persistent across restarts but slow. Rarely the right choice for web apps.",
          "MemcachedCache — fast, distributed, purpose-built for caching. No persistence, no complex data structures.",
          "RedisCache (django-redis) — fast, distributed, persistent if needed, supports complex types. The default choice for most production Django apps.",
        ],
      },
      {
        type: "code",
        lang: "python",
        code: `# settings.py — Redis cache configuration
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:6379/1",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "SOCKET_CONNECT_TIMEOUT": 5,
            "SOCKET_TIMEOUT": 5,
            "IGNORE_EXCEPTIONS": True,  # degrade gracefully if Redis is down
        },
        "KEY_PREFIX": "myapp",
        "TIMEOUT": 300,  # 5 minutes default TTL
    }
}`,
      },
      {
        type: "h2",
        text: "Level 1: Per-view caching",
      },
      {
        type: "p",
        text: "The fastest win is caching entire view responses. If a view returns the same response for any unauthenticated user within a time window, cache the whole thing.",
      },
      {
        type: "code",
        lang: "python",
        code: `from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from django.views import View

# Function-based view
@cache_page(60 * 15)  # cache for 15 minutes
def trending_hashtags(request):
    # expensive DB aggregation
    trends = Hashtag.objects.annotate(
        count=Count("mentions")
    ).order_by("-count")[:20]
    return JsonResponse({"trends": list(trends.values())})


# Class-based view
@method_decorator(cache_page(60 * 15), name="dispatch")
class TrendingView(View):
    def get(self, request):
        ...`,
      },
      {
        type: "p",
        text: "Per-view caching works well for public, read-heavy endpoints where the response is identical for all users. It breaks down for authenticated views where the response varies per user — caching those leaks data between users.",
      },
      {
        type: "h2",
        text: "Level 2: Template fragment caching",
      },
      {
        type: "p",
        text: "When only part of a page is expensive to render, cache the fragment rather than the entire response. Django's template engine has a built-in cache tag for this.",
      },
      {
        type: "code",
        lang: "html",
        code: `{% load cache %}

{# Cache this block for 10 minutes, keyed by platform name #}
{% cache 600 platform_stats platform.name %}
  <div class="stats-panel">
    <span>{{ platform.total_mentions }}</span>
    <span>{{ platform.top_influencer }}</span>
  </div>
{% endcache %}`,
      },
      {
        type: "h2",
        text: "Level 3: Low-level cache API",
      },
      {
        type: "p",
        text: "For fine-grained control — caching the result of a single expensive function, not an entire view — use the low-level cache API directly. This is what made the biggest difference in Twiscope.",
      },
      {
        type: "code",
        lang: "python",
        code: `from django.core.cache import cache

def get_top_influencers(platform: str, limit: int = 10) -> list:
    cache_key = f"top_influencers:{platform}:{limit}"
    result = cache.get(cache_key)

    if result is not None:
        return result

    # Expensive aggregation query
    result = (
        Influencer.objects
        .filter(platform=platform, is_active=True)
        .annotate(engagement=Sum("post__engagement_score"))
        .order_by("-engagement")
        .values("id", "username", "engagement")[:limit]
    )
    result = list(result)  # evaluate the queryset

    cache.set(cache_key, result, timeout=60)  # 60 second TTL
    return result`,
      },
      {
        type: "callout",
        text: "The 25% latency reduction in Twiscope came from caching exactly this pattern — trending keywords and top influencers by platform were being queried thousands of times per hour with near-identical results. A 60-second TTL eliminated 90% of those database hits with no meaningful staleness for users.",
      },
      {
        type: "h2",
        text: "Cache invalidation: the hard part",
      },
      {
        type: "p",
        text: "There are only two hard things in computer science: cache invalidation and naming things. Django gives you tools for both patterns — TTL-based expiry and explicit invalidation.",
      },
      {
        type: "code",
        lang: "python",
        code: `from django.core.cache import cache
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=Influencer)
def invalidate_influencer_cache(sender, instance, **kwargs):
    # Clear all cached influencer lists for this platform
    pattern = f"top_influencers:{instance.platform}:*"
    cache.delete_pattern(pattern)  # requires django-redis


# Or use versioned cache keys — increment version on write
def get_cache_version(platform: str) -> int:
    return cache.get(f"version:{platform}", default=1)

def bump_cache_version(platform: str):
    cache.incr(f"version:{platform}", delta=1)`,
      },
      {
        type: "h2",
        text: "What not to cache",
      },
      {
        type: "list",
        items: [
          "User-specific data without per-user cache keys — you'll leak data between users",
          "Data that changes on every write if your write rate is high — the cache will be invalidated immediately anyway",
          "Small, fast queries — the cache lookup overhead can exceed the query time for simple primary key lookups",
          "Anything security-sensitive (tokens, passwords, permissions) — wrong TTL decisions have serious consequences",
        ],
      },
      {
        type: "h2",
        text: "Monitoring cache effectiveness",
      },
      {
        type: "p",
        text: "A cache you can't measure is a cache you can't optimize. Track hit rate, miss rate, and eviction rate. With Redis, these are available via INFO stats. A hit rate below 80% usually means your keys are too specific or your TTL is too short.",
      },
      {
        type: "code",
        lang: "bash",
        code: `# Redis cache stats
redis-cli INFO stats | grep -E "keyspace_hits|keyspace_misses"

# Hit rate = hits / (hits + misses)
# Target: > 80% for hot-path caches`,
      },
      {
        type: "p",
        text: "Django's caching framework is one of the highest-leverage performance tools available. The API is simple, the impact is immediate, and unlike database optimizations it requires no schema changes or migrations. Start with your most expensive repeated queries — the ones called on every page load or every API response — and work down from there.",
      },
    ],
  },

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
