import type { Post } from "@/lib/posts";

export const postsPart4: Post[] = [
  {
    slug:     "twiscope-architecture",
    title:    "دروس في الـ architecture من بناء الـ backend بتاع Twiscope",
    date:     "2026-10-17",
    readTime: "قراءة 8 دقايق",
    tags:     ["Django", "Celery", "Elasticsearch", "Architecture"],
    summary:
      "سنتين كمطور الـ backend الوحيد على منصة social intelligence فيها كذا منتج، وبعدها قيادة الفريق اللي كبر حواليها. اللي أثبت نفسه: شغل async من أول endpoint، واستراتيجية جمع واحدة لكذا منتج، و chords عشان الـ scores تبقى قابلة للمقارنة، ومنع التكرار (deduplication) جوه قاعدة البيانات.",
    content: [
      {
        type: "callout",
        text: "المقال ده اتكتب من جديد في أكتوبر 2026. نسخة أقدم منه كانت بتذكر أرقام لحجم الـ events، وتقليل في الـ latency، وتوقيتات لتنبيهات real-time، وده كله مش مدعوم لا بالكود ولا بالقياسات اللي أقدر أشاركها. النسخة دي ملتزمة باللي النظام بيعمله فعلًا.",
      },
      {
        type: "p",
        text: "Twiscope منصة SaaS للـ social intelligence بالعربي والإنجليزي. من أكتوبر 2023 لأكتوبر 2025 كنت مطور الـ backend الوحيد فيها، ومن ساعتها بقود الفريق اللي كبر حواليها. دلوقتي فيها خمس منتجات شغالة على backend واحد بـ Django/DRF و Celery: تقارير عند الطلب (Deep-In)، ومتابعة المؤثرين، ولوحات تحكم لاتخاذ القرار بتقيّم البراندات قصاد المنافسين (Sadeed / Decision Hub)، ومحرك تنبيهات، والإشعارات.",
      },
      {
        type: "p",
        text: "دي القرارات اللي أثبتت نفسها، والقرارات اللي المرة الجاية هاخدها بدري عن كده.",
      },
      {
        type: "h2",
        text: "شغل async من أول endpoint",
      },
      {
        type: "p",
        text: "جمع البوستات من الـ X API وتحليلها بياخد من ثواني لدقايق، عشان كده مفيش ولا endpoint للتقارير بيعمل الشغل ده جوه الـ request نفسه. الـ request بيتحقق من المدخلات، ويعمل تقرير بحالة pending، ويحط Celery task في الـ queue؛ والـ task بتتأكد من الـ quota بتاعة الاشتراك، وتجمع، وتحلل، وتحفظ، وتحاسب على الاستهلاك.",
      },
      {
        type: "code",
        lang: "python",
        code: `# Simplified
class KeywordReportSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        report = KeywordReport.objects.create(status="pending", **validated_data)
        keyword_analysis.delay(report.id)          # never analyse in the request
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
        type: "h2",
        text: "استراتيجية جمع واحدة، وأكتر من consumer",
      },
      {
        type: "p",
        text: "التقارير والتنبيهات و Decision Hub كلهم محتاجين بوستات من X، بس كل واحد فيهم محتاج حاجة مختلفة بعد كده. بدل تلات نسخ من كود الجمع، فيه استراتيجية واحدة بتتحدد حسب الـ caller: التقارير بتحفظ كل حاجة، والتنبيهات بتجيب البيانات وتقيّمها من غير ما تحفظها، و Decision Hub بيجمع في حدود ميزانية الـ reply enrichment الخاصة بيه. وأي إصلاح في التعامل مع الـ rate limits أو الـ pagination بيتعمل في مكان واحد.",
      },
      {
        type: "h2",
        text: "الـ rate limits من مدخلات التصميم",
      },
      {
        type: "p",
        text: "الـ X API عليه rate limits وبيتدفع على كل request، وده بيحدد شكل كل حاجة مبنية فوقه. الـ client بيلتزم بالـ rate-limit reset header اللي بيرجع من الـ API، وكـ fallback بيستخدم exponential backoff ليه حد أقصى؛ والاشتراكات فيها quotas يومية وشهرية لكل منتج ولكل منصة؛ وكل run في Decision Hub ليه ميزانية جمع خاصة بيه. التنبيهات بتتقيّم على مواعيد محددة (كل 15 دقيقة افتراضيًا) مش بالـ streaming، وده بيخلّي التكلفة متوقعة، والتمن إنها مش real-time.",
      },
      {
        type: "h2",
        text: "الـ chords لما الـ scores لازم تبقى قابلة للمقارنة",
      },
      {
        type: "p",
        text: "الـ centre في Decision Hub بيقارن براند بمنافسينه. لو كل entity اتجمعت واتحسب لها score على الـ schedule بتاعها لوحدها، الـ scores هتوصف فترات زمنية مختلفة. عشان كده كل run بيعمل fan-out للجمع على كل الـ entities بالتوازي، وبيحسب الـ scores بتاعتهم كلهم في callback واحد، في نفس اللحظة.",
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
        text: "الـ scores نفسها معادلات deterministic بأوزان، مبنية على components متعمل لها normalization — sentiment share، authority، volume، engagement، momentum — مش موديل متدرّب. لما component مينفعش يتحسب، بيتعلّم عليه إنه غايب، والأوزان الباقية بيتعمل لها normalization من جديد، بدل ما يتحسب صفر من غير ما حد ياخد باله.",
      },
      {
        type: "h2",
        text: "الـ deduplication مكان ما البيانات موجودة",
      },
      {
        type: "p",
        text: "الـ scans بتاعة التنبيهات بتتداخل مع بعض عن قصد، فممكن نفس البوست يتطابق مرتين. الـ deduplication هنا عبارة عن unique constraint على (alert, item) في PostgreSQL، وكل insert بيتعمل في savepoint خاص بيه، فالـ insert المكرر بيبقى no-op تكلفته قليلة. بعد كده الـ events بتتعمل لها index في Elasticsearch بالـ id بتاعها في قاعدة البيانات، وده بيخلّي الـ re-indexing عملية idempotent، وفيه repair command بيعمل re-index لأي حاجة الكتابة بتاعتها في Elasticsearch فشلت.",
      },
      {
        type: "h2",
        text: "الـ cache على حسب البيانات مسموح لها تبقى قديمة قد إيه",
      },
      {
        type: "p",
        text: "أبطأ الشاشات كانت لوحات تحكم المؤثرين اللي بتعمل aggregation لـ categories كاملة. الحل كان ممل بس فعّال: composite indexes اتبنت concurrently، و response cache في Redis لكل مستخدم بـ TTLs مدتها 5–15 دقيقة للـ aggregates اللي مبتتغيرش غير لما تقارير جديدة توصل، و burst throttle، و metrics للـ cache hit/miss عشان قيمة الـ cache تبقى باينة بدل ما تبقى مجرد افتراض.",
      },
      {
        type: "h2",
        text: "اللي كنت هعمله بشكل مختلف",
      },
      {
        type: "list",
        items: [
          "أشغّل الـ test suite في الـ CI من أول شهر. الـ repository فيه آلاف الاختبارات، بس الـ CI لسه مش بيشغّل غير الـ security scans والـ deployments.",
          "أدّي الـ queues التقيلة workers خاصة بيها من بدري. لسه فيه worker container واحد بيستهلك من كل الـ queues الرئيسية، فأي burst في نوع واحد من الشغل ممكن يأخّر الباقي.",
          "أحدد الأرقام اللي هعوز أذكرها قبل ما أحتاجها، وأجهّز الـ instrumentation اللي يقيسها. أي ادعاء مينفعش يتقاس، في الآخر بيبقى ادعاء مش المفروض يتقال.",
          "أعمل signing للـ webhooks الطالعة من البداية، بدل ما أضيفه بعدين.",
        ],
      },
      {
        type: "divider",
      },
      {
        type: "callout",
        text: "دراسة الحالة كاملة، وفيها الـ architecture بتاع الـ gateway و AWS: /case-studies/twiscope",
      },
    ],
  },

  {
    slug:     "when-to-use-postgis",
    title:    "PostGIS ولا إحداثيات عادية: إمتى الـ extension يستاهل مكانه",
    date:     "2026-10-17",
    readTime: "قراءة 6 دقايق",
    tags:     ["PostgreSQL", "GIS", "Backend"],
    summary:
      "عمودين float كفاية، لحد ما تحتاجوا تدوّروا في جدول بالمسافة، أو تختبروا نقط واقعة جوه polygons ولا لأ. هنا هنشوف إزاي نفرّق بين الحالتين، والـ queries اللي بتحافظ على استخدام الـ index بتاع PostGIS، والمطب اللي في Django مع الـ geography fields.",
    content: [
      {
        type: "callout",
        text: "المقال ده اتكتب من جديد في أكتوبر 2026. نسخة أقدم منه عرضت benchmark على إنه اتقاس وقت بناء MURI، وعرضت queries مش بيشغّلها MURI. النسخة دي دليل عام، وبتقول بوضوح إيه اللي MURI بيستخدمه فعلًا.",
      },
      {
        type: "p",
        text: "كل backend بيتعامل مع المواقع بييجي عليه وقت ويسأل: نخزّن الـ latitude والـ longitude كرقمين، ولا نستخدم PostGIS؟ الإجابة بصراحة بتعتمد على الأسئلة اللي بتسألوها للبيانات، مش على عدد الصفوف اللي عندكم.",
      },
      {
        type: "h2",
        text: "مقارنة نقطتين معروفين: الإحداثيات العادية مفيهاش مشكلة",
      },
      {
        type: "p",
        text: "لو السؤال «السواق ده في حدود 100 متر من المحطة دي؟»، يبقى النقطتين موجودين أصلًا. حساب geodesic أو Haversine في كود التطبيق دقيق كفاية، وبياخد microseconds. في MURI، وهي منصة لنقل الطلاب اشتغلت عليها، ده الأسلوب اللي بتشتغل بيه عمليات التحقق عند بداية الرحلة ونهايتها وعند الـ pickup بالـ QR: المحطات متخزنة كـ PostGIS geography، بس التحقق من المسافة بيقارن موقع سواق واحد بنقطة واحدة معروفة في Python.",
      },
      {
        type: "h2",
        text: "البحث في جدول بالمسافة: هنا PostGIS يستاهل مكانه",
      },
      {
        type: "p",
        text: "«أنهي سواقين متاحين في حدود 5 كيلومتر من نقطة الـ pickup دي؟» ده سؤال مختلف: بيعمل scan على صفوف كتير. مع عمودين float، الـ expression بتاع المسافة بيحط العمودين جوه functions، فالـ B-tree index العادي مش بيقدر يساعد، وكل صف مرشّح بيتقيّم. (ملحوظة كمان: PostgreSQL مش بيسمح بعمل filter على alias من الـ SELECT باستخدام HAVING بره aggregate — الـ filter لازم يكرر الـ expression في WHERE أو يستخدم subquery.)",
      },
      {
        type: "code",
        lang: "sql",
        code: `-- Plain columns: correct, but every available driver is evaluated
SELECT driver_id, distance_km
FROM (
  SELECT driver_id,
         6371 * acos(least(1.0,
           cos(radians(:lat)) * cos(radians(lat)) * cos(radians(lng) - radians(:lng)) +
           sin(radians(:lat)) * sin(radians(lat)))) AS distance_km
  FROM drivers
  WHERE status = 'available'
) d
WHERE distance_km < 5
ORDER BY distance_km
LIMIT 20;`,
      },
      {
        type: "p",
        text: "مع PostGIS، خزّنوا الموقع في عمود geography عليه GiST index، واسألوا السؤال مباشرةً بصيغة الـ index يقدر يستخدمها. فيه تفصيلتين مهمين: ابنوا نقطة البحث بـ SRID صريح، واعملوا query على عمود الـ geography زي ما هو — لف العمود اللي عليه الـ index جوه cast أو function ممكن يخلّي الـ planner ميستخدمش الـ index.",
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
        text: "قد إيه ده أسرع بيعتمد على البيانات بتاعتكم، فقيسوه: شغّلوا النسختين بـ EXPLAIN (ANALYZE, BUFFERS) على جدول ببيانات واقعية، ودوّروا على الـ index scan في الـ plan بتاع PostGIS.",
      },
      {
        type: "h2",
        text: "النقط جوه الـ polygons",
      },
      {
        type: "p",
        text: "«أنهي منطقة خدمة فيها العنوان ده؟» دي الحالة التانية اللي PostGIS بيكسب فيها بوضوح. تنفيذ الـ point-in-polygon بنفسكم معناه ray casting في كود التطبيق؛ في PostGIS هو predicate واحد. على أعمدة الـ geography استخدموا ST_Covers؛ ST_Contains دي function للـ geometry.",
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
        text: "نفس الفرق موجود في GeoDjango: على geography field استخدموا الـ covers lookup (أو dwithin والـ distance lookups). الـ contains lookup مش مدعوم للـ geography في الـ PostGIS backend بتاع Django، وبيرمي error بدل ما يرجّع نتيجة فاضية من غير ما حد ياخد باله.",
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
        text: "إمتى مفيش داعي لـ PostGIS",
      },
      {
        type: "list",
        items: [
          "بتخزّنوا موقع لكل record وبس، ومش بتدوّروا ولا بتعملوا filter بيه خالص.",
          "كل تحقق من المسافة بيقارن نقطتين موجودين عندكم أصلًا.",
          "قاعدة البيانات الـ managed اللي بتستخدموها مش بتوفّر الـ extension ده.",
          "الإجابات التقريبية مقبولة، وتقدروا تعملوا filter بعد ما تجيبوا مجموعة صغيرة من الصفوف المرشّحة.",
        ],
      },
      {
        type: "h2",
        text: "الخلاصة",
      },
      {
        type: "p",
        text: "استخدموا PostGIS لما تحتاجوا تدوّروا في الصفوف بالمسافة أو تربطوا نقط بمناطق؛ أما لو المطلوب مقارنة نقطة معروفة بنقطة تانية، فالحسابات العادية في التطبيق بتاعكم كفاية. وفي الحالتين، خزّنوا الإحداثيات بـ SRID صريح من أول يوم — ده القرار الوحيد اللي تغييره بعدين بيبقى مؤلم.",
      },
    ],
  },
];
