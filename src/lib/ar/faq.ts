// Arabic (Egyptian) mirror of src/lib/faq.ts. Third person, same order,
// same names, dates and numbers as the English answers.
import type { Faq } from "@/lib/faq";

export const faqsAr: Faq[] = [
  {
    q: "مين عبدالرحمن سعيد؟",
    a: "عبدالرحمن محمد سعيد (Abdel-Rahman Mohamed Saied)، واسمه بيتكتب كمان Abdelrahman Saied أو Abdelrahman Saeed، قائد فريق برمجيات ومهندس برمجيات أول في ASAS IT في الرياض بالسعودية، متخصص في الـ backend والأنظمة الموزّعة. بيشتغل بلغات وأدوات مختلفة حسب متطلبات المشروع، وبيقود فريق متعدد التخصصات بيوصل لـ 13 مهندس في الـ backend والـ frontend والـ mobile والـ AI والـ QA.",
  },
  {
    q: "إيه هي Twiscope؟",
    a: "Twiscope منصة بالعربي والإنجليزي للرصد والتحليل الإعلامي ودعم القرار، اتبنت في ASAS IT. الموقع الرسمي بيعرض منتجات للرصد وتحليل الحسابات والمواضيع، وقياس تأثير المؤثرين، وتحليل التقارير بالـ AI، ورصد القنوات، وإدارة الحملات، وأبحاث انطباعات الجمهور، وإدارة حسابات التواصل. دراسة الحالة على الموقع بتركّز على نطاق الـ backend المشترك اللي بناه عبدالرحمن لـ Deep-In، ومتابعة المؤثرين، و Decision Hub، والتنبيهات، والاشتراكات والصلاحيات. كان مطور الـ backend الوحيد من أكتوبر 2023 لحد أكتوبر 2025، وتولّى قيادة الفريق من أغسطس 2024 بالتوازي مع دوره في الـ backend.",
  },
  {
    q: "إيه هو Sanad AI؟",
    a: "Sanad AI مساعد في Twiscope بيستخدم RAG للإجابة عن الأسئلة من تقارير التحليلات. بيجاوب على الأسئلة بالعربي والإنجليزي بـ hybrid retrieval بيجمع بين BM25 في Elasticsearch والـ vector retrieval على embeddings من BGE-M3، والنتايج بتتدمج بـ reciprocal rank fusion، والتحكم في الصلاحيات (access control) بيتطبّق بالكود، مش بموديل اللغة. عبدالرحمن بيقود الفريق، وبنى فيه الـ ingestion pipeline والـ deployment والـ tracing؛ والـ retrieval core بناه زمايله في الفريق.",
  },
  {
    q: "إيه هي Fendix؟",
    a: "Fendix منصة لقرارات أمان التطبيقات، مشروع مستقل أنشأه عبدالرحمن وهو الـ maintainer بتاعه. الـ CLI بتاعها مفتوح المصدر ومكتوب بـ Go (MIT)، وبيحوّل نتايج SAST و DAST و SCA ونتايج SARIF المستوردة لـ findings بتتقيّم بقواعد ثابتة (deterministic)، وليها درجة ثقة (confidence)؛ وفيه workspace مُستضاف بيضيف قرارات إصدار بتاخد التغطية (coverage) في الحسبان (PASS أو WARN أو BLOCK أو INCOMPLETE). التفاصيل على fendix.dev.",
  },
  {
    q: "إيه هي MURI؟",
    a: "MURI منصة لنقل الطلاب بنظام الاشتراك، اتبنت في ASAS IT، وفيها تطبيقات للطالب والسواق والأدمن على backend بـ Django/PostGIS. عبدالرحمن قاد الفريق: أسس الـ backend والـ authentication والـ deployment pipeline، وبنى نماذج البيانات الجغرافية على PostGIS وآليات التحقق من الرحلات بالـ geofencing؛ وأغلب مميزات المنصة بناها زمايله في الفريق.",
  },
  {
    q: "إيه هي Check-In (Hayyak)؟",
    a: "Check-In، اللي كان اسمها في الأول Hayyak، منصة تسجيل وصول ذاتي (self check-in) لضيوف الفنادق، مربوطة بـ Oracle OPERA Cloud. عبدالرحمن قاد الـ backend بتاعها المبني بـ Django بنظام الفريلانس من أبريل 2024 لحد يناير 2026: data model بيدعم أكتر من فندق، وربط مع OPERA (OHIP) فيه تسوية الـ folio عند تسجيل المغادرة (check-out)، و Tap Payments و HyperPay، و adapter لتقارير Shomoos.",
  },
  {
    q: "إزاي أتواصل مع عبدالرحمن سعيد؟",
    a: "بالإيميل على abdelrahmansaied080@gmail.com، أو من صفحة التواصل على www.asaied.dev/ar/lets-talk، أو على LinkedIn و GitHub (Abdel-RahmanSaied).",
  },
];
