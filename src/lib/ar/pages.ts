// Arabic (Egyptian) mirror of src/lib/pages.ts: title, meta description and
// share-card copy per page. `path` is copied unchanged; `og.tags` keep
// technology names in Latin letters and translate only prose tags.
import type { PageCopy, pages } from "@/lib/pages";

export const pagesAr: Record<keyof typeof pages, PageCopy> = {
  about: {
    path: "/about",
    title: "عنّي",
    description:
      "قائد فريق برمجيات ومهندس برمجيات أول في الرياض، السعودية — أنظمة backend وأنظمة موزّعة بأكتر من stack، وقيادة تقنية، وخبرة، وأسلوب شغل.",
    og: {
      eyebrow: "عنّي",
      title: "إزاي ببني وبقود",
      subtitle: "قائد فريق برمجيات | مهندس برمجيات أول متخصص في الـ Backend · الرياض، السعودية",
      tags: ["هندسة برمجيات", "Backend architecture", "أنظمة موزّعة", "Cloud", "قيادة هندسية"],
    },
  },
  portfolio: {
    path: "/portfolio",
    title: "أعمالي",
    description:
      "مشاريع عبدالرحمن سعيد: منتجات Twiscope للـ social intelligence، و Sanad AI، والـ backend بتاع MURI للنقل، ومنصة الضيافة Check-In (Hayyak)، و Fendix، و Qatf.",
    og: {
      eyebrow: "أعمالي",
      title: "أنظمة production ومنتجات",
      subtitle: "Twiscope · Sanad AI · MURI · Check-In (Hayyak) · Fendix · Qatf",
    },
  },
  caseStudies: {
    path: "/case-studies",
    title: "دراسات الحالة",
    description:
      "دراسات حالة هندسية — المشكلة، والقيود، والـ architecture، والقرارات، والمفاضلات، والنتايج — لـ Twiscope و Sanad AI و Fendix و Qatf و MURI و Check-In (Hayyak) و Maxpeak.",
    og: {
      eyebrow: "دراسات الحالة",
      title: "قرارات هندسية ورا شغل اتنفّذ فعلًا",
      subtitle: "المشكلة ← القيود ← الـ architecture ← القرارات ← المفاضلات ← النتايج",
    },
  },
  openSource: {
    path: "/open-source",
    title: "مفتوح المصدر",
    description:
      "مشاريع عبدالرحمن سعيد المفتوحة المصدر: Qatf، أداة معمولة للعربي أولًا بتحوّل الفيديوهات الطويلة لمقاطع بالطول (Apache-2.0)، ومحرك أمان التطبيقات Fendix (MIT). الرخص، والحالة، والمميزات، ودراسات الحالة.",
    og: {
      eyebrow: "مفتوح المصدر",
      title: "كود بنشره ومتاح للكل",
      subtitle: "Qatf (Apache-2.0) · محرك Fendix (MIT)",
      tags: ["Python", "Go", "FastAPI", "Whisper", "ffmpeg"],
    },
  },
  philosophy: {
    path: "/engineering-philosophy",
    title: "فلسفتي الهندسية",
    description:
      "إزاي عبدالرحمن سعيد بيتعامل مع أنظمة backend موثوقة، والـ observability، والـ scaling، والأمان، والأثر على المنتج، والقيادة التقنية العملية (hands-on).",
    og: {
      eyebrow: "فلسفتي الهندسية",
      title: "أنظمة واضحة وموثوقة ومفيدة",
      subtitle: "مبادئ للـ backend architecture والقيادة التقنية العملية (hands-on)",
    },
  },
  blog: {
    path: "/blog",
    title: "المدونة",
    description:
      "مقالات هندسية عن أنظمة الـ backend الموزّعة، والـ observability، والـ caching، والـ ML inference، و Django، و FastAPI، والقيادة التقنية — مكتوبة من واقع الشغل على الـ production.",
    og: {
      eyebrow: "المدونة",
      title: "ملاحظات من شغل الـ backend على الـ production",
      subtitle: "Observability · scaling · caching · geospatial · أدوات الأمان",
    },
  },
  resume: {
    path: "/resume",
    title: "السيرة الذاتية",
    description:
      "السيرة الذاتية لعبدالرحمن سعيد في صفحة واحدة، قائد فريق برمجيات ومهندس برمجيات أول في الرياض — backend architecture، وأنظمة موزّعة، وcloud delivery، وبيانات، وAI، وقيادة تقنية.",
    og: {
      eyebrow: "السيرة الذاتية",
      title: "عبدالرحمن سعيد",
      subtitle: "قائد فريق برمجيات | مهندس برمجيات أول متخصص في الـ Backend",
      tags: ["هندسة برمجيات", "Backend architecture", "أنظمة موزّعة", "Cloud", "قيادة"],
    },
  },
  letsTalk: {
    path: "/lets-talk",
    title: "تواصل معايا",
    description:
      "تواصلوا مع عبدالرحمن سعيد بخصوص فرص مهندس برمجيات أول، أو مهندس Backend أول، أو قائد تقني، أو Staff Engineer — مقيم في الرياض، السعودية.",
    og: {
      eyebrow: "التواصل",
      title: "خلّينا نتكلم",
      subtitle: "مهندس برمجيات أول · قائد تقني · Staff Engineer",
    },
  },
};
