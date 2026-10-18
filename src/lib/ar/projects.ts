// Arabic (Egyptian) mirror of src/lib/projects.ts. Same projects, same order,
// same facts. slug, title, techStack, category, links, image and licence are
// copied byte for byte; the UI translates `category`.
import type { Project } from "@/lib/projects";

export const projectsAr: Project[] = [
  {
    slug: "twiscope",
    title: "Twiscope",
    tagline: "منصة للرصد والتحليل الإعلامي ودعم القرار",
    caseStudyHook: "إزاي backend مشترك بيدعم منصة للرصد والتحليل الإعلامي وهي بتتوسع",
    description:
      "منصة بالعربي والإنجليزي للرصد والتحليل الإعلامي، بتحلل الحسابات والمواضيع والهاشتاجات والمؤثرين والقنوات، وبتحوّل التقارير لمعلومات تساعد في القرار من خلال منتجات منها Deep-In، ومؤشر تويسكوب للتأثير، و Sanad AI. شغلي كان في الـ backend المشترك بـ Django/DRF و Celery ورا Kong gateway: Deep-In، ومتابعة المؤثرين، و Decision Hub، والتنبيهات، والاشتراكات والصلاحيات، مع PostgreSQL و Elasticsearch و AWS بيتدار بـ Terraform. فضلت مطور الـ backend الوحيد لمدة سنتين قبل ما أنتقل لقيادة الفريق.",
    techStack: ["Django / DRF", "Celery", "Redis", "PostgreSQL", "Elasticsearch", "Kong", "FastAPI", "Terraform", "AWS"],
    category: "Platform",
    engagement: "ASAS IT",
    role: "قائد الـ backend ← قائد الفريق",
    live: "https://twiscope.net/",
    caseStudy: "/case-studies/twiscope",
    featured: true,
    image: "/assets/twiscope-logo.png",
  },
  {
    slug: "sanad-ai",
    title: "Sanad AI",
    tagline: "مساعد التحليلات بالـ RAG في Twiscope",
    caseStudyHook: "إزاي بنينا RAG بالعربي والإنجليزي والصلاحيات مفروضة برّه موديل اللغة",
    description:
      "مساعد RAG في Twiscope لتقارير التحليلات، بالعربي والإنجليزي: hybrid retrieval بـ BM25 + kNN على embeddings من BGE-M3، والنتايج بتتدمج بـ reciprocal rank fusion، و index routing بالـ LLM محكوم بـ allow-lists deterministic، و ingestion للتقارير على SQS. بقود الفريق، وأنا شخصيًا مسؤول عن الـ ingestion والـ deployment والـ tracing.",
    techStack: ["FastAPI", "Elasticsearch", "BGE-M3", "AWS SQS", "OpenRouter", "Elastic APM"],
    category: "AI / ML",
    engagement: "ASAS IT",
    role: "قائد الفريق ومساهم",
    caseStudy: "/case-studies/sanad-ai",
    featured: true,
  },
  {
    slug: "fendix",
    title: "Fendix",
    tagline: "منصة لقرارات أمان التطبيقات",
    caseStudyHook: "إزاي Fendix بيحوّل نتايج أدوات الفحص لقرار إصدار واضح وقابل للتفسير",
    description:
      "بتحوّل نتايج SAST و DAST و SCA، ونتايج SARIF المستوردة، لـ findings deterministic ليها درجة ثقة (confidence)، ولقرار إصدار للـ CI بياخد التغطية (coverage) في الحسبان. عبارة عن CLI مفتوح المصدر بـ Go (MIT) بإصدارات موقّعة و SBOMs، وكمان workspace تجاري hosted.",
    resume:
      "مشروع مستقل أنشأته وأنا الـ maintainer بتاعه — منصة لقرارات أمان التطبيقات: findings من SAST/DAST/SCA ليها درجة ثقة (confidence)، وقرارات إصدار بتاخد التغطية (coverage) في الحسبان؛ CLI مفتوح المصدر بـ Go (MIT) بإصدارات موقّعة، وكمان منصة hosted (fendix.dev).",
    techStack: ["Go", "Python", "Semgrep", "Django", "Next.js", "Sigstore cosign"],
    category: "Security",
    engagement: "مستقل",
    role: "منشئ المشروع والـ maintainer",
    github: "https://github.com/Fendix-app/Fendix",
    live: "https://www.fendix.dev",
    caseStudy: "/case-studies/fendix",
    featured: true,
    openSource: {
      license: "MIT",
      status: "53 إصدار من أبريل 2026 لحد دلوقتي",
      highlights: [
        "findings ليها درجة ثقة (confidence) من SAST و DAST و SCA، وكمان من نتايج SARIF 2.1.0 المستوردة من أدوات زي CodeQL و Semgrep و Trivy.",
        "بيقرر يعدّي الإصدار ولا يوقفه على أساس الثقة، مش الخطورة (severity) بس، وكل نقطة في الـ score بتاع أي finding ليها سبب مكتوب.",
        "بياخد التغطية (coverage) في الحسبان: الـ scanner اللي ما اشتغلش بيتسجل skipped أو failed، وعمره ما بيتحسب بالغلط pass نضيف.",
        "Deterministic: مفيش أي موديل machine learning في الاكتشاف، ولا في الـ scoring، ولا في القرارات.",
        "إصدارات موقّعة معاها SBOMs بصيغة CycloneDX و SPDX، و SLSA provenance، ومفيش أي telemetry من الـ CLI.",
      ],
    },
  },
  {
    slug: "qatf",
    title: "Qatf",
    tagline: "فيديوهات طويلة لمقاطع بالطول، والعربي أولًا",
    description:
      "أداة مفتوحة المصدر بتحوّل الفيديو الطويل لمقاطع 9:16 عليها captions كلمة بكلمة لـ Reels و Shorts و TikTok. Whisper بيعمل التفريغ، وموديل لغة ممكن يتبدّل بيختار اللحظات، وكل cut بيتظبط على حدود كلمة حقيقية. والـ captions بالعربي من اليمين للشمال جزء أساسي من الأداة. فيها CLI و service بـ FastAPI وواجهة ويب بـ React، وهي نموذج أولي شغال.",
    techStack: ["Python", "FastAPI", "faster-whisper", "ffmpeg", "React", "TypeScript", "SQLite", "Docker"],
    category: "AI / ML",
    engagement: "مستقل",
    role: "منشئ المشروع والـ maintainer",
    github: "https://github.com/Abdel-RahmanSaied/Qatf",
    caseStudy: "/case-studies/qatf",
    openSource: {
      license: "Apache-2.0",
      status: "نموذج أولي شغال",
      highlights: [
        "Whisper بيعمل التفريغ، وموديل لغة بيختار اللحظات، وكل cut بيتظبط على حدود كلمة حقيقية.",
        "captions كلمة بكلمة للعربي من اليمين للشمال وللإنجليزي كمان، بأربع styles، والتحقق منها على frames بعد الـ render.",
        "أي موديل بإعداد واحد: Anthropic أو OpenAI أو Kimi أو GLM أو OpenRouter، أو Ollama و vLLM شغالين local.",
        "مراجعة قبل الـ render: ممكن تعديل الاختيارات والعناوين والترتيب؛ والـ cuts اللي اتعدّلت بتتظبط تاني على الكلمات.",
        "CLI و HTTP API وواجهة ويب بالإنجليزي والعربي، وكلهم بيشتغلوا بـ docker compose up واحد.",
      ],
    },
  },
  {
    slug: "muri",
    title: "MURI",
    tagline: "منصة لنقل الطلاب",
    description:
      "منصة لنقل الطلاب بنظام الاشتراك، فيها تطبيقات للطالب والسواق والأدمن على backend بـ Django/PostGIS: توزيع المقاعد بـ row locks، وتوليد الرحلات، والتحقق من الرحلات بالـ geofencing، و HyperPay مع مطابقة المدفوعات (reconciliation)، ودفتر حسابات (ledger) للسواقين بنظام القيد المزدوج. قُدت الفريق، وأسست الـ backend والـ delivery pipeline بتاعه.",
    techStack: ["Django", "DRF", "PostgreSQL / PostGIS", "Celery", "Redis", "HyperPay", "Flutter", "Angular"],
    category: "Mobility",
    engagement: "ASAS IT",
    role: "قائد الفريق",
    caseStudy: "/case-studies/muri",
  },
  {
    slug: "hayyak",
    title: "Check-In (Hayyak)",
    tagline: "منصة تسجيل وصول ذاتي (self check-in) لضيوف الفنادق",
    description:
      "الـ backend بتاع تطبيق لضيوف الفنادق، اسمه في الأول كان Hayyak: الضيوف بيربطوا حجزهم اللي على Oracle OPERA بالتطبيق، ويضيفوا المرافقين، ويسجّلوا وصولهم (check-in)، ويمدّوا الإقامة، ويسجّلوا مغادرتهم (check-out)، مع الدفع من جوه التطبيق. فيه data model بيدعم أكتر من فندق، وربط مع OPERA Cloud (OHIP) فيه تسوية الـ folio، و Tap و HyperPay ورا طبقة gateway واحدة، وشات للدعم، و adapter بـ FastAPI لتقارير Shomoos في السعودية.",
    techStack: ["Django", "DRF", "Oracle OPERA (OHIP)", "Tap Payments", "HyperPay", "Celery", "Django Channels", "FastAPI"],
    category: "Hospitality",
    engagement: "فريلانس",
    role: "قائد تقني، Backend",
    caseStudy: "/case-studies/hayyak",
  },
  {
    slug: "maxpeak",
    title: "Maxpeak",
    tagline: "marketplace للتوظيف التقني (قبل الإطلاق)",
    description:
      "marketplace لسه ما اتطلقش، بيربط شركات سعودية بمهندسين من مصر. API بـ Django فيه authentication بـ RS256/JWKS و social sign-in، وكمان مرحلة الفرز الأولى، وهي آلية: pipeline بـ Celery بيطلّع النص من الـ CV ويديله score بـ LLM.",
    techStack: ["Django 5.2", "DRF", "Celery", "Redis", "PostgreSQL", "OpenRouter", "Next.js"],
    category: "Marketplace",
    engagement: "مستقل",
    role: "الـ backend والـ frontend",
    live: "https://www.maxpeak.net/",
    caseStudy: "/case-studies/maxpeak",
  },
];
