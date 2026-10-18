// Arabic (Egyptian) mirror of src/lib/career.ts. Same facts, same order.
// Follow docs/arabic-style-guide.md; update this file in the same commit
// as any change to the English record.
import type { Career } from "@/lib/career";

export const careerAr: Career = {
  name: "عبدالرحمن محمد سعيد",
  headline: "قائد فريق برمجيات | مهندس برمجيات أول متخصص في الـ Backend",
  location: "الرياض، السعودية",
  availability:
    "متاح لفرص كمهندس برمجيات أول، أو مهندس Backend أول، أو قائد تقني، أو Staff Engineer — حضوري في الرياض، أو عن بُعد، أو مع الانتقال لمكان الشغل.",

  summary:
    "قائد فريق برمجيات ومهندس برمجيات أول، عندي خبرة مهنية 6 سنين وأكتر في بناء منصات SaaS وخدمات backend وأنظمة موزّعة بأكتر من stack. بختار اللغة والأدوات حسب المشكلة وقيود التشغيل، وبقود فريق متعدد التخصصات بيوصل لـ 13 مهندس مع استمرار شغلي العملي في الـ architecture ومراجعة الكود والـ delivery والـ production.",

  skills: [
    { label: "Backend", items: ["Python", "Go", "Django", "Django REST Framework", "FastAPI", "Celery", "تصميم REST API", "الـ Authentication والـ RBAC"] },
    { label: "البيانات والـ messaging", items: ["PostgreSQL", "PostGIS", "Redis", "Elasticsearch", "AWS SQS"] },
    { label: "الـ Cloud والـ delivery", items: ["AWS (EC2, RDS, S3, ALB)", "Terraform", "Docker", "Kong API Gateway", "GitHub Actions", "Elastic APM", "Prometheus"] },
    { label: "الممارسات الهندسية", items: ["حدود الـ services", "Async pipelines", "Multi-tenancy", "الربط مع أنظمة طرف تالت وأنظمة الدفع", "مراجعة الكود", "توجيه المهندسين"] },
  ],

  experience: [
    {
      company: "ASAS IT",
      location: "الرياض، السعودية",
      title: "قائد فريق برمجيات | مهندس برمجيات أول متخصص في الـ Backend",
      engagement: "Full-time",
      start: "أغسطس 2024",
      end: "لحد دلوقتي",
      summary:
        "بقود فريق متعدد التخصصات بيوصل لـ 13 مهندس (backend، frontend، mobile، AI، QA)؛ ومسؤول عن الـ architecture ومراجعة الكود والتخطيط والـ delivery على الـ production لـ Twiscope و MURI.",
      highlights: [
        "Twiscope: كنت مطور الـ backend الوحيد لحد أكتوبر 2025، وتولّيت قيادة الفريق من أغسطس 2024 بالتوازي مع دوري في الـ backend، على منصة social intelligence فيها خمس منتجات (Django/DRF، Celery، PostgreSQL، Elasticsearch). بنيت Decision Hub (pipelines بـ Celery chords، و scoring deterministic، و snapshots في Elasticsearch)، ومحرك تنبيهات X، والاشتراكات والـ RBAC، و gateway بـ Kong معاه auth service بـ FastAPI، والـ infrastructure على AWS اللي بتتدار بـ Terraform.",
        "Sanad AI: بقود الفريق اللي بيبني مساعد RAG بالعربي والإنجليزي لـ Twiscope (FastAPI، BGE-M3، BM25 + kNN في Elasticsearch مع reciprocal rank fusion، و index routing بالـ LLM محكوم بـ allow-list)؛ وبنيت فيه بنفسي الـ ingestion pipeline على SQS، والـ deployment workflows، والـ tracing بـ Elastic APM.",
        "MURI: قُدت الفريق اللي كان بيبني منصة لنقل الطلاب (Django/DRF، PostGIS، Celery، HyperPay)؛ وأسست بنفسي الـ backend والـ auth بـ JWT/OTP والـ deployment pipeline، وبنيت فيها الـ geography models على PostGIS والتحقق من الرحلات بالـ geofencing.",
      ],
    },
    {
      company: "ASAS IT",
      location: "الرياض، السعودية",
      title: "مهندس برمجيات أول متخصص في الـ Backend",
      engagement: "Full-time",
      start: "سبتمبر 2023",
      end: "أغسطس 2024",
      summary:
        "بدأت بناء الـ backend بتاع Twiscope وأنا المطور الوحيد فيه: services بـ Django/DRF و pipelines بـ Celery لتحليل الكلمات المفتاحية والحسابات بـ X API v2، وتقارير Instagram و TikTok و Google، والاشتراكات والـ quotas، والـ deployment بالـ containers على AWS.",
      highlights: [],
    },
    {
      company: "Check-In (Hayyak)",
      location: "الرياض، السعودية",
      title: "قائد تقني، Backend",
      engagement: "Freelance",
      start: "أبريل 2024",
      end: "يناير 2026",
      summary:
        "قائد الـ backend والمساهم الأساسي في منصة تسجيل وصول ذاتي (self check-in) لضيوف الفنادق: data model بيدعم أكتر من فندق، وربط مع Oracle OPERA Cloud (OHIP) فيه تسوية الـ folio عند تسجيل المغادرة (check-out)، و Tap Payments و HyperPay ورا طبقة gateway واحدة، وشات للدعم، و adapter بـ FastAPI لتقارير Shomoos في السعودية.",
      highlights: [],
    },
    {
      company: "Prime Consulting Office (PCO)",
      title: "مهندس برمجيات",
      start: "نوفمبر 2022",
      end: "أكتوبر 2023",
      summary:
        "بنيت حلول backend لعملاء الاستشارات، وكنت بحوّل متطلباتهم لـ REST API contracts ومواصفات تقنية.",
      highlights: [],
    },
    {
      company: "ClouDev Solutions",
      location: "مصر",
      title: "مهندس برمجيات Backend",
      engagement: "Full-time",
      start: "سبتمبر 2022",
      end: "يوليو 2023",
      summary: "طورت REST APIs، وعمليات ربط (integrations) في الـ backend، وتحسينات على services شغالة في الـ production.",
      highlights: [],
    },
    {
      company: "Co-Source",
      location: "مصر",
      title: "مهندس برمجيات Desktop",
      engagement: "Full-time",
      start: "أغسطس 2020",
      end: "مايو 2022",
      summary: "طورت تطبيقات desktop بـ Python (PyQt/PySide)، و workflows آلية للتقارير.",
      highlights: [],
    },
  ],

  education: {
    degree: "بكالوريوس علوم الحاسب",
    school: "المعهد التكنولوجي العالي (HTI)",
    location: "مصر",
    year: "2022",
    // U+200E after "A+" keeps the "+" on the right of the A in right-to-left text.
    note: "مشروع التخرج بتقدير A+‎",
  },

  languages: ["العربية (اللغة الأم)", "الإنجليزية (مستوى مهني)"],

  highlights: [
    { value: 6, suffix: "+", label: "سنين في بناء برمجيات للـ production" },
    { value: 13, suffix: "", label: "مهندس في خمس تخصصات تحت قيادتي" },
    { value: 5, suffix: "", label: "منتجات Twiscope على backend واحد" },
    { value: 2, suffix: "", label: "بوابات دفع متربطة (Tap، HyperPay)" },
  ],
};
