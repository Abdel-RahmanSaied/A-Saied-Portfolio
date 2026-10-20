import type { Post } from "@/lib/posts";

export const postsPart2: Post[] = [
  {
    slug:     "django-caching-performance",
    title:    "تحسين أداء Django باستخدام الـ caching المدمج",
    date:     "2024-01-10",
    updated:  "2026-10-17",
    readTime: "مدة القراءة: 6 دقايق",
    tags:     ["Django", "Redis", "Performance", "Backend"],
    summary:
      "Django جاي معاه caching framework مرن، والمقال ده بيشرح إمتى يفيد وإزاي نستخدمه — من cache للـ view كله لحد نتائج functions بعينها — مع invalidation واضح وقياس للـ hit rate.",
    content: [
      {
        type: "p",
        text: "أغلب الكلام عن أداء Django بيروح على طول لتحسين الـ queries على قاعدة البيانات — إضافة indexes، واستخدام select_related، وتجنّب مشاكل الـ N+1. ده مهم، بس فيه طبقة فوقه غالبًا بيبقى تأثيرها أكبر وتقدروا تنفّذوها بسرعة: الـ caching. الـ caching framework المدمج في Django ناضج ومرن وبيشتغل مع أي backend. السؤال هو إمتى وإزاي نستخدمه.",
      },
      {
        type: "p",
        text: "مثلًا، في لوحات التحكم الخاصة بالمؤثرين في Twiscope، حل مشكلة endpoint بطيء بيحسب aggregates كان مزيج من composite indexes و response cache على Redis لكل مستخدم مع TTLs قصيرة — من غير إعادة تصميم للـ schema. الأجزاء الجاية بتشرح طرق استخدام الـ framework وإمتى نختار كل طريقة.",
      },
      {
        type: "h2",
        text: "الـ cache backends في Django",
      },
      {
        type: "p",
        text: "Django بيدعم أكتر من cache backend جاهز من غير أي إضافات. الاختيار الصح بيعتمد على الـ infrastructure والمتطلبات عندكم.",
      },
      {
        type: "list",
        items: [
          "LocMemCache — cache في الذاكرة جوه الـ process نفسه، سريع بس خاص بكل process ومش متشارك بين الـ workers. ينفع للتطوير بس.",
          "FileBasedCache — بيخزن الـ cache على الـ disk. مبيضيعش مع الـ restart، بس بطيء. وقليل لما يكون الاختيار الصح لتطبيقات الويب.",
          "PyMemcacheCache / PyLibMCCache — سريعين وموزّعين ومعمولين مخصوص للـ caching. مفيش persistence ومفيش data structures معقدة. (الـ backend القديم MemcachedCache اتشال في Django 4.1.)",
          "RedisCache — موجود جوه Django من إصدار 4.0 (django.core.cache.backends.redis.RedisCache)؛ و django-redis، الـ package اللي من طرف تالت، بتضيف حاجات زيادة زي delete_pattern. ده الاختيار المعتاد لتطبيقات Django على الـ production.",
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
        text: "المستوى 1: cache للـ view كله",
      },
      {
        type: "p",
        text: "أبسط بداية إنكم تعملوا cache للـ response بتاع الـ view كله. لو الـ view بيرجّع نفس الـ response لأي مستخدم مش عامل login خلال فترة زمنية معينة، اعملوا cache للـ response كله.",
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
        text: "الـ cache على مستوى الـ view بيشتغل كويس مع الـ endpoints العامة اللي أغلب الطلبات عليها قراءة (read-heavy)، والـ response فيها واحد لكل المستخدمين. لكن مبينفعش مع الـ views اللي محتاجة authentication والـ response فيها بيختلف من مستخدم للتاني — الـ cache في الحالة دي بيسرّب بيانات بين المستخدمين.",
      },
      {
        type: "h2",
        text: "المستوى 2: cache لجزء من الـ template",
      },
      {
        type: "p",
        text: "لما يكون جزء بس من الصفحة هو اللي الـ render بتاعه مكلف، اعملوا cache للجزء ده بدل الـ response كله. الـ template engine في Django فيه cache tag جاهز للموضوع ده.",
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
        text: "المستوى 3: الـ low-level cache API",
      },
      {
        type: "p",
        text: "لو محتاجين تحكم أدق — زي إنكم تعملوا cache لنتيجة function واحدة مكلفة، مش للـ view كله — استخدموا الـ low-level cache API مباشرةً. ومن تجربتي، هنا عادةً بتكون أكبر المكاسب.",
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
        text: "اختاروا الـ TTL على أساس البيانات مسموح لها تبقى قديمة قد إيه، مش على أساس قيمة default. في لوحات التحكم في Twiscope، الـ aggregates اللي مبتتغيرش غير لما تقارير جديدة توصل بيتعملها cache لكل مستخدم لمدة 5–15 دقيقة؛ وأي حاجة المستخدمين متوقعين يشوفوها بتتغير فورًا يا إما مبيتعملهاش cache، يا إما بيتعملها invalidation أول ما يحصل write.",
      },
      {
        type: "h2",
        text: "الـ cache invalidation: الجزء الصعب",
      },
      {
        type: "p",
        text: "الجزء السهل هو تخزين القيمة؛ القرار الأصعب هو إمتى ما ينفعش نعتمد عليها. في Django عندكم اختيارين أساسيين: expiry بمدة TTL، أو invalidation صريح لما البيانات تتغيّر.",
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
        text: "الـ invalidation المرتبط بتغيير في قاعدة البيانات يتنفّذ بعد نجاح الـ transaction، مش قبلها؛ وإلا request تاني ممكن يقرأ البيانات القديمة ويخزّنها من جديد قبل الـ commit. ولو هتستخدموا versioned keys، لازم الـ version يدخل فعلًا في الـ cache key، ويتعمله initialization قبل أول incr، ويفضل من غير expiry.",
      },
      {
        type: "h2",
        text: "إيه اللي بلاش نعمله cache",
      },
      {
        type: "list",
        items: [
          "بيانات خاصة بكل مستخدم من غير cache keys منفصلة لكل مستخدم — كده هتسرّبوا بيانات بين المستخدمين",
          "بيانات بتتغير مع كل write لو معدل الـ writes عندكم عالي — الـ cache كده كده هيتعمله invalidation فورًا",
          "الـ queries الصغيرة والسريعة — الـ overhead بتاع البحث في الـ cache ممكن يزيد عن وقت الـ query نفسها في الـ lookups البسيطة بالـ primary key",
          "أي حاجة حساسة أمنيًا (الـ tokens، كلمات السر، الصلاحيات) — قرارات الـ TTL الغلط عواقبها خطيرة",
        ],
      },
      {
        type: "h2",
        text: "مراقبة فعالية الـ cache",
      },
      {
        type: "p",
        text: "الـ cache اللي مش قادرين تقيسوه مش هتعرفوا إذا كان بيفيد فعلًا. تابعوا الـ hit rate والـ miss rate والـ eviction rate، واربطوهم بزمن الاستجابة وتكلفة الـ queries. مع Redis، الأرقام الأساسية بتطلع من INFO stats. مفيش hit rate مناسب لكل الأنظمة؛ الرقم المطلوب بيتحدد من تكلفة الـ miss وطبيعة البيانات.",
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
        text: "الـ caching framework في Django ممكن يدي نتيجة سريعة لما نفس الشغل المكلف بيتكرر، لكنه مش بديل عن تحسين الـ query أو إضافة index ناقص. ابدأوا بأغلى queries المتكررة، قيسوا النتيجة، وحددوا بوضوح قد إيه البيانات مسموح لها تبقى قديمة قبل ما توسّعوا استخدام الـ cache.",
      },
    ],
  },

  {
    slug:     "backend-depths-techniques",
    title:    "8 مجالات مهمة في هندسة الـ backend",
    date:     "2024-10-18",
    readTime: "مدة القراءة: 8 دقايق",
    tags:     ["Backend", "Distributed Systems", "Architecture", "Security"],
    summary:
      "شغل الـ backend أكبر من كتابة APIs. المقال بيجمع 8 مجالات بتظهر أهميتها مع نمو الأنظمة — من الأنظمة الموزّعة ونماذج الـ consistency، لحد الـ serverless والـ disaster recovery.",
    content: [
      {
        type: "p",
        text: "كتابة الـ APIs جزء واحد من شغل الـ backend. أول ما النظام يكبر، بتظهر أسئلة عن توزيع البيانات، والـ consistency، والـ caching، والأمان، والتشغيل وقت الأعطال. المجالات التمانية الجاية مش checklist للخبرة؛ هم أساس كويس لفهم القرارات اللي بتظهر في أنظمة production.",
      },
      {
        type: "h2",
        text: "1. الأنظمة الموزّعة (Distributed Systems)",
      },
      {
        type: "p",
        text: "أول ما النظام بتاعكم يتوزع على أكتر من machine، تبقوا بتتعاملوا مع نظام موزّع والقواعد بتتغير. وقت انقسام الشبكة تحديدًا، الـ CAP theorem بيقول إن النظام مش هيقدر يضمن في نفس الوقت consistency قوية و availability لكل request. بما إن أعطال الشبكة واردة، لازم تعرفوا النظام هيفضّل أنهي ضمان وقتها، وإيه السلوك اللي المستخدم هيشوفه.",
      },
      {
        type: "list",
        items: [
          "الـ Sharding: تقسيم البيانات على أكتر من node عشان حمل القراءة والكتابة (read/write) يتوزع — كل node مسؤولة عن جزء من البيانات",
          "الـ Replication: نسخ البيانات على أكتر من node عشان الـ redundancy والـ read scaling — والـ primary-replica هو أشهر pattern",
          "الـ CAP theorem: افهموا النظام بتاعكم محتاج أنهي ضمانات قبل ما تختاروا قاعدة البيانات",
        ],
      },
      {
        type: "h2",
        text: "2. الـ Consistency قصاد الأداء",
      },
      {
        type: "p",
        text: "الـ strong consistency — إن كل read يشوف آخر write — مكلفة. في حالات استخدام كتير، الـ eventual consistency مقبولة: كل الـ nodes هتوصل في الآخر لنفس الحالة، بس الـ reads ممكن تشوف بيانات قديمة بشكل مؤقت. التحدي الهندسي إنكم تعرفوا أنهي بيانات محتاجة strong consistency (المعاملات المالية، كميات المخزون) وأنهي بيانات تستحمل eventual consistency (الـ feed بتاع المستخدم، الـ aggregates بتاعة الـ analytics).",
      },
      {
        type: "callout",
        text: "تقنيات تستاهل تفهموها: الـ CRDTs (data structures بتتدمج بين الـ nodes من غير conflicts)، و Kafka و RabbitMQ لنشر الـ events بشكل async، والـ read replicas عشان تشيلوا الـ analytical queries من على قواعد البيانات الأساسية (primary).",
      },
      {
        type: "h2",
        text: "3. الـ Caching",
      },
      {
        type: "p",
        text: "الـ caching واحد من أدوات الأداء المتاحة اللي بتدي أعلى عائد قصاد المجهود. Redis و Memcached هما الاختيارات المتعارف عليها للـ distributed caching. التحدي التقني مش في إنكم تجهزوا الـ cache — التحدي في الـ invalidation: إنكم تعرفوا إمتى تخلّوا البيانات تنتهي (expire) أو تشيلوها (evict) عشان مترجّعوش نتايج قديمة.",
      },
      {
        type: "list",
        items: [
          "الـ expiry على أساس الـ TTL: أبسط طريقة، وبتشتغل كويس مع البيانات اللي بتبقى قديمة في مواعيد ممكن نتوقعها",
          "الـ event-driven invalidation: إنكم تعملوا invalidation للـ cache entries لما البيانات الأصلية تتغير، عن طريق الـ signals أو الـ message queues",
          "الـ versioned cache keys: زوّدوا version counter مع كل write، وحطّوا الـ version جوه الـ cache key — والـ entries القديمة بتعمل expire بشكل طبيعي",
        ],
      },
      {
        type: "h2",
        text: "4. الأمان",
      },
      {
        type: "p",
        text: "الأمان مش ميزة بتضيفوها في الآخر — ده جزء من التصميم من البداية. فيه تلات مجالات مش اختيارية لأي backend على الـ production:",
      },
      {
        type: "list",
        items: [
          "الـ OAuth2 والـ JWT: افهموا الفرق بين الـ authentication (مين ده؟) والـ authorization (مسموح له يعمل إيه؟)، وإمتى تستخدموا JWT وإمتى تستخدموا sessions على السيرفر (server-side sessions)",
          "التشفير أثناء النقل (encryption in transit): TLS في كل مكان، من غير استثناءات — حتى في الاتصال الداخلي بين الـ services وبعضها",
          "الـ hashing لكلمات السر: bcrypt أو Argon2، ومش SHA-256 أو MD5 أبدًا — لازم الـ work factor يخلي الـ brute force مكلف حسابيًا",
        ],
      },
      {
        type: "h2",
        text: "5. الـ Microservices",
      },
      {
        type: "p",
        text: "الـ microservices بتدي مرونة في تشغيل كل خدمة بشكل مستقل، لكن بتخلّي الـ deployment أكثر تعقيدًا. قبل ما تعتمدوها، افهموا التمن: الـ network calls بتاخد مكان الـ function calls، والـ distributed tracing بيبقى ضروري، وبقى عندكم services كتير لازم تعملولها deploy وتراقبوها. ولما تكون هي الاختيار الصح، الـ containers و Kubernetes بيتكفلوا بالـ deployment والـ scaling، و gRPC بيوفر تواصل كفء و typed بين الـ services وبعضها.",
      },
      {
        type: "callout",
        text: "متبدأوش بالـ microservices. ابدأوا بنظام monolith متقسم كويس. وافصلوا منه services بس لما يكون عندكم سبب واضح يخص الـ scaling أو توزيع المسؤوليات بين الفرق (team ownership) — مش عشان الـ microservices بتدي إحساس إنها أكتر احترافية.",
      },
      {
        type: "h2",
        text: "6. الـ Monitoring والـ Observability",
      },
      {
        type: "p",
        text: "النظام اللي مش قادرين تراقبوه مش هتقدروا تعملوله debug على الـ production. الركائز التلاتة للـ observability هي الـ metrics والـ logs والـ traces.",
      },
      {
        type: "list",
        items: [
          "الـ Metrics (Prometheus + Grafana): قياسات رقمية على مدار الوقت — معدل الـ requests، معدل الأخطاء، الـ latency percentiles، الـ queue depth",
          "الـ Logs: structured logs (JSON) ينفع البحث فيها بالـ field، مش بحث نصي بالـ grep",
          "الـ Distributed tracing (Jaeger، OpenTelemetry): تتبّع request واحد وهو ماشي بين أكتر من service — وده أساسي عشان تعملوا debug للـ latency في الـ microservice architectures",
        ],
      },
      {
        type: "h2",
        text: "7. الـ Disaster Recovery",
      },
      {
        type: "p",
        text: "نجاح الـ backup لوحده مش كفاية؛ لازم نختبر إننا نقدر نسترجع البيانات منه. خطة الـ disaster recovery الحقيقية فيها رقمين: الـ RPO (Recovery Point Objective، يعني قد إيه بيانات تقدروا تستحملوا تخسروها) والـ RTO (Recovery Time Objective، يعني الـ recovery ممكن ياخد قد إيه). الاتنين لازم يتختبروا بانتظام بإجراءات restore حقيقية، مش يتفترضوا على أساس الـ logs اللي بتقول إن الـ backup خلص.",
      },
      {
        type: "h2",
        text: "8. الـ Serverless",
      },
      {
        type: "p",
        text: "الـ serverless (AWS Lambda، Google Cloud Functions، Azure Functions) بيشيل عنكم إدارة الـ infrastructure، بس بيجيب معاه قيوده الخاصة: الـ cold starts، وحدود لوقت التنفيذ، وإنه stateless. اختيار ممتاز للـ workloads المعتمدة على الـ events واللي الحمل فيها بيجي على دفعات مفاجئة (bursty)، ومش اختيار كويس للـ processes اللي بتشتغل وقت طويل أو للـ hot paths الحساسة للـ latency. فهم المفاضلات دي بيساعدكم تختاروا الـ workloads المناسبة للـ serverless من البداية.",
      },
      {
        type: "p",
        text: "كل مجال من دول محتاج دراسة وتجربة، ومش لازم تتعمقوا فيهم كلهم مرة واحدة. فهم الأساسيات بيساعدكم تسألوا الأسئلة المناسبة وقت مراجعة التصميم، وتلاحظوا مخاطر ممكن ما تكونش ظهرت في شغلكم قبل كده.",
      },
    ],
  },
];
