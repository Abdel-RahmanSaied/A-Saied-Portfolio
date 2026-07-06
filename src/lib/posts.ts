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
    slug:     "scaling-sentiment-api",
    title:    "Scaling a Sentiment Analysis API: From 100% CPU to Production-Ready",
    date:     "2026-05-01",
    readTime: "10 min read",
    tags:     ["Python", "FastAPI", "NLP", "Machine Learning", "Backend"],
    summary:
      "Two uvicorn workers pegged two CPU cores at 100% for 4+ hours on our Arabic NLP service. Here are the five fixes that cut RAM by 1.5 GB per worker and set the path toward 5–7x faster inference — without touching the API.",
    content: [
      {
        type: "p",
        text: "One morning I opened htop on one of our EC2 instances and saw something that should never happen in a healthy service: two CPU cores completely saturated, running at 100% for over four hours straight. The culprit was a FastAPI-based sentiment analysis API powered by CAMeL-Lab Arabic NLP models. This is the story of what I found, what I fixed, and the path toward making it truly production-ready.",
      },
      {
        type: "list",
        items: [
          "Core 1: 100% — fully saturated",
          "Core 2: 99.4% — fully saturated",
          "Core 0: 0.6% — sitting idle",
          "Core 3: 3.9% — sitting idle",
        ],
      },
      {
        type: "h2",
        text: "The Stack",
      },
      {
        type: "code",
        lang: "text",
        code: `FastAPI + Uvicorn
CAMeL-Lab Arabic sentiment model (PyTorch)
nlptown/bert-base-multilingual-uncased-sentiment (bonus model we didn't need)
AWS EC2 — 4 vCPUs, 15.4 GB RAM
Docker`,
      },
      {
        type: "h2",
        text: "What Was Actually Wrong",
      },
      {
        type: "h3",
        text: "Problem 1: The GIL Trap",
      },
      {
        type: "p",
        text: "The first question I asked: why are only 2 of my 4 cores being used? The answer is Python's GIL (Global Interpreter Lock). A single Python process can only use one CPU core at a time for CPU-bound work — like ML inference. When you run uvicorn with 2 workers, you get 2 processes, each pinned to one core. The other 2 cores sit idle.",
      },
      {
        type: "code",
        lang: "bash",
        code: `# What I had
uvicorn sentiment_api:app --workers 2

# What I should have had (at minimum)
uvicorn sentiment_api:app --workers 3  # 3 cores for inference, 1 for OS/Docker`,
      },
      {
        type: "p",
        text: "But simply adding workers wasn't the real fix — because each worker was loading 2.56 GB of model data into RAM. Doubling workers would double RAM consumption. I needed to fix the root issues first.",
      },
      {
        type: "h3",
        text: "Problem 2: A Model We Didn't Actually Need",
      },
      {
        type: "p",
        text: "Inside the service I found this loading on startup — always, unconditionally:",
      },
      {
        type: "code",
        lang: "python",
        code: `from transformers import pipeline

# Loaded on startup — always
nlptown_pipeline = pipeline(
    "text-classification",
    model="nlptown/bert-base-multilingual-uncased-sentiment"
)`,
      },
      {
        type: "p",
        text: "The nlptown model was consuming ~670 MB of RAM per worker even though 90% of requests only needed the CAMeL-Lab model. It was there from an early experiment and never removed.",
      },
      {
        type: "callout",
        text: "Fix: Remove it entirely, or lazy-load it only when explicitly requested. RAM saved per worker: ~670 MB.",
      },
      {
        type: "h3",
        text: "Problem 3: Models Loading in __init__, Not in Lifespan",
      },
      {
        type: "p",
        text: "This is the subtle one that most tutorials get wrong. When models load in __init__, if HuggingFace is slow or the network blips, your FastAPI process crashes before it can respond to any request — not even a 503. The load balancer gets nothing back.",
      },
      {
        type: "code",
        lang: "python",
        code: `# The wrong way
class SentimentService:
    def __init__(self):
        self.model = AutoModelForSequenceClassification.from_pretrained("CAMeL-Lab/...")
        self.tokenizer = AutoTokenizer.from_pretrained("CAMeL-Lab/...")`,
      },
      {
        type: "code",
        lang: "python",
        code: `# The right way — FastAPI lifespan
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    app.state.model = AutoModelForSequenceClassification.from_pretrained(
        settings.MODEL_ID,
        revision=settings.MODEL_REVISION,  # Pin to a commit SHA
        torch_dtype=torch.float16,         # Cut RAM usage by ~40%
    )
    yield
    # Shutdown — cleanup here
    del app.state.model

app = FastAPI(lifespan=lifespan)`,
      },
      {
        type: "list",
        items: [
          "Return 503 instead of crashing during model load failures",
          "Readiness and liveness probes work correctly",
          "Clean shutdown frees GPU/CPU memory",
          "torch_dtype=float16 cuts RAM usage by ~40% with minimal accuracy impact",
        ],
      },
      {
        type: "h3",
        text: "Problem 4: No Version Pinning",
      },
      {
        type: "code",
        lang: "python",
        code: `# HuggingFace can update this model silently at any time
AutoModelForSequenceClassification.from_pretrained("CAMeL-Lab/camel-bert-arabic-sentiment")

# Pinned to a specific commit — reproducible, auditable
AutoModelForSequenceClassification.from_pretrained(
    "CAMeL-Lab/camel-bert-arabic-sentiment",
    revision="a3f9d2c",  # commit SHA or tag
)`,
      },
      {
        type: "p",
        text: "On an OSINT platform where prediction accuracy matters, you need to know exactly which model version produced which output. HuggingFace can silently update models — pinning a revision guarantees reproducibility across deploys.",
      },
      {
        type: "h3",
        text: "Problem 5: No HuggingFace Cache Volume",
      },
      {
        type: "p",
        text: "Every time a Docker container restarted, it re-downloaded the models from scratch. On a 1.2 GB model, that's 30+ seconds of cold start time on every deploy.",
      },
      {
        type: "code",
        lang: "yaml",
        code: `# docker-compose.yml
services:
  sentiment-api:
    volumes:
      - hf-cache:/root/.cache/huggingface
volumes:
  hf-cache:`,
      },
      {
        type: "callout",
        text: "Cold start improvement: ~30 seconds → under 3 seconds. One line of docker-compose config.",
      },
      {
        type: "h2",
        text: "The Quick Wins Summary",
      },
      {
        type: "list",
        items: [
          "Remove unused nlptown model — 30 min effort — ~670 MB RAM saved per worker",
          "Add HuggingFace cache volume — 5 min effort — eliminates 30s cold start on restart",
          "torch_dtype=float16 — 10 min effort — ~850 MB RAM saved, +10–20% inference speed",
          "Move model loading to FastAPI lifespan — 1–2 hrs — proper 503 on load failure, clean shutdown",
          "Pin model revision — 15 min — reproducible predictions, no silent model drift",
        ],
      },
      {
        type: "p",
        text: "Implementing all five took less than a day and cut RAM consumption per worker by over 1.5 GB.",
      },
      {
        type: "h2",
        text: "The Real Scaling Path",
      },
      {
        type: "h3",
        text: "Stage 1: Multiple Workers (Baseline)",
      },
      {
        type: "code",
        lang: "text",
        code: `2 uvicorn workers → 2 CPU cores used
~5 GB RAM
Latency: 800ms–1.2s per request`,
      },
      {
        type: "h3",
        text: "Stage 2: Optimized Workers (After Quick Wins)",
      },
      {
        type: "code",
        lang: "text",
        code: `3 uvicorn workers → 3 CPU cores used
~3.5 GB RAM
Latency: 600–900ms per request`,
      },
      {
        type: "h3",
        text: "Stage 3: ONNX Runtime (The Next Step)",
      },
      {
        type: "p",
        text: "PyTorch is great for training, but for inference in production, ONNX Runtime delivers 5–7x latency improvement. The API stays identical — same FastAPI endpoints, same request/response format. Only the inference engine changes underneath.",
      },
      {
        type: "code",
        lang: "python",
        code: `# Export to ONNX once
from optimum.exporters.onnx import main_export

main_export(
    model_name_or_path="CAMeL-Lab/camel-bert-arabic-sentiment",
    output="./onnx_model/",
    task="text-classification",
)

# Load with ONNX Runtime
from optimum.onnxruntime import ORTModelForSequenceClassification

model = ORTModelForSequenceClassification.from_pretrained("./onnx_model/")`,
      },
      {
        type: "code",
        lang: "text",
        code: `ONNX Runtime inference
~1.5 GB RAM (vs 2.56 GB with PyTorch)
Latency: 100–200ms per request
Improvement: 5–7x`,
      },
      {
        type: "h3",
        text: "Stage 4: Go + ONNX (Maximum Throughput)",
      },
      {
        type: "p",
        text: "For maximum throughput, replace the Python service with Go running the ONNX model directly via onnxruntime-go bindings. Go's goroutines handle concurrent requests far more efficiently than Python's worker-per-request model.",
      },
      {
        type: "code",
        lang: "go",
        code: `func (s *SentimentService) Predict(ctx context.Context, text string) (*SentimentResult, error) {
    tokens := s.tokenizer.Encode(text)
    output, err := s.session.Run(tokens)
    if err != nil {
        return nil, err
    }
    return parseSentiment(output), nil
}`,
      },
      {
        type: "code",
        lang: "text",
        code: `Go + ONNX
~800 MB RAM
Latency: 30–80ms per request
Concurrency: goroutines, not processes — 10x the concurrent requests on the same hardware`,
      },
      {
        type: "h2",
        text: "What I Actually Recommend",
      },
      {
        type: "p",
        text: "Don't skip straight to Go + ONNX. The ROI curve is non-linear:",
      },
      {
        type: "code",
        lang: "text",
        code: `Quick wins (1 day)       → 2x RAM improvement, better reliability
ONNX Runtime (1–2 days)  → 5–7x latency improvement
Go + ONNX (1–2 weeks)    → maximum throughput, complex migration`,
      },
      {
        type: "p",
        text: "If your current bottleneck is RAM or cold starts, do the quick wins. If your bottleneck is latency, move to ONNX Runtime in Python first — the migration is straightforward with optimum. Only go the Go route if you're hitting concurrency limits that ONNX Python can't solve.",
      },
      {
        type: "h2",
        text: "Key Takeaways",
      },
      {
        type: "list",
        items: [
          "Identify your real bottleneck first — is it RAM, latency, or concurrency? The fix is different for each",
          "The GIL is not your enemy if you use processes — but each process costs RAM, so optimize model loading before scaling workers",
          "ONNX Runtime is the fastest win for inference latency — the API doesn't change, only the engine",
          "Version-pin your models — especially on production systems where reproducibility and auditability matter",
          "Lifespan beats __init__ — always load models in FastAPI lifespan for proper error handling and clean shutdown",
        ],
      },
      {
        type: "divider",
      },
      {
        type: "p",
        text: "This article is based on real production experience building Twiscope, an Arabic OSINT intelligence platform. The sentiment analysis service processes Arabic social media content at scale.",
      },
    ],
  },
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
        text: "Once your system spans more than one machine, you're dealing with distributed systems — and the rules change. The CAP theorem tells you that in a distributed system you can only guarantee two of three properties: Consistency, Availability, and Partition Tolerance. In practice, partition tolerance is non-negotiable (networks fail), so you're choosing between strong consistency and high availability.",
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
    readTime: "5 min read",
    tags:     ["Serverless", "AWS Lambda", "Cloud", "Architecture"],
    summary:
      "Serverless offers real flexibility and automatic scaling — but it comes with constraints most tutorials skip. Here's what cold starts, execution limits, and statelessness actually mean in practice, and how to work around them.",
    content: [
      {
        type: "p",
        text: "Serverless computing has a marketing problem. The pitch — 'no servers to manage, infinite scale, pay only for what you use' — is accurate but incomplete. Every architectural pattern has trade-offs, and serverless trade-offs are specific and non-obvious. Understanding them is the difference between a successful serverless deployment and a system that embarrasses you in production.",
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
          "VPC-attached Lambda functions have longer cold starts due to network interface provisioning",
        ],
      },
      {
        type: "code",
        lang: "python",
        code: `# Bad: importing heavy libraries inside the handler (re-imported on every cold start)
def handler(event, context):
    import pandas as pd          # slow import
    import numpy as np           # slow import
    # ... process event


# Good: module-level imports are cached after first cold start
import json
from utils import process_event  # lightweight utility

def handler(event, context):
    return process_event(event)`,
      },
      {
        type: "callout",
        text: "For latency-sensitive endpoints, use Provisioned Concurrency on AWS Lambda — it keeps a pool of initialized containers always warm, eliminating cold starts at the cost of paying for idle capacity. Use it selectively on hot paths, not across the board.",
      },
      {
        type: "h2",
        text: "Challenge 2: Execution time limits",
      },
      {
        type: "p",
        text: "AWS Lambda has a maximum execution time of 15 minutes. Azure Functions default to 5 minutes (configurable up to 60). This hard limit means serverless is simply not the right tool for long-running processes — batch jobs, large file processing, ML training.",
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
        text: "This is a feature, not a bug — statelessness is what enables infinite horizontal scaling. But it requires a mindset shift: all persistent state must live in external storage.",
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
    title:    "Why Both Scanners Must Agree: The Insight Behind Fendix",
    date:     "2026-04-15",
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
      {
        type: "divider",
      },
      {
        type: "callout",
        text: "This architecture powers Twiscope — an Arabic OSINT social intelligence platform processing 5M+ data points daily across Twitter, Instagram, YouTube, TikTok, and news sources. Full case study at /case-studies/twiscope",
      },
    ],
  },

  {
    slug:     "when-to-use-postgis",
    title:    "PostGIS vs. Plain Coordinates: A Real-World Comparison from Building MURI",
    date:     "2025-08-14",
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
      {
        type: "divider",
      },
      {
        type: "callout",
        text: "These techniques were applied in building MURI — a student transportation platform with dedicated apps for client, driver, and admin roles, PostGIS geospatial routing, and real-time trip tracking. Full case study at /case-studies/muri",
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
