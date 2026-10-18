import type { CaseStudy } from "@/lib/case-study-types";

// Egyptian Arabic translation of the twiscope and sanad-ai case studies.
// Mirrors src/lib/case-studies.ts; see docs/arabic-style-guide.md.

const twiscope: CaseStudy = {
  slug: "twiscope",
  title: "Twiscope",
  kicker: "منصة social intelligence",
  headline: "Twiscope: backend واحد وخمس منتجات للـ social media intelligence",
  summary:
    "منصة B2B SaaS بالعربي والإنجليزي لتحليلات السوشيال ميديا. كنت مطور الـ backend الوحيد فيها أول سنتين، ودلوقتي بقود الفريق؛ بنيت الـ pipelines بتاعة تحليل X، و Decision Hub (Sadeed)، ومحرك التنبيهات، والاشتراكات والتحكم في الصلاحيات، وطبقة الـ edge للخدمات على AWS.",
  readTime: "قراءة 11 دقيقة",
  role: "مطور الـ backend الوحيد (أكتوبر 2023 – أكتوبر 2025)، وبعدها قائد فريق برمجيات · ASAS IT",
  links: [{ label: "twiscope.net", href: "https://twiscope.net/" }],
  tags: ["Django / DRF", "Celery", "Redis", "PostgreSQL", "Elasticsearch", "Kong", "FastAPI", "AWS", "Terraform"],
  facts: [
    { value: "5", label: "منتجات على backend واحد" },
    { value: "6", label: "مصادر بيانات مربوطة" },
    { value: "سنتين", label: "كمطور الـ backend الوحيد" },
    { value: "Kong", label: "الـ gateway قدام 4 خدمات" },
  ],
  problem: [
    "فرق الـ communications والأبحاث في المنطقة محتاجة تفهم الكلام اللي بيدور حوالين كلمات مفتاحية وحسابات ومؤثرين وبراندات على X وشبكات تانية — بالعربي، مش بالإنجليزي بس. وأدوات الـ social listening العامة بتتعامل مع العربي بشكل ضعيف، ومش ماشية مع طريقة شغل الفرق دي.",
    "Twiscope كانت محتاجة كذا منتج على منصة واحدة: تقارير معمّقة عند الطلب، ومتابعة المؤثرين لكل ربع سنة، ولوحات تحكم للقرار بتقيّم البراند قصاد منافسينه، وتنبيهات مجدولة — وكلهم بيتشاركوا نفس جمع البيانات والاشتراكات وصلاحيات المؤسسة.",
  ],
  constraints: [
    "الـ X API v2 عليه rate limits صارمة وتكلفة على كل request، فكل مسار لجمع البيانات لازم يبقى له budget و quotas.",
    "الاشتراكات بتبقى لكل منتج ولكل منصة، وليها quotas يومية وشهرية، ومتشاركة على مستوى المؤسسة.",
    "المؤسسات ليها أدوار (owner، admin، member، viewer) ولازم كل منتج يحترمها.",
    "جمع البيانات وتحليلها ممكن ياخدوا دقايق؛ ومينفعش أي جزء منهم يعطّل أي request على الـ API.",
    "لمدة سنتين كان الـ backend عليه مطور واحد، فكان لازم التصميم يفضل حاجة فريق صغير جدًا يقدر يشغّلها.",
  ],
  architecture: {
    intro:
      "الـ requests بتدخل من Kong gateway بيتحقق من الـ JWTs وبيطبّق rate limiting، قبل ما يوجّهها لخدمة auth مكتوبة بـ FastAPI، والـ backend اللي على Django/DRF، وخدمة الـ realtime lookup، وخدمة Sanad AI. الشغل التقيل بيتنفذ في Celery؛ و Elasticsearch فيه الـ snapshots وأحداث التنبيهات والـ news feed.",
    layers: [
      {
        name: "الـ clients",
        nodes: [
          { label: "تطبيق الويب", detail: "تطبيق Angular فيه عرض 3D معمول بـ React (بناه زمايلي في الفريق؛ وأنا مسؤول عن الـ packaging والـ deployment بتوعه)." },
          { label: "تطبيق Influencers Impact", detail: "تطبيق موبايل بـ Flutter بناه زمايلي في الفريق على الـ APIs بتاعة الـ backend." },
        ],
      },
      {
        name: "الـ edge",
        nodes: [
          { label: "Kong 3.8 ← AWS load balancer", detail: "إعدادات declarative من غير قاعدة بيانات (DB-less): التحقق من الـ JWT بـ RS256، والـ rate limiting، والـ CORS، و portal موحّد لتوثيق الـ APIs." },
          { label: "خدمة الـ auth (FastAPI)", detail: "بتطلّع access و refresh tokens بـ RS256؛ ومتوافقة مع الـ password hashes الموجودة في Django." },
        ],
      },
      {
        name: "الخدمات",
        nodes: [
          { label: "الـ backend (Django/DRF)", detail: "حوالي 25 app: Deep-In، Influencer Impact، Decision Hub، Alert System، الاشتراكات، المؤسسات." },
          { label: "خدمة الـ realtime lookup", detail: "استعلامات live عند الطلب على X و TikTok و Instagram و Google." },
          { label: "Sanad AI", detail: "مساعد retrieval-augmented؛ بيتبادل أحداث (events) التقارير والـ enrichment عن طريق SQS." },
          { label: "خدمة الإشعارات (FastAPI)", detail: "إرسال push وإيميل، وليها Celery workers بتوعها." },
        ],
      },
      {
        name: "الـ async والبيانات",
        nodes: [
          { label: "Celery + Beat", detail: "Redis كـ broker؛ و queues للتقارير، و Decision Hub، والتقارير المجدولة، و backfills للـ sentiment." },
          { label: "PostgreSQL (RDS)", detail: "البيانات الـ relational ونتايج التقارير." },
          { label: "Elasticsearch", detail: "الـ snapshots بتاعة Decision Hub، وأحداث التنبيهات، والـ news feed، والـ word rollups، والـ logs." },
          { label: "SQS · S3", detail: "أحداث report-ready و enrichment-done مع Sanad؛ وتخزين الميديا." },
        ],
      },
      {
        name: "البنية التحتية",
        nodes: [
          { label: "Terraform على AWS", detail: "VPC على availability zones اتنين، و Auto Scaling group و internal load balancer لكل خدمة، و GPU instance للـ AI inference." },
          { label: "الـ delivery", detail: "GitHub Actions على self-hosted runners: بوابة أمان، restart، health check، bake للـ AMI، تحديث الـ launch template، و rollback." },
          { label: "الـ observability", detail: "metrics لـ Django و Celery على Prometheus، و Elastic APM، والـ logs في Elasticsearch." },
        ],
      },
    ],
  },
  products: [
    {
      name: "Deep-In",
      summary: "تقارير تحليل عند الطلب.",
      points: [
        "تقارير الكلمات المفتاحية على X عن طريق الـ full-archive search، مع enrichment للردود في حدود budget للـ requests في كل run.",
        "تحليل الـ timeline والـ mentions لحسابات X.",
        "إحصائيات مجمّعة (aggregates) للكلمات، والهاشتاجات، والإيموجي، والدول، وأهم الحسابات، والـ engagement، وكمان الـ sentiment من خدمة موديلات pretrained.",
        "تقارير عند الطلب على Instagram و TikTok و Google للكلمات المفتاحية والهاشتاجات والحسابات.",
        "التقارير اللي بتخلص بتنشر event على SQS، عشان Sanad AI يقدر يكتب لها ملخصات ويرجّعها.",
      ],
      scope: "جمع البيانات بيشتغل لكل تقرير لوحده؛ الـ news feed بس هو اللي بيتسحب بشكل مستمر.",
    },
    {
      name: "Influencer Impact",
      summary: "متابعة المؤثرين حسب الفئة والربع سنة.",
      points: [
        "فئات المؤثرين بيديرها الـ staff؛ ومتابعة فئة لمدة ربع سنة بتشغّل تحليل timeline لكل مؤثر فيها.",
        "إحصائيات مجمّعة لكل فترة و word rollups في Elasticsearch بتغذّي ترتيب الفئات، وأهم الكلمات، والهاشتاجات، والإيموجي، والـ sentiment.",
        "تقوية لوحة التحكم (hardening): composite indexes اتعملت concurrently، و response cache على Redis لكل مستخدم، و burst throttle، و metrics للـ cache hit/miss.",
      ],
      scope: "X بس. وتطبيق الموبايل بناه زمايلي في الفريق.",
    },
    {
      name: "Sadeed / Decision Hub",
      summary: "مراكز قرار (decision centres) بتقيّم البراند قصاد منافسينه.",
      points: [
        "مركز القرار فيه براند، وحسابات متابَعة، ومنافسين، وكلمات مفتاحية، وبيتحدّث كل ساعة، أو كل ست ساعات، أو كل يوم.",
        "فيه dispatcher على Beat بيبدأ Celery chord واحد لكل مركز: جمع بيانات بالتوازي لكل entity، وبعدين callback واحد بيحسب الـ scores.",
        "ست مؤشرات deterministic بأوزان — السمعة، والرضا، والانتشار، والتأثير، والفرص، والمخاطر — والأوزان ليها versions لكل مستخدم أو بشكل global.",
        "الـ snapshots في Elasticsearch، ومعزولة لكل tenant، هي اللي بتشغّل الـ trends والـ scoreboards؛ والـ windows المتخزنة ممكن يتعمل لها replay ويتعاد حساب الـ scores بتاعتها.",
      ],
      scope: "X بس. والـ forecasting مش متعمل.",
    },
    {
      name: "Alert System",
      summary: "متابعة مجدولة مع ملخصات (digests) من غير تكرار.",
      points: [
        "كل تنبيه ليه Beat schedule خاص بيه (افتراضيًا كل 15 دقيقة، ومينفعش الفترة تقل عن 5 دقايق).",
        "شروط بتتجمّع بـ AND على الكلمة المفتاحية، والـ mention، والـ sentiment، واللغة، والمكان، ومعاها شروط cooldown وحد أدنى لعدد الـ matches.",
        "منع التكرار معمول بـ unique constraint في قاعدة البيانات لكل تنبيه و item؛ والأحداث بتتعمل لها index في Elasticsearch كمان، ولو الكتابة دي فشلت فيه command للإصلاح.",
        "ملخص (digest) واحد لكل scan على الإيميل أو على HTTPS webhook؛ وعناوين الـ webhook لازم تعمل resolve لـ public IPs، والتحقق ده بيحصل وقت الحفظ ووقت الإرسال.",
      ],
      scope: "المحرك بيدعم X. والـ delivery at-least-once.",
    },
    {
      name: "Notification System",
      summary: "إشعارات جوه التطبيق، و push، وعلى الإيميل.",
      points: [
        "سجلات إشعارات جوه التطبيق، والـ clients بتعمل لها polling.",
        "إشعارات push عن طريق Firebase وإيميلات عن طريق SMTP، من خلال خدمة FastAPI ليها Celery workers بتوعها.",
        "حالات pending و sent و failed؛ والـ retry بيحصل للأخطاء المؤقتة بس؛ و idempotency keys على Redis بتمنع الإرسال المكرر.",
      ],
      scope: "أغلبه بناه زمايلي في الفريق؛ وأنا عملت الـ scaffold بتاع الخدمة.",
    },
  ],
  decisions: [
    {
      title: "في الأول modular monolith، والخدمات المنفصلة للأجزاء اللي حدودها كانت واضحة",
      body: "بمطور backend واحد، المنتجات بدأت كـ Django apps بتتشارك الاشتراكات والصلاحيات والبيانات، وكل الشغل البطيء في Celery tasks. والأجزاء اللي حدودها واضحة ومستقلة — الـ authentication، والإشعارات، ومساعد الـ AI، والـ live lookups — اتفصلت في خدمات خاصة بيها ورا الـ gateway.",
    },
    {
      title: "طريقة واحدة لجمع البيانات، وتلات consumers",
      body: "جمع البيانات من X متنفّذ مرة واحدة، وبيتختار الوضع المناسب حسب الـ caller: التقارير بتحفظ النتايج في PostgreSQL، والتنبيهات بتجيب البيانات وتقيّمها من غير ما تحفظها، و Decision Hub بيجمع في حدود budget للـ reply enrichment. والتعامل مع الـ rate limits بيحترم الـ reset header بتاع X، وكـ fallback بيستخدم exponential backoff ليه حد أقصى.",
    },
    {
      title: "استخدام chords عشان الـ scores تبقى قابلة للمقارنة",
      body: "Decision Hub بيوزّع جمع البيانات بالتوازي على كل entity في المركز، وبيحسب الـ scores ليهم كلهم في callback واحد في نفس اللحظة، عشان البراند ومنافسينه يتقاسوا على نفس الـ window. وفيه lock لكل مركز بيمنع إن الـ runs تتداخل، وكل run بيتسجّل.",
    },
    {
      title: "حساب scores deterministic وقابل للتفسير",
      body: "المؤشرات عبارة عن معادلات بأوزان على مكوّنات normalized، زي نسبة الـ sentiment، والـ authority، والحجم (volume)، والـ engagement، والـ momentum. ولو فيه مكوّن مينفعش يتحسب، بيتعلّم عليه إنه غايب، والأوزان الباقية بيتعاد توزيعها (renormalize)، بدل ما يتحسب صفر من غير ما يبان.",
    },
    {
      title: "منع التكرار في قاعدة البيانات",
      body: "أحداث التنبيهات بتعتمد على unique constraint، وكل insert في savepoint خاص بيه، فالتكرار بيبقى no-op رخيص. والـ documents في Elasticsearch بتستخدم نفس الـ id بتاع قاعدة البيانات، وده بيخلّي إعادة الـ indexing idempotent.",
    },
    {
      title: "الـ authentication على الـ edge",
      body: "Kong بيتحقق من الـ RS256 tokens وبيطبّق الـ rate limits قبل ما الـ traffic يوصل لأي خدمة، والـ authentication اتنقل من الـ monolith لخدمة FastAPI بتطلّع الـ tokens، وفي نفس الوقت فضلت متوافقة مع الـ password hashes الموجودة.",
    },
  ],
  tradeoffs: [
    { choice: "الـ monolith بـ Celery workers مشتركة", cost: "سريع في البنا والتشغيل بمطور واحد؛ بس دلوقتي فيه worker container واحد بيسحب من كل الـ queues الأساسية، فلو queue واحدة تقيلت ممكن تأخّر الباقي." },
    { choice: "تنبيهات مجدولة بدل الـ streaming", cost: "تكلفة متوقعة في حدود الـ limits بتاعة الـ X API، بس التنبيهات بتوصل في مواعيدها المجدولة (بالدقايق)، مش real time." },
    { choice: "مؤشرات deterministic", cost: "قابلة للتفسير وثابتة، بس مفيش forecasting." },
    { choice: "جمع البيانات عند الطلب", cost: "مصاريف الـ API بتحصل بس لما حد يطلب تقرير؛ ومفيش أرشيف مستمر غير الـ news feed." },
    { choice: "Elasticsearch على EC2 بنديره بنفسنا", cost: "تحكم كامل وتكلفة أقل، في مقابل إننا بنشغّل الـ backups والـ upgrades بنفسنا." },
  ],
  outcomes: [
    { title: "خمس منتجات، ومنصة واحدة", body: "Deep-In، و Influencer Impact، و Decision Hub، و Alert System، والإشعارات، كلهم بيتشاركوا جمع البيانات والاشتراكات والصلاحيات والبنية التحتية." },
    { title: "ست مصادر بيانات", body: "X API v2، و EnsembleData لـ Instagram و TikTok، و Google Custom Search، و LinkedIn، و news feed بيتعمله index في Elasticsearch كل خمس دقايق." },
    { title: "طبقة edge مؤمَّنة للخدمات", body: "كل request بيعدّي على التحقق من الـ JWT والـ rate limiting في الـ gateway؛ والخدمات موجودة في private subnets ورا internal load balancers." },
    { title: "deployments قابلة للتكرار", body: "كل deploy بيشغّل بوابة أمان، ويعمل restart للخدمة، ويعمل لها health check، ويعمل bake لـ machine image جديدة؛ والـ deploy jobs عادةً بتخلص في أقل من دقيقتين." },
  ],
  myRole: [
    "كنت مطور الـ backend الوحيد من أكتوبر 2023 لحد أكتوبر 2025؛ ومن ساعتها بقود الفريق، ولسه أكبر مساهم (حوالي 70% من commits الـ backend في المجمل).",
    "بنيت الـ pipelines بتاعة تحليل X، والـ clients المشتركة لـ X و Instagram و TikTok و Google.",
    "بنيت Decision Hub (Sadeed) من أوله لآخره، والمحرك بتاع الـ Alert System؛ وزميل في الفريق بنى أغلب الـ tasks بتاعة توصيل التنبيهات.",
    "بنيت الـ backend بتاع متابعة المؤثرين، والاشتراكات والـ quotas، والـ JWT authentication، وأدوار المؤسسات.",
    "بنيت إعدادات الـ Kong gateway، وخدمة الـ auth بـ FastAPI، وخدمة الـ realtime lookup، والبنية التحتية بـ Terraform، والـ deployment pipeline، والـ monitoring stack.",
    "زمايلي في الفريق بنوا الـ frontends بتاعة الويب والموبايل، وأغلب خدمة الإشعارات، والتقارير المجدولة، وتصدير الملفات، والـ ingestion بتاع LinkedIn والأخبار.",
  ],
  scopeNotes: [
    "نسخ أقدم من الموقع ده كان فيها أرقام عن حجم البيانات والـ latency والـ uptime، مقدرش أثبتها بقياسات ينفع أشاركها؛ والأرقام دي اتشالت.",
    "مفيش WebSocket ولا push channel: التنبيهات بتشتغل بمواعيد مجدولة، وخدمة الـ realtime بترد على الـ live lookups لما تتطلب.",
    "الـ sentiment جاي من موديلات pretrained من Hugging Face، بتشغّلها خدمة منفصلة؛ ومفيش أي موديل بيتدرّب في المنصة دي.",
    "الـ repositories فيها test suites كبيرة (حوالي 3,300 test function)، بس الـ CI دلوقتي بيشغّل الـ security scans والـ deployments، مش الاختبارات.",
    "Twiscope منتج من منتجات ASAS IT؛ ودراسة الحالة دي بتفضل على مستوى الـ architecture، ومش بتدخل في الإعدادات الداخلية.",
  ],
  next: "sanad-ai",
};

const sanad: CaseStudy = {
  slug: "sanad-ai",
  title: "Sanad AI",
  kicker: "مساعد RAG للتحليلات",
  headline: "Sanad AI: إجابات بالعربي والإنجليزي مبنية على تقارير Twiscope",
  summary:
    "المساعد الـ retrieval-augmented بتاع Twiscope بيجاوب على أسئلة عن تقارير تحليلات السوشيال ميديا بالعربي أو بالإنجليزي، وبيرجّع مع الإجابة المصادر اللي استخدمها. أنا بقود الفريق اللي بيبنيه، ومسؤول بنفسي عن الـ ingestion pipeline والـ deployment والـ tracing بتوعه؛ ودراسة الحالة دي بتقول بوضوح أنهي أجزاء كانت بتاعتي.",
  readTime: "قراءة 9 دقايق",
  role: "قائد فريق برمجيات · ASAS IT · صاحب الـ repo والـ reviewer بتاعه",
  links: [],
  tags: ["FastAPI", "Elasticsearch", "BGE-M3", "Reciprocal rank fusion", "AWS SQS", "OpenRouter", "Elastic APM"],
  facts: [
    { value: "3", label: "نطاقات للـ chat" },
    { value: "7", label: "أنواع تقارير قابلة للـ routing" },
    { value: "BM25 + kNN", label: "retrieval هجين" },
    { value: "AR / EN", label: "لغات الأسئلة" },
  ],
  problem: [
    "Twiscope بتطلّع تقارير تحليلات للكلمات المفتاحية والحسابات على X، وللكلمات المفتاحية والحسابات والهاشتاجات على TikTok، وللهاشتاجات والحسابات على Instagram. والمحللين كانوا عايزين يسألوا أسئلة عن التقارير دي — «أنهي حسابات جابت أعلى engagement؟»، «الهاشتاج ده عمل إيه مقارنةً بالربع اللي فات؟» — بالعربي أو بالإنجليزي، بدل ما يقروا لوحات التحكم.",
    "chatbot عام مكانش مقبول: الإجابات كان لازم تكون مبنية على بيانات التقرير نفسه، وفيها الأرقام اللي موجودة في التقرير فعلًا، وتقارن بين كذا تقرير لما يتطلب منها، ومتستخدمش أبدًا غير التقارير اللي اشتراك المستخدم يسمح بيها.",
  ],
  constraints: [
    "الأسئلة بتيجي بالعربي الفصحى، أو بالعامية الخليجية والمصرية، أو بالإنجليزي، أو خليط منهم.",
    "التحكم في الصلاحيات لازم يكون deterministic: الـ entitlements بتاعة الاشتراك وتحديد نطاق التقارير بيطبّقهم الكود، وعمرهم ما بيتسابوا لموديل لغوي.",
    "الـ Elasticsearch cluster المستهدف كان على إصدارات أقدم من 8.14، فالـ reciprocal rank fusion الـ native مكانش متاح.",
    "التقارير بتفضل توصل من منصة Twiscope على طول؛ فالـ ingestion لازم يكون idempotent، ويقدر يكمّل تقرير معالجته وقفت في النص.",
    "كل call زيادة للموديل بيزوّد الـ latency والتكلفة، فعدد الـ LLM calls لكل سؤال كان لازم يفضل قليل وليه حد أقصى.",
  ],
  architecture: {
    intro:
      "خدمة FastAPI ورا Nginx بترد على طلبات الـ chat بشكل synchronous مع async I/O؛ و worker منفصل بيعمل ingestion للتقارير من SQS لـ Elasticsearch. الـ retrieval هجين (lexical و vector)، والموديل اللغوي مبيشوفش غير الـ documents اللي الكود حصرها قبل كده في تقارير الـ caller.",
    layers: [
      {
        name: "مسار الـ request",
        nodes: [
          { label: "تطبيق الويب بتاع Twiscope", detail: "بيكلّم المساعد بالـ JWT بتاع المستخدم؛ والأسئلة بالعربي أو بالإنجليزي." },
          { label: "FastAPI API", detail: "التحقق من الـ JWT بـ RS256، وبعدها التحقق من الـ entitlements قصاد خدمة الاشتراكات قبل أي retrieval." },
          { label: "الـ intent classifier", detail: "الـ rules الأول (التحيات، والـ small talk، والكلام المسيء)، و LLM بس للأسئلة اللي مش واضحة." },
          { label: "الـ LLM index router", detail: "بيقترح أنهي indices يدوّر فيها؛ والكود بياخد التقاطع بين إجابته و allow-list لكل منصة." },
        ],
      },
      {
        name: "الـ retrieval",
        nodes: [
          { label: "BGE-M3 embeddings", detail: "dense vectors بـ 1024 dimension من سيرفر Text Embeddings Inference متشغّل عندنا (self-hosted)." },
          { label: "BM25 + kNN لكل index", detail: "لكل index فيه اتنين queries بيشتغلوا بالتوازي، وكل query متفلترة على التقرير والمنصة المصرّح بيهم." },
          { label: "Reciprocal rank fusion", detail: "على الـ client side، من غير أوزان، و k = 60، مع إزالة التكرار بالـ document id." },
          { label: "الـ context builder", detail: "quota لكل تقرير وحد أقصى لعدد الحروف (character budget)؛ والتقارير اللي ملهاش matches بتتذكر بالاسم صراحةً." },
        ],
      },
      {
        name: "الـ generation",
        nodes: [
          { label: "موديلات OpenAI GPT عن طريق OpenRouter", detail: "إجابة واحدة grounded لكل سؤال؛ temperature 0.3، ومن غير streaming." },
          { label: "الـ response", detail: "إجابة متنضّفة (sanitised)، والـ source documents اللي اتستخدمت، والتوقيت بتاع كل مرحلة، وعدد الـ tokens." },
        ],
      },
      {
        name: "الـ ingestion والتشغيل",
        nodes: [
          { label: "SQS worker", detail: "بيقرا التقرير من PostgreSQL، ويحوّله حسب المنصة، ويعمل embedding، و bulk indexing، ويكتب ملخص بلغتين." },
          { label: "الـ processing traces", detail: "كل مرحلة من كل تقرير بتتسجّل، فالتقرير اللي فشل بيكمّل من المرحلة اللي فشلت." },
          { label: "Elastic APM", detail: "tracing على الـ API والـ queue workers الاتنين، وكمان logs للـ requests والأخطاء." },
          { label: "الـ deployment", detail: "GitHub Actions على self-hosted runner: backup، restart، health check، rollback، وبعدين machine image جديدة." },
        ],
      },
    ],
  },
  decisions: [
    {
      title: "الموديل بيختار يدوّر فين؛ والكود بيقرر إيه اللي مسموح يتشاف",
      body: "الـ LLM router بيرجّع أسماء indices وبس. الكود بياخد التقاطع بينها وبين allow-list للمنصات اللي في الـ request، وبيتجاهل أي hints تانية، ولو الـ output فاضي أو مش صالح بيرجع لـ defaults ثابتة. فلاتر التقرير والمنصة بتتبني في Python وبتتضاف لكل query رايحة لـ Elasticsearch، والتحقق من الـ entitlements بيشتغل قبل الـ retrieval. سؤال فيه prompt injection ممكن يغيّر أنهي index من الـ indices المسموحة هيتدوّر فيه، لكن مش أنهي تقارير تبان.",
    },
    {
      title: "retrieval هجين، و reciprocal rank fusion على الـ client side",
      body: "BM25 بيلقط الكلمات العربي بشكلها الحرفي، والهاشتاجات، والـ handles، اللي بتتوه في الـ embeddings؛ و kNN على BGE-M3 بيلقط الصياغات التانية لنفس المعنى والـ matches بين اللغات. كل index بيروح له الـ queries الاتنين بالتوازي، والقوايم المترتبة بتتدمج بـ RRF (k = 60) جوه الخدمة، عشان إصدار الـ cluster المستهدف أقدم من الـ RRF الـ native. ولو sub-query واحدة فشلت، القايمة التانية بتتستخدم لوحدها.",
    },
    {
      title: "الإجابة دايمًا مبنية على الـ aggregates بتاعة التقرير",
      body: "الـ aggregates والملخصات على مستوى التقرير بتتضاف لكل search مهما كان الـ routing، والـ prompts بتذكر بالاسم الـ field بتاع إجمالي التقرير لكل منصة. من غير كده، الموديل كان بيتعامل مع الكام post اللي رجعوا على إنهم التقرير كله، ويطلّع totals غلط.",
    },
    {
      title: "الـ rules قبل موديل الـ classifier",
      body: "أول مرحلة rule-based بترد على التحيات والـ small talk والكلام المسيء من غير retrieval، وبتعمل normalization للنص العربي (التشكيل، وأشكال الألف والتاء المربوطة) قبل الـ matching. والأسئلة اللي الـ rules مش قادرة تصنّفها هي بس اللي بتدفع تمن LLM call للتصنيف.",
    },
    {
      title: "ingestion idempotent ويقدر يكمّل من مكان ما وقف",
      body: "الـ document ids بتبقى deterministic ومربوطة بالتقرير، فإعادة الـ indexing بتكتب فوق القديم بدل ما تكرّره. والـ processing trace لكل تقرير بيخلّي الـ worker يعدّي المراحل اللي خلصت. الأعطال المؤقتة بتسيب الـ message على الـ queue عشان تتبعت تاني؛ والـ messages اللي شكلها غلط (malformed) أو مش صالحة بشكل نهائي بتتشال.",
    },
    {
      title: "الـ degradation بدل الفشل",
      body: "لو batch من الـ embeddings فشلت وقت الـ ingestion، الـ documents دي بتتعمل لها index من غير vectors، وبتفضل ينفع يتدوّر عليها بـ BM25. ولو الـ classifier أو الـ router فشلوا، بيرجعوا للـ defaults بدل ما الـ request يفشل.",
    },
  ],
  tradeoffs: [
    { choice: "الـ index routing بالـ LLM", cost: "call زيادة للموديل في كل سؤال (latency ومصاريف)، ومحكوم بـ fallbacks deterministic." },
    { choice: "الـ RRF على الـ client side", cost: "اتنين round-trips لـ Elasticsearch لكل index، و candidate depth ثابت 20 لكل قايمة؛ والـ fusion من غير أوزان." },
    { choice: "الـ embeddings بتاعة الملخصات بالإنجليزي بس", cost: "vector space واحد لكل الأسئلة، بس نص الملخص العربي مبيتدوّرش فيه بشكل مباشر." },
    { choice: "cache للـ entitlements لمدة 30 ثانية", cost: "calls أقل لخدمة الاشتراكات؛ بس الصلاحية اللي اتسحبت ممكن تفضل شغالة لحد 30 ثانية في كل process، ولو الخدمة دي وقعت الـ chat بيقف." },
    { choice: "المقارنات بيكتبها الموديل", cost: "الترتيب والفروق بين التقارير جاية من الموديل وهو ماشي على قواعد صارمة في الـ prompt على الأرقام اللي اترجعت، مش من كود deterministic." },
  ],
  outcomes: [
    { title: "تلات نطاقات للـ chat", body: "تقرير واحد، وتقارير المستخدم نفسه (لحد 1,000 في الـ request الواحد)، و mode لكل التقارير محكوم بالـ entitlements — ولكل واحد منهم استراتيجية retrieval خاصة بيه." },
    { title: "إجابات بتوضّح مصادرها", body: "كل إجابة بترجّع الـ documents اللي استخدمتها، والتوقيت بتاع كل مرحلة، وعدد الـ tokens، عشان مشاكل الجودة يبقى ممكن تترجع لأصلها: الـ retrieval أو الـ generation." },
    { title: "سبع أنواع تقارير", body: "كلمة مفتاحية وحساب على X، وكلمة مفتاحية وحساب وهاشتاج على TikTok، وهاشتاج وحساب على Instagram، ولكل نوع منهم الـ indices المسموحة والـ ranking fields الخاصة بيه." },
    { title: "delivery قابل للتكرار", body: "أي push على الـ production branch بينزل عن طريق GitHub Actions مع backup و health check و rollback، وبعدين بيعمل bake لـ machine image جديدة." },
  ],
  myRole: [
    "بدأت خدمة الـ FastAPI والـ repository، وحددت الـ structure بتاعها.",
    "بنيت أول SQS ingestion worker، والـ pipeline اللي بيعالج التقارير من PostgreSQL لـ Elasticsearch، ومن ضمنه الـ query builders بتوع الكلمات المفتاحية والحسابات على X.",
    "عملت التحقق من الـ JWT بـ RS256 في الـ API.",
    "بنيت الـ deployment workflows (systemd ← GitHub Actions، مع backup و rollback، وبعدين تحديث الـ machine image).",
    "ضفت tracing بـ Elastic APM للـ API وللـ queue workers الاتنين.",
    "بنيت خدمة sentiment منفصلة على GPU للهجات العربية (تلات موديلات Hugging Face، و inference بـ fp16 على batches)؛ ومتنزّلة جنب Sanad، بس الـ chat مش بيستخدمها.",
    "كقائد للفريق وصاحب الـ repo، راجعت وعملت merge لشغل الفريق، ومنه التعديلات بتاعة الـ router والـ hybrid retrieval. أما قلب الـ retrieval — الـ classifier، والـ LLM router، والـ hybrid search والـ RRF، والـ prompts، والـ clients بتوع الـ embedding والـ LLM — فصمّمه وكتبه اتنين من زمايلي في الفريق.",
  ],
  scopeNotes: [
    "مفيش هنا أي أرقام عن الـ latency أو الدقة أو التكلفة أو الـ traffic؛ ولا واحد منهم متقاس بشكل أقدر أشاركه.",
    "الإجابات مش بتيجي streaming، والنظام مش real-time: التقارير بيتعملها ingestion بشكل asynchronous.",
    "الـ observability هي Elastic APM والـ logs في Elasticsearch؛ ومفيش Prometheus ولا Grafana للخدمة دي.",
    "الـ repository فيه unit-test suite كبيرة لسه الـ CI مبيشغّلهاش. التحسينات الجاية: تشغيل الاختبارات في الـ CI، وتظبيط الـ error handling في الـ ingestion والـ visibility windows بتاعة الـ queue، ووضع حد للـ fan-out في الـ requests الكبيرة جدًا اللي بتشمل كذا تقرير.",
  ],
  next: "fendix",
};

export const caseStudiesPart1: CaseStudy[] = [twiscope, sanad];
