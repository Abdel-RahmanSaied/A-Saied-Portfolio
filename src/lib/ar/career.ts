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
    "قائد فريق برمجيات ومهندس برمجيات أول بخبرة أكتر من 6 سنين في بناء منصات SaaS وأنظمة backend موزّعة. بنيت وبُدير مباشرةً فريق بيوصل لـ 13 مهندس، ومسؤول عن التوظيف وتقييم الأداء والتسليم. بحدد الأولويات الهندسية مع الـ CEO، وبشارك بنفسي في التصميم والكود والتشغيل، وبختار الأدوات حسب المشكلة.",

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
        "بُدير مباشرةً فريق بيوصل لـ 13 مهندس في الـ backend والـ frontend والـ mobile والـ AI والـ QA. مسؤول عن التوظيف وتقييم الأداء والترقيات والتخطيط وتسليم Twiscope و MURI، بجانب تصميم الأنظمة ومراجعة الكود.",
      highlights: [
        "Twiscope: بنيت الـ backend من البداية، وقُدت تحسينات خفّضت وقت جمع وتحليل حوالي 100 ألف منشور من أكتر من 5 ساعات لحوالي 3 دقايق على نفس الموارد، حسب سجلات الإنتاج لعمليتين متقاربتين. التحسن شمل مسار المعالجة والـ caching.",
        "Sanad AI: قُدت تصميم مساعد RAG بالعربي والإنجليزي مع مهندسي الـ AI، وبنيت بنفسي مسار تجهيز التقارير على SQS، وربط الخدمات، والنشر والتتبّع.",
        "النشر: صمّمت وشغّلت GitHub Actions باستخدام self-hosted runners؛ نشر Twiscope للإنتاج مشروط بنجاح فحوصات SAST/SCA لنفس الـ commit اللي هينزل.",
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
        "قُدت شغل الـ backend وكنت المساهم الأساسي في منصة تسجيل وصول ذاتي (self check-in) لضيوف الفنادق: data model بيدعم أكتر من فندق، وربط مع Oracle OPERA Cloud (OHIP) فيه تسوية الـ folio عند تسجيل المغادرة (check-out)، و Tap Payments و HyperPay ورا طبقة gateway واحدة، وشات للدعم، و adapter بـ FastAPI لتقارير Shomoos في السعودية.",
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
      summary: "طورت تطبيقات desktop بـ Python (PyQt/PySide)، وأدوات لإعداد التقارير تلقائيًا.",
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
    { value: 13, suffix: "", label: "مهندس في خمسة تخصصات في الفريق اللي بقوده" },
    { value: 2, suffix: " سنة", label: "كمطور الـ backend الوحيد في Twiscope" },
    { value: 2, suffix: "", label: "بوابات دفع اشتغلت على ربطها (Tap، HyperPay)" },
  ],
};
