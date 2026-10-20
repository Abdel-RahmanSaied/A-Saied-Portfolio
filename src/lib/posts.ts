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
  /** Set when a post is materially revised after publication. */
  updated?:  string;
  readTime:  string;
  tags:      string[];
  summary:   string;
  content:   Block[];
};

export const posts: Post[] = [
  {
    slug:     "observability-before-optimization",
    title:    "Why Observability Comes Before Optimization",
    date:     "2026-07-06",
    readTime: "8 min read",
    tags:     ["Observability", "Backend", "Reliability", "Architecture", "Leadership"],
    summary:
      "Optimizing without observability is guessing with confidence. Before adding workers, rewriting services, or changing databases, you need to know where time, errors, queue pressure, and cost actually come from.",
    content: [
      {
        type: "p",
        text: "Most performance work starts too late in the process. The API feels slow, a queue looks backed up, CPU is high, or a user complains. The immediate instinct is to optimize: add workers, cache something, rewrite a hot path, move work to Go, or scale the database. Sometimes that works. More often, it moves the bottleneck somewhere else because nobody measured the system before changing it.",
      },
      {
        type: "p",
        text: "The lesson I keep relearning in production systems is simple: observability comes before optimization. Not because dashboards are beautiful. Because without visibility, optimization is just a series of confident guesses.",
      },
      {
        type: "callout",
        text: "If you cannot explain where latency, errors, queue pressure, and cost come from, you are not ready to optimize. You are ready to instrument.",
      },
      {
        type: "h2",
        text: "The Optimization Trap",
      },
      {
        type: "p",
        text: "The dangerous part about backend optimization is that every fix sounds reasonable in isolation. Add Redis caching. Increase Celery concurrency. Add indexes. Split a service. Move CPU-heavy work to Go. Use Elasticsearch. Add read replicas. All of these can be correct, but only in response to the right bottleneck.",
      },
      {
        type: "p",
        text: "If the database is slow because of missing indexes, adding Celery workers increases database pressure. If the queue is backed up because an external API is timing out, adding more workers may trigger rate limits faster. If p95 latency is bad because of one expensive permission check, rewriting the whole endpoint is wasted effort.",
      },
      {
        type: "h2",
        text: "What Observability Must Answer",
      },
      {
        type: "p",
        text: "A production backend does not need every possible dashboard on day one. It needs enough visibility to answer the questions that decide engineering action.",
      },
      {
        type: "list",
        items: [
          "Latency: where does request time actually go — app code, database, cache, network, external API, serialization?",
          "Errors: which failures are user-facing, retryable, external, validation-related, or caused by our own code?",
          "Queue pressure: are tasks waiting because workers are saturated, tasks are slow, retries are exploding, or downstream services are failing?",
          "Throughput: how many requests, jobs, records, or events can the system process before it degrades?",
          "Cost: which workload is consuming compute, database, cache, storage, or third-party API spend?",
        ],
      },
      {
        type: "h2",
        text: "Start With Four Signals",
      },
      {
        type: "p",
        text: "For most backend systems, I want four signals before I trust any optimization plan: request latency, error rate, queue depth, and saturation. These are simple, but together they tell you whether the system is slow, broken, overloaded, or waiting on something else.",
      },
      {
        type: "code",
        lang: "text",
        code: `Minimum useful production view

HTTP:
  - request count by endpoint
  - p50 / p95 / p99 latency by endpoint
  - 4xx / 5xx error rate

Database:
  - slow queries
  - connection pool usage
  - lock wait time

Queue:
  - queue depth
  - task runtime
  - retry count
  - failure reason

Infrastructure:
  - CPU / memory
  - container restarts
  - external API latency`,
      },
      {
        type: "h2",
        text: "Example: Celery Queue Pressure",
      },
      {
        type: "p",
        text: "Imagine a Celery queue starts falling behind during ingestion spikes. The naive fix is to increase worker concurrency. That might be correct, but only if workers are actually CPU-bound or waiting for available slots. If tasks are slow because every job performs three database writes and an external API call, more workers can make the system worse.",
      },
      {
        type: "p",
        text: "The useful question is not 'how do we make Celery faster?' The useful question is 'where does task time go?' That changes the debugging path completely.",
      },
      {
        type: "code",
        lang: "python",
        code: `# Useful task instrumentation pattern
import time
import logging

logger = logging.getLogger(__name__)

def timed_step(name, fn):
    start = time.perf_counter()
    try:
        return fn()
    finally:
        duration_ms = round((time.perf_counter() - start) * 1000, 2)
        logger.info("task_step_completed", extra={
            "step": name,
            "duration_ms": duration_ms,
        })

def process_event(event):
    validated = timed_step("validate", lambda: validate_event(event))
    enriched = timed_step("enrich", lambda: enrich_event(validated))
    saved = timed_step("store", lambda: store_event(enriched))
    timed_step("notify", lambda: maybe_notify(saved))`,
      },
      {
        type: "p",
        text: "Once you have that data, the optimization may be very different from the first guess. Maybe validation is cheap, enrichment is slow, storage is fine, and notifications are timing out. In that case, the fix is not more workers. It might be a timeout, a circuit breaker, a separate queue, or moving notification work behind a lower-priority pipeline.",
      },
      {
        type: "h2",
        text: "Observability Makes Trade-Offs Honest",
      },
      {
        type: "p",
        text: "Staff-level engineering is often less about knowing a clever solution and more about making trade-offs explicit. Do we add Redis caching or fix the query? Do we add workers or reduce task runtime? Do we split a service or keep the monolith? Do we move a hot path to Go or improve the Python code?",
      },
      {
        type: "p",
        text: "Without measurement, these debates become taste. With measurement, they become decisions.",
      },
      {
        type: "list",
        items: [
          "If p95 latency is dominated by one database query, fix the query before adding infrastructure.",
          "If p99 latency comes from external APIs, add timeouts, retries, fallbacks, and user-visible states.",
          "If queue depth grows but worker CPU is low, investigate downstream waiting and retry storms.",
          "If CPU is saturated and the algorithm is hot, then language/runtime changes may be justified.",
        ],
      },
      {
        type: "h2",
        text: "The Order I Prefer",
      },
      {
        type: "p",
        text: "When a system is under pressure, this is the order I usually want the team to follow.",
      },
      {
        type: "list",
        items: [
          "Instrument the path: request, database, cache, queue, external dependency.",
          "Identify the bottleneck with evidence, not intuition.",
          "Apply the smallest fix that addresses the bottleneck.",
          "Measure again after the change.",
          "Only then consider larger architecture changes.",
        ],
      },
      {
        type: "callout",
        text: "Optimization is not finished when the code changes. It is finished when the measurements improve and the team understands why.",
      },
      {
        type: "h2",
        text: "Observability Is Also a Leadership Tool",
      },
      {
        type: "p",
        text: "Good observability changes team behavior. It reduces blame during incidents because the team can look at evidence. It helps product teams understand trade-offs because engineers can explain the cost of a feature. It helps junior engineers learn production thinking because they can see how code behaves outside their laptop.",
      },
      {
        type: "p",
        text: "This is why I think observability belongs in architecture discussions, not only DevOps tasks. Logs, metrics, traces, dashboards, alerts, and runbooks are part of the product's operating model. If the team cannot operate the system, the architecture is incomplete.",
      },
      {
        type: "h2",
        text: "What I Would Add Early",
      },
      {
        type: "p",
        text: "For a Django, FastAPI, or Go backend, I would add these early even before the system has serious scale.",
      },
      {
        type: "list",
        items: [
          "Structured logs with request IDs and task IDs.",
          "Endpoint-level latency and error metrics.",
          "Slow query visibility and database connection pool metrics.",
          "Celery queue depth, task runtime, retries, and failure reasons.",
          "External API latency, timeout count, and retry count.",
          "A small incident note template: impact, root cause, fix, preventive measure.",
        ],
      },
      {
        type: "h2",
        text: "The Real Goal",
      },
      {
        type: "p",
        text: "The goal is not to collect graphs. The goal is to make the system explain itself. When something slows down, fails, or becomes expensive, the team should know where to look and what question to ask next.",
      },
      {
        type: "p",
        text: "That is why observability comes before optimization. It turns performance work from guesswork into engineering. It turns incidents from panic into learning. And it gives technical leaders the evidence they need to improve systems without adding unnecessary complexity.",
      },
    ],
  },
  {
    slug:     "scaling-sentiment-api",
    title:    "Hardening a Hugging Face Sentiment Service in FastAPI",
    date:     "2026-10-17",
    readTime: "8 min read",
    tags:     ["Python", "FastAPI", "NLP", "Machine Learning", "Backend"],
    summary:
      "What changed when an Arabic-dialect sentiment service moved from prototype to production: model loading in the FastAPI lifespan, pinned model revisions, a persistent model cache, half precision only on GPUs, and the scaling options we deliberately left for later.",
    content: [
      {
        type: "callout",
        text: "Rewritten in October 2026. The earlier version presented memory, latency and speed-up figures as measurements and said one of the models was unused. The figures were estimates, and that model serves a real share of requests, so we kept it. This version describes the changes that shipped.",
      },
      {
        type: "p",
        text: "The service classifies the sentiment of social posts for Twiscope's reports: Arabic, including Gulf and Egyptian dialects, and English. It serves three pretrained Hugging Face models behind FastAPI — a CAMeL-Lab dialect model for Arabic, a Twitter RoBERTa model for English, and a multilingual model for mixed or other-language text. No models are trained here; the work is in serving them reliably.",
      },
      {
        type: "h2",
        text: "1. Load models in the lifespan, not at import",
      },
      {
        type: "p",
        text: "The prototype loaded models when the module was imported, so a download failure happened before the application's startup lifecycle was clear. Moving loading into FastAPI's lifespan makes startup responsible for the work: either loading completes and the service begins accepting requests, or startup fails and the orchestrator handles it as a startup failure.",
      },
      {
        type: "code",
        lang: "python",
        code: `from contextlib import asynccontextmanager
from fastapi import FastAPI, Response

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.ready = False
    app.state.models = load_models(settings)   # pinned revisions, see below
    app.state.ready = True
    yield
    app.state.models = None                    # release memory on shutdown

app = FastAPI(lifespan=lifespan)

@app.get("/ready")
def ready(response: Response):
    if not app.state.ready:
        response.status_code = 503
    return {"ready": app.state.ready}`,
      },
      {
        type: "p",
        text: "An exception inside the lifespan stops the application from starting, which is the intended behaviour: fail fast and let the orchestrator restart it. The readiness endpoint describes application state after startup; it is not called while the models load, because FastAPI does not accept requests before the lifespan reaches yield.",
      },
      {
        type: "h2",
        text: "2. Pin model revisions",
      },
      {
        type: "p",
        text: "A model id on the Hugging Face Hub points at whatever was pushed last. For an analytics product, the same text should get the same label next month, so every model is loaded at a pinned revision kept in configuration.",
      },
      {
        type: "code",
        lang: "python",
        code: `model = AutoModelForSequenceClassification.from_pretrained(
    cfg.model_id,
    revision=cfg.revision,   # commit SHA or tag, reviewed like any dependency bump
)`,
      },
      {
        type: "h2",
        text: "3. Keep downloaded models on a volume",
      },
      {
        type: "p",
        text: "Without a persistent cache, every container restart downloaded the models again. A named volume mounted as the Hugging Face cache makes restarts and redeploys reuse what's already there.",
      },
      {
        type: "code",
        lang: "yaml",
        code: `services:
  sentiment-api:
    environment:
      HF_HOME: /models-cache
    volumes:
      - hf-cache:/models-cache
volumes:
  hf-cache:`,
      },
      {
        type: "h2",
        text: "4. Half precision only where it helps",
      },
      {
        type: "p",
        text: "float16 roughly halves weight memory and speeds up inference on GPUs. On CPUs it often doesn't help and can be slower, so the service chooses the dtype from the device: half precision on CUDA or Apple MPS, float32 on CPU. CPU hosts behave exactly as they did before the change.",
      },
      {
        type: "code",
        lang: "python",
        code: `def model_dtype(device: str) -> torch.dtype:
    return torch.float16 if device in ("cuda", "mps") else torch.float32`,
      },
      {
        type: "h2",
        text: "5. Batch on the way in",
      },
      {
        type: "p",
        text: "Callers send texts in batches (the Twiscope backend sends up to 100 at a time) and the service runs batched inference, which amortises tokenisation and model overhead far better than one request per post.",
      },
      {
        type: "h2",
        text: "The model we didn't delete",
      },
      {
        type: "p",
        text: "The tempting memory optimisation was to drop the multilingual model and keep only the Arabic and English ones. The logs said otherwise: mixed-language and other-language posts — the team estimated 20–30% of calls — depend on it. Measure who uses a component before you remove it.",
      },
      {
        type: "h2",
        text: "What we deliberately left for later",
      },
      {
        type: "list",
        items: [
          "More worker processes. Each uvicorn worker loads its own copy of every model, so workers multiply memory. PyTorch already uses several threads per process for inference, so add processes only after measuring that a single process is the bottleneck.",
          "ONNX Runtime and INT8 quantization. Both can cut latency and memory substantially, but each needs an accuracy check on Arabic dialect data before it's worth the migration.",
          "Rewriting the service in another language. The bottleneck is the model, not Python request handling.",
        ],
      },
      {
        type: "p",
        text: "None of these changes is clever. Together they turned a service that worked on a laptop into one that starts predictably, behaves the same after every deploy, and makes its trade-offs explicit.",
      },
    ],
  },
  {
    slug:     "django-caching-performance",
    title:    "Caching for Performance: Speed Up Your Django App with the Built-In Caching Framework",
    date:     "2024-01-10",
    updated:  "2026-10-17",
    readTime: "6 min read",
    tags:     ["Django", "Redis", "Performance", "Backend"],
    summary:
      "Django ships with a powerful caching framework that most developers underuse. Here's how to apply it correctly — from per-view caching to fine-grained object caching — and how to keep a cache honest with invalidation and hit-rate monitoring.",
    content: [
      {
        type: "p",
        text: "Most Django performance conversations go straight to database query optimization — adding indexes, using select_related, avoiding N+1s. That's important, but there's a layer above it that's often more impactful and faster to ship: caching. Django's built-in caching framework is mature, flexible, and works with any backend. The question is knowing when and how to apply it.",
      },
      {
        type: "p",
        text: "On Twiscope's influencer dashboards, for example, the fix for a slow aggregate endpoint was a combination of composite indexes and a per-user Redis response cache with short TTLs — no schema redesign. Here's the framework and the approach.",
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
          "PyMemcacheCache / PyLibMCCache — fast, distributed, purpose-built for caching. No persistence, no complex data structures. (The old MemcachedCache backend was removed in Django 4.1.)",
          "RedisCache — built into Django since 4.0 (django.core.cache.backends.redis.RedisCache); the third-party django-redis package adds extras such as delete_pattern. The usual choice for production Django apps.",
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
        text: "For fine-grained control — caching the result of a single expensive function, not an entire view — use the low-level cache API directly. In my experience this is usually where the biggest wins are.",
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
        text: "Pick the TTL from how stale the data is allowed to be, not from a default. On Twiscope's dashboards, aggregates that change only when new reports land are cached per user for 5–15 minutes; anything users expect to see change immediately is either not cached or invalidated on write.",
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
from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=Influencer)
def invalidate_influencer_cache(sender, instance, **kwargs):
    # Clear all cached influencer lists for this platform
    pattern = f"top_influencers:{instance.platform}:*"
    transaction.on_commit(
        lambda: cache.delete_pattern(pattern)  # requires django-redis
    )


# Or use versioned cache keys — increment version on write
def get_cache_version(platform: str) -> int:
    key = f"version:{platform}"
    cache.add(key, 1, timeout=None)
    return cache.get(key)

def bump_cache_version(platform: str):
    key = f"version:{platform}"

    def increment():
        cache.add(key, 1, timeout=None)
        cache.incr(key, delta=1)

    transaction.on_commit(increment)

def versioned_cache_key(platform: str, limit: int) -> str:
    version = get_cache_version(platform)
    return f"top_influencers:{platform}:v{version}:{limit}"`,
      },
      {
        type: "p",
        text: "Cache invalidation tied to a database write should run after the transaction commits. Otherwise another request can read the old rows and repopulate the cache before commit. With versioned keys, initialize the counter before the first increment, keep it out of expiry, and actually include it in the cache key.",
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
    slug:     "backend-depths-techniques",
    title:    "A Journey into Backend Depths: 8 Techniques You Must Know",
    date:     "2024-10-18",
    readTime: "8 min read",
    tags:     ["Backend", "Distributed Systems", "Architecture", "Security"],
    summary:
      "Backend development is much bigger than just writing APIs. Here are 8 areas every backend engineer must understand to reach real professionalism — from distributed systems and consistency models to serverless and disaster recovery.",
    content: [
      {
        type: "p",
        text: "Backend is always considered the backbone of any application. If you work as a backend developer and want to reach professionalism, you must know that the matter is much bigger than just APIs. After years of building production systems across hospitality, transportation, social intelligence, and security — here are the 8 areas that separate a solid backend engineer from a great one.",
      },
      {
        type: "h2",
        text: "1. Distributed Systems",
      },
      {
        type: "p",
        text: "Once your system spans more than one machine, you're dealing with distributed systems and the rules change. During a network partition specifically, CAP says the system cannot guarantee both strong consistency and availability for every request. Because network failures happen, you need to decide which guarantee the system preserves during the partition and what users see as a result.",
      },
      {
        type: "list",
        items: [
          "Sharding: splitting data across multiple nodes to distribute read/write load — each node owns a subset of the data",
          "Replication: copying data across nodes for redundancy and read scaling — primary-replica being the most common pattern",
          "CAP theorem: understand which guarantees your system needs before choosing your database",
        ],
      },
      {
        type: "h2",
        text: "2. Consistency vs. Performance",
      },
      {
        type: "p",
        text: "Strong consistency — every read sees the latest write — is expensive. For many use cases, eventual consistency is acceptable: all nodes will converge to the same state, but reads may temporarily see stale data. The engineering challenge is knowing which data requires strong consistency (financial transactions, inventory counts) and which can tolerate eventual consistency (user feed, analytics aggregates).",
      },
      {
        type: "callout",
        text: "Technologies worth understanding: CRDTs (data structures that merge conflict-free across nodes), Kafka and RabbitMQ for async event propagation, and read replicas for offloading analytical queries from primary databases.",
      },
      {
        type: "h2",
        text: "3. Caching",
      },
      {
        type: "p",
        text: "Caching is one of the highest-leverage performance tools available. Redis and Memcached are the standard choices for distributed caching. The technical challenge isn't setting up the cache — it's invalidation: knowing when to expire or evict data to avoid serving stale results.",
      },
      {
        type: "list",
        items: [
          "TTL-based expiry: simplest approach, works well for data that becomes stale on a predictable schedule",
          "Event-driven invalidation: invalidate cache entries when the underlying data changes via signals or message queues",
          "Versioned cache keys: increment a version counter on write, build the version into the cache key — old entries expire naturally",
        ],
      },
      {
        type: "h2",
        text: "4. Security",
      },
      {
        type: "p",
        text: "Security is not a feature you add at the end — it's a property you design in from the start. Three areas are non-negotiable for any production backend:",
      },
      {
        type: "list",
        items: [
          "OAuth2 and JWT: understand the difference between authentication (who are you?) and authorization (what can you do?), and when to use JWT vs. server-side sessions",
          "Encryption in transit: TLS everywhere, no exceptions — including internal service-to-service communication",
          "Password hashing: bcrypt or Argon2, never SHA-256 or MD5 — the work factor must make brute force computationally expensive",
        ],
      },
      {
        type: "h2",
        text: "5. Microservices",
      },
      {
        type: "p",
        text: "Microservices trade deployment simplicity for operational flexibility. Before adopting them, understand the cost: network calls replace function calls, distributed tracing becomes necessary, and you now have a fleet of services to deploy and monitor. When they're the right choice, containers and Kubernetes handle deployment and scaling, while gRPC provides efficient, typed service-to-service communication.",
      },
      {
        type: "callout",
        text: "Don't start with microservices. Start with a well-structured monolith. Extract services only when you have a clear scaling or team-ownership reason to do so — not because microservices feel more professional.",
      },
      {
        type: "h2",
        text: "6. Monitoring & Observability",
      },
      {
        type: "p",
        text: "A system you can't observe is a system you can't debug in production. The three pillars of observability are metrics, logs, and traces.",
      },
      {
        type: "list",
        items: [
          "Metrics (Prometheus + Grafana): numeric measurements over time — request rate, error rate, latency percentiles, queue depth",
          "Logs: structured logs (JSON) searchable by field, not grep-based text search",
          "Distributed tracing (Jaeger, OpenTelemetry): follow a single request across multiple services — essential for debugging latency in microservice architectures",
        ],
      },
      {
        type: "h2",
        text: "7. Disaster Recovery",
      },
      {
        type: "p",
        text: "Backups you've never tested are not backups — they're hopes. A real disaster recovery plan has two numbers: RPO (Recovery Point Objective, how much data you can afford to lose) and RTO (Recovery Time Objective, how long recovery can take). Both must be tested regularly against real restore procedures, not assumed based on backup completion logs.",
      },
      {
        type: "h2",
        text: "8. Serverless",
      },
      {
        type: "p",
        text: "Serverless (AWS Lambda, Google Cloud Functions, Azure Functions) removes infrastructure management but introduces its own constraints: cold starts, execution time limits, and statelessness. It's an excellent fit for event-driven, bursty workloads and poor fit for long-running processes or latency-sensitive hot paths. Understanding these trade-offs is what separates engineers who deploy serverless successfully from those who fight it.",
      },
      {
        type: "p",
        text: "None of these areas is a one-week course. Each is a career-long discipline. But the engineers who understand all eight — not just the ones they've personally needed so far — are the ones who can look at an architecture and see the risks before they become incidents.",
      },
    ],
  },

  {
    slug:     "serverless-architecture-limits",
    title:    "Serverless Architecture & Limits: The Real Behind-the-Scenes",
    date:     "2024-11-05",
    updated:  "2026-10-17",
    readTime: "5 min read",
    tags:     ["Serverless", "AWS Lambda", "Cloud", "Architecture"],
    summary:
      "Serverless offers real flexibility and automatic scaling — but it comes with constraints most tutorials skip. Here's what cold starts, execution limits, and statelessness actually mean in practice, and how to work around them.",
    content: [
      {
        type: "p",
        text: "Serverless is often pitched as fewer servers to manage, automatic scaling, and pay-per-use. That is true for many workloads, but quotas and operational limits still apply. The useful question is whether those limits fit the workload.",
      },
      {
        type: "h2",
        text: "What serverless actually means",
      },
      {
        type: "p",
        text: "Serverless doesn't mean no servers — it means you don't manage them. Your function runs in a container that your cloud provider spins up on demand, executes, and tears down. AWS Lambda, Azure Functions, and Google Cloud Functions all follow this model. You write the function; the provider handles provisioning, scaling, and maintenance.",
      },
      {
        type: "p",
        text: "The pricing model is a genuine advantage: you pay per invocation and per millisecond of execution time, not for idle capacity. For bursty, event-driven workloads, this is dramatically cheaper than keeping servers warm 24/7.",
      },
      {
        type: "h2",
        text: "Challenge 1: Cold starts",
      },
      {
        type: "p",
        text: "When a function hasn't been invoked recently, the provider needs to spin up a new container before executing it. This initialization latency — the cold start — can range from 100ms to several seconds depending on the runtime and function size.",
      },
      {
        type: "list",
        items: [
          "Python and Node.js have faster cold starts than Java or .NET due to lighter runtime initialization",
          "Large deployment packages (heavy dependencies) make cold starts worse — keep your function packages lean",
          "VPC-attached Lambda functions used to add seconds of network-interface setup; since AWS moved to shared Hyperplane interfaces in 2019, that penalty is largely gone",
        ],
      },
      {
        type: "code",
        lang: "python",
        code: `# Expensive setup inside the handler runs on every invocation
def handler(event, context):
    client = boto3.client("s3")        # new client each call
    model = load_model("model.bin")    # reloaded each call
    return predict(model, event)


# Module-level setup runs once per execution environment and is
# reused by every warm invocation that follows
import boto3
from inference import load_model, predict

client = boto3.client("s3")
model = load_model("model.bin")

def handler(event, context):
    return predict(model, event)`,
      },
      {
        type: "callout",
        text: "For latency-sensitive endpoints, Provisioned Concurrency on AWS Lambda keeps capacity initialized and ready, reducing cold starts for requests within the provisioned capacity. Spillover can still use standard capacity and see cold starts, while you pay for provisioned capacity even when it is idle. Use it selectively on hot paths.",
      },
      {
        type: "h2",
        text: "Challenge 2: Execution time limits",
      },
      {
        type: "p",
        text: "AWS Lambda has a maximum execution time of 15 minutes. Azure Functions on the Consumption plan default to 5 minutes and stop at 10; Premium and Dedicated plans default to 30 minutes and can run longer. This hard limit means serverless is simply not the right tool for long-running processes — batch jobs, large file processing, ML training.",
      },
      {
        type: "p",
        text: "The solution is decomposition: break large tasks into smaller units that each complete within the limit, then chain them with event triggers or step functions.",
      },
      {
        type: "code",
        lang: "python",
        code: `# Instead of one large Lambda that times out:
def process_large_file(event, context):
    records = load_all_records()  # might be 100k records — times out
    for record in records:
        process(record)


# Use chunked processing with SQS:
def chunk_and_enqueue(event, context):
    record_ids = get_all_record_ids()
    # Split into batches of 100, enqueue each batch
    for batch in chunks(record_ids, size=100):
        sqs.send_message(
            QueueUrl=QUEUE_URL,
            MessageBody=json.dumps({"ids": batch})
        )

def process_batch(event, context):
    # Each invocation handles one batch — well within time limit
    for record in event["Records"]:
        batch = json.loads(record["body"])
        for id in batch["ids"]:
            process_record(id)`,
      },
      {
        type: "h2",
        text: "Challenge 3: Statelessness",
      },
      {
        type: "p",
        text: "Serverless functions are stateless by design. Each invocation may run on a different container instance. Any state stored in memory between invocations is unreliable — it may or may not be there on the next call.",
      },
      {
        type: "p",
        text: "Statelessness makes horizontal scaling easier, but scaling still stops at each provider's quotas and limits. Any state that must survive between invocations belongs in external storage, not function memory.",
      },
      {
        type: "list",
        items: [
          "DynamoDB or RDS for persistent data — low-latency lookups, reliable across invocations",
          "S3 for temporary file storage — pass file references (keys) between functions, not file contents",
          "ElastiCache (Redis) for shared session state or temporary coordination between function instances",
        ],
      },
      {
        type: "h2",
        text: "When serverless is the right choice",
      },
      {
        type: "list",
        items: [
          "Event-driven processing: S3 uploads, SQS messages, webhook receivers — functions trigger on events and terminate",
          "Bursty, unpredictable traffic: serverless scales to zero during quiet periods and to thousands of instances during spikes",
          "Scheduled tasks: cron-style triggers for lightweight periodic jobs",
          "API backends with variable load: cost-effective when traffic patterns are uneven",
        ],
      },
      {
        type: "h2",
        text: "When serverless is the wrong choice",
      },
      {
        type: "list",
        items: [
          "Latency-critical hot paths where cold starts are unacceptable and provisioned concurrency cost exceeds a kept-warm server",
          "Long-running processes that exceed execution limits and resist chunking",
          "Stateful protocols like WebSockets (use API Gateway WebSocket APIs carefully — there are limitations)",
          "High-volume, consistent traffic where always-on compute is cheaper than per-invocation billing",
        ],
      },
      {
        type: "p",
        text: "Serverless is a powerful tool with a specific fit. Use it where its constraints align with your workload characteristics, and don't force it where they don't. The engineers who get the most out of serverless are the ones who understand its limits as clearly as its benefits.",
      },
    ],
  },

  {
    slug:     "false-positive-problem",
    title:    "Evidence, Not Severity: How Fendix Decides What Blocks a Build",
    date:     "2026-10-17",
    readTime: "7 min read",
    tags:     ["Security", "Go", "CI/CD", "Open Source"],
    summary:
      "Severity-only security gates fail builds on unproven findings, and a scanner that silently didn't run looks like a clean pass. Here's how Fendix scores evidence, tracks coverage, and decides what blocks — and what I got wrong in the first version.",
    content: [
      {
        type: "callout",
        text: "Rewritten in October 2026. An earlier version of this post described a stricter correlation gate and quoted a false-positive reduction. Neither was accurate: the first release gated on severity alone, and the effect of correlation on false positives has never been measured. This version describes how the gate actually works.",
      },
      {
        type: "p",
        text: "Most CI security gates make one decision: is any finding at or above a severity threshold? If yes, the build fails. That rule is easy to explain and easy to defeat. Unproven findings block releases, teams learn to override the gate, and the gate stops meaning anything.",
      },
      {
        type: "p",
        text: "There is a quieter failure too. If a scanner didn't run — the tool wasn't installed, the target was unreachable, the configuration was wrong — it produces no findings, and no findings looks exactly like a clean pass.",
      },
      {
        type: "h2",
        text: "Severity answers the wrong question",
      },
      {
        type: "list",
        items: [
          "Severity says how bad a finding would be if it is real. It says nothing about how likely it is to be real.",
          "DAST sees behaviour but not code: it can show an endpoint responding badly without knowing which handler produced it.",
          "SAST sees code but not behaviour: it can flag a dangerous pattern without knowing whether that path is reachable or already guarded.",
        ],
      },
      {
        type: "p",
        text: "So Fendix keeps severity — it still describes impact — but decides whether a finding blocks from the evidence behind it.",
      },
      {
        type: "h2",
        text: "Correlation is a signal, not the gate",
      },
      {
        type: "p",
        text: "When a static finding and a runtime finding describe the same issue at the same place, Fendix merges them into one correlated finding. Matching is a fixed cascade, not a weighted score: the categories must be related, and then the locations must match by route pattern, normalised endpoint, path suffix, or a shared path segment, in that order.",
      },
      {
        type: "code",
        lang: "go",
        code: `// Simplified from the correlator: is this static (whitebox) finding
// the same issue as this runtime (blackbox) finding?
func sameIssue(w, b Finding) bool {
    if !relatedCategories(w.Category, b.Category) {
        return false
    }
    switch {
    case w.Route != "" && routeMatches(w.Route, b.Method, b.URL):
        return true // route pattern confirmed against the live request
    case normalize(w.Endpoint) == normalize(b.Endpoint):
        return true
    case suffixMatches(w.Endpoint, b.Endpoint):
        return true
    default:
        return sharesSegment(w.Endpoint, b.Endpoint)
    }
}`,
      },
      {
        type: "p",
        text: "Agreement between engines is strong evidence, but it is one of seven independent signals. A confirmed route, a reachable taint path, a validated payload, or an independent tool reporting the same CWE at the same location also count. And some evidence is self-evident on its own: a live response that shows the problem, or a real credential committed in production code, can block without a second engine. Correlation never removes a finding; everything stays in the report.",
      },
      {
        type: "h2",
        text: "A score you can audit",
      },
      {
        type: "p",
        text: "Every finding gets a deterministic 0–100 confidence score. It starts from a base and each rule that fires adds or subtracts a fixed amount, with a plain-language reason. Tests enforce that the reasons add up to the score, so nobody has to trust a black box.",
      },
      {
        type: "code",
        lang: "text",
        code: `confidence_score: 90 (HIGH)
  base                          35
  + static evidence             10
  + runtime evidence            10
  + cross-engine agreement      25
  + route confirmed             10

bands: HIGH >= 70, MEDIUM >= 40, LOW < 40`,
      },
      {
        type: "h2",
        text: "What actually blocks",
      },
      {
        type: "list",
        items: [
          "Below the --fail-on threshold: WARN (medium and above) or INFO. Never a block.",
          "At or above the threshold with LOW confidence: WARN.",
          "At or above the threshold with MEDIUM confidence and no independent signal: WARN.",
          "Otherwise: BLOCK — with a few de-escalations, such as test fixtures without independent evidence, or a vulnerable dependency that is never imported.",
        ],
      },
      {
        type: "p",
        text: "This confidence gate shipped in v2.0 as a breaking change: some builds that used to fail now pass. So --enforce-confidence=false restores the old severity-only behaviour exactly, and a test across 54 severity and threshold combinations keeps that escape hatch honest. Decisions made that way are flagged as policy overrides in the report.",
      },
      {
        type: "h2",
        text: "A scanner that didn't run isn't a pass",
      },
      {
        type: "p",
        text: "Each analyzer records whether it ran, was skipped, or failed, with a reason code. On the CLI, opt-in flags turn missing analyzers or coverage gaps into a failing exit code. In the hosted workspace, required coverage depends on the scan mode, and missing required evidence produces an INCOMPLETE release decision instead of PASS.",
      },
      {
        type: "h2",
        text: "What I'd tell myself at version one",
      },
      {
        type: "list",
        items: [
          "Write the gate's semantics as tests before writing the README. The first README described a rule the code didn't implement.",
          "Publish benchmarks with their limits. A curated corpus measures rules on cases you wrote, not a real-world detection rate.",
          "Treat a stricter or looser gate as a breaking change, and ship an exact escape hatch with it.",
        ],
      },
      {
        type: "callout",
        text: "Fendix's engine is open source (MIT) at github.com/Fendix-app/Fendix; the hosted workspace is at fendix.dev. Full case study at /case-studies/fendix",
      },
    ],
  },

  {
    slug:     "twiscope-architecture",
    title:    "Architecture Lessons from Building Twiscope's Backend",
    date:     "2026-10-17",
    readTime: "8 min read",
    tags:     ["Django", "Celery", "Elasticsearch", "Architecture"],
    summary:
      "Two years as the only backend developer on a multi-product media-intelligence platform, taking on team leadership as the work grew. What held up: async work from the first endpoint, one collection strategy for several product areas, chords for comparable scores, and deduplication in the database.",
    content: [
      {
        type: "callout",
        text: "Rewritten in October 2026. An earlier version of this post quoted event volumes, a latency reduction and real-time alert timings that the code and the measurements I can share don't support. This version sticks to what the system actually does.",
      },
      {
        type: "p",
        text: "Twiscope is an Arabic/English media-monitoring, analysis and decision-support platform. I joined as its only backend developer in October 2023 and took on team leadership in August 2024 while remaining the sole backend developer until October 2025. At the point covered by this article, the shared Django/DRF and Celery backend supported five product areas: on-demand reports (Deep-In), influencer monitoring, decision dashboards that score brands against competitors (Sadeed / Decision Hub), an alert engine, and notifications. The public product suite has continued to evolve since then.",
      },
      {
        type: "p",
        text: "These are the decisions that held up, and the ones I'd make earlier next time.",
      },
      {
        type: "h2",
        text: "Async from the first endpoint",
      },
      {
        type: "p",
        text: "Collecting and analysing posts from the X API takes anywhere from seconds to minutes, so no report endpoint does that work inline. The request validates input, creates a pending report and enqueues a Celery task; the task checks the subscription quota, collects, analyses, persists and charges usage.",
      },
      {
        type: "code",
        lang: "python",
        code: `# Simplified
from django.db import transaction

class KeywordReportSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        report = KeywordReport.objects.create(status="pending", **validated_data)
        transaction.on_commit(
            lambda: keyword_analysis.delay(report.id)
        )                                          # enqueue after commit
        return report


@shared_task
def keyword_analysis(report_id):
    report = KeywordReport.objects.get(pk=report_id)
    ensure_quota(report.owner, platform="x")       # subscription gate
    posts = collect(report.query, strategy="report")
    save_results(report, analyse(posts))
    charge_usage(report.owner, len(posts))`,
      },
      {
        type: "p",
        text: "Enqueueing after commit matters when report creation runs inside a transaction; otherwise a fast worker can try to read the report before the row is visible to it.",
      },
      {
        type: "h2",
        text: "One collection strategy, several consumers",
      },
      {
        type: "p",
        text: "Reports, alerts and Decision Hub all need posts from X, but they need different things afterwards. Instead of three copies of the collection code, there is one strategy selected per caller: reports persist everything, alerts fetch and evaluate without persisting, and Decision Hub collects under its own reply-enrichment budget. Fixes to rate-limit handling or pagination land in one place.",
      },
      {
        type: "h2",
        text: "Rate limits are a design input",
      },
      {
        type: "p",
        text: "The X API is rate limited and paid per request, which shapes everything above it. The client honours the API's rate-limit reset header and falls back to capped exponential backoff; subscriptions carry daily and monthly quotas per product and platform; and Decision Hub runs have a per-run collection budget. Alerts are evaluated on schedules (every 15 minutes by default) rather than streamed, which keeps cost predictable at the price of not being real-time.",
      },
      {
        type: "h2",
        text: "Chords when scores must be comparable",
      },
      {
        type: "p",
        text: "A Decision Hub centre compares a brand with its competitors. If each entity were collected and scored on its own schedule, the scores would describe different windows. So each run fans out collection for every entity in parallel and scores them all in one callback, at the same instant.",
      },
      {
        type: "code",
        lang: "python",
        code: `from celery import chord

def run_center(center_id):
    entity_ids = Entity.objects.filter(center_id=center_id).values_list("id", flat=True)
    chord(collect_entity.s(eid) for eid in entity_ids)(aggregate_center.s(center_id))`,
      },
      {
        type: "p",
        text: "The scores themselves are deterministic weighted formulas over normalised components — sentiment share, authority, volume, engagement, momentum — not a trained model. When a component can't be computed it is marked absent and the remaining weights are renormalised, instead of silently counting as zero.",
      },
      {
        type: "h2",
        text: "Deduplicate where the data lives",
      },
      {
        type: "p",
        text: "Alert scans overlap by design, so the same post can match twice. Deduplication is a unique constraint on (alert, item) in PostgreSQL, with each insert in its own savepoint so a duplicate is a cheap no-op. Events are then indexed in Elasticsearch under the database id, which makes re-indexing idempotent, and a repair command re-indexes anything whose Elasticsearch write failed.",
      },
      {
        type: "h2",
        text: "Cache by how stale data is allowed to be",
      },
      {
        type: "p",
        text: "The slowest screens were influencer dashboards aggregating whole categories. The fix was boring and effective: composite indexes built concurrently, a per-user Redis response cache with 5–15 minute TTLs for aggregates that only change when new reports land, a burst throttle, and cache hit/miss metrics so the cache's value is visible rather than assumed.",
      },
      {
        type: "h2",
        text: "What I'd do differently",
      },
      {
        type: "list",
        items: [
          "Make application-test results an explicit deployment gate from the first month. The reviewed workflows enforce commit-bound security checks; application testing is part of the broader delivery process, but its status as a mandatory deployment gate is not independently verified here.",
          "Give heavy queues their own workers early. One worker container still consumes every main queue, so a burst of one kind of work can delay the others.",
          "Decide which numbers you'll want to quote before you need them, and instrument for them. Claims you can't measure end up being claims you shouldn't make.",
          "Sign outgoing webhooks from the start rather than retrofitting it.",
        ],
      },
      {
        type: "divider",
      },
      {
        type: "callout",
        text: "Full case study, including the gateway and AWS architecture: /case-studies/twiscope",
      },
    ],
  },

  {
    slug:     "when-to-use-postgis",
    title:    "PostGIS vs. Plain Coordinates: When the Extension Earns Its Place",
    date:     "2026-10-17",
    readTime: "6 min read",
    tags:     ["PostgreSQL", "GIS", "Backend"],
    summary:
      "Two float columns are enough until you need to search a table by distance or test points against polygons. Here's how to tell the difference, the queries that keep PostGIS's index in play, and the Django gotcha with geography fields.",
    content: [
      {
        type: "callout",
        text: "Rewritten in October 2026. An earlier version presented a benchmark as measured while building MURI and showed queries MURI doesn't run. This version is a general guide, and it is explicit about what MURI actually uses.",
      },
      {
        type: "p",
        text: "Every location-aware backend eventually asks whether to store latitude and longitude as two numbers or adopt PostGIS. The honest answer depends on the questions you ask of the data, not on how many rows you have.",
      },
      {
        type: "h2",
        text: "Comparing two known points: plain coordinates are fine",
      },
      {
        type: "p",
        text: "If the question is “is this driver within 100 metres of this stop?”, you already have both points. A geodesic or Haversine calculation in application code is exact enough and costs microseconds. On MURI, a student transport platform I worked on, that is how trip start, end and QR-pickup checks work: the stops are stored as PostGIS geography, but the distance checks compare one driver position with one known point in Python.",
      },
      {
        type: "h2",
        text: "Searching a table by distance: this is where PostGIS earns it",
      },
      {
        type: "p",
        text: "“Which available drivers are within 5 km of this pickup?” is a different question: it scans many rows. With two float columns the distance expression wraps both columns in functions, so an ordinary B-tree index can't help and every candidate row is evaluated. (Note also that PostgreSQL doesn't let you filter on a SELECT alias with HAVING outside an aggregate — the filter has to repeat the expression in WHERE or use a subquery.)",
      },
      {
        type: "code",
        lang: "sql",
        code: `-- Plain columns: correct, but every available driver is evaluated
SELECT driver_id, distance_km
FROM (
  SELECT driver_id,
         6371 * acos(greatest(-1.0, least(1.0,
           cos(radians(:lat)) * cos(radians(lat)) * cos(radians(lng) - radians(:lng)) +
           sin(radians(:lat)) * sin(radians(lat))))) AS distance_km
  FROM drivers
  WHERE status = 'available'
) d
WHERE distance_km < 5
ORDER BY distance_km
LIMIT 20;`,
      },
      {
        type: "p",
        text: "With PostGIS, store the location as a geography column with a GiST index and ask the index-aware question directly. Two details matter: build the search point with an explicit SRID, and query the geography column as it is — wrapping the indexed column in a cast or function can stop the planner from using the index.",
      },
      {
        type: "code",
        lang: "sql",
        code: `-- location is geography(Point, 4326) with a GiST index
CREATE INDEX drivers_location_gix ON drivers USING gist (location);

SELECT driver_id,
       ST_Distance(location, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography) AS distance_m
FROM drivers
WHERE status = 'available'
  AND ST_DWithin(location, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography, 5000)
ORDER BY distance_m
LIMIT 20;`,
      },
      {
        type: "p",
        text: "How much faster that is depends on your data, so measure it: run both versions under EXPLAIN (ANALYZE, BUFFERS) on a realistic table and look for the index scan in the PostGIS plan.",
      },
      {
        type: "h2",
        text: "Points in polygons",
      },
      {
        type: "p",
        text: "“Which service district contains this address?” is the other case where PostGIS wins outright. Implementing point-in-polygon yourself means ray casting in application code; in PostGIS it's one predicate. On geography columns, use ST_Covers; ST_Contains is a geometry function.",
      },
      {
        type: "code",
        lang: "sql",
        code: `-- boundary is geography(Polygon, 4326)
SELECT id, name
FROM districts
WHERE ST_Covers(boundary, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography);`,
      },
      {
        type: "p",
        text: "In GeoDjango, a contains lookup on a geography field can be cast internally to geometry so the operation can run. That changes the semantics from the native geography operation, and the cast can affect index use. For a point inside a surface boundary, use covers directly; use dwithin and the distance lookups for distance queries.",
      },
      {
        type: "code",
        lang: "python",
        code: `from django.contrib.gis.geos import Point

point = Point(lng, lat, srid=4326)
district = District.objects.filter(boundary__covers=point).first()`,
      },
      {
        type: "h2",
        text: "When to skip PostGIS",
      },
      {
        type: "list",
        items: [
          "You only store a location per record and never search or filter by it.",
          "Every distance check compares two points you already have.",
          "Your managed database doesn't offer the extension.",
          "Approximate answers are acceptable and you can filter after fetching a small candidate set.",
        ],
      },
      {
        type: "h2",
        text: "The verdict",
      },
      {
        type: "p",
        text: "Adopt PostGIS when you need to search rows by distance or relate points to areas; for checking one known point against another, plain math in your application is enough. Either way, store coordinates with an explicit SRID from day one — it's the one decision that is painful to change later.",
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
