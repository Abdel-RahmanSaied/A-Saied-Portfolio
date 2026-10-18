import type { CaseStudy } from "@/lib/case-study-types";

// Egyptian Arabic translation of the fendix and qatf case studies.
// Mirrors src/lib/case-studies.ts; see docs/arabic-style-guide.md.
// When the English changes, change this file in the same commit.
//
// "‎" (left-to-right mark) sits before "@Dabash99" and ".deb" only, so the
// leading "@" or "." stays attached to its word in right-to-left text.

const fendix: CaseStudy = {
  slug: "fendix",
  title: "Fendix",
  kicker: "منصة قرارات لأمان التطبيقات",
  headline: "Fendix: قرارات إصدار مبنية على أدلة أمنية",
  summary:
    "أداة CLI مفتوحة المصدر مكتوبة بـ Go، ومعاها منصة hosted، بيحوّلوا نتايج SAST و DAST و SCA ونتايج SARIF المستوردة لـ findings ليها درجة ثقة (confidence)، ولقرار إصدار بياخد التغطية (coverage) في اعتباره. أنا اللي عملت Fendix، وبتابع صيانته لوحدي.",
  readTime: "قراءة 10 دقايق",
  role: "منشئ المشروع والـ maintainer الوحيد · مستقل · مارس 2026 – لحد دلوقتي",
  links: [
    { label: "fendix.dev", href: "https://www.fendix.dev" },
    { label: "الكود (MIT)", href: "https://github.com/Fendix-app/Fendix" },
  ],
  tags: ["Go", "Python", "Semgrep", "SARIF", "Sigstore cosign", "Django", "Next.js"],
  facts: [
    { value: "85", label: "فحص في كتالوج v3.6.3" },
    { value: "18", label: "تصنيف للـ findings" },
    { value: "53", label: "إصدار من أبريل 2026 لحد دلوقتي" },
    { value: "MIT", label: "محرك مفتوح المصدر" },
  ],
  problem: [
    "أغلب بوابات الأمان في الـ CI بتوقّف الـ build على أساس الخطورة (severity) بس. الـ findings اللي مش مؤكدة بتوقّف الإصدارات، والفرق بتتعود تعمل override للبوابة، والمشاكل الحقيقية بتضيع وسط الـ noise.",
    "المشكلة العكسية أهدى من كده: الـ scanner اللي ما اشتغلش — أداة مش موجودة، أو إعدادات غلط، أو target مش بيتوصل له — مش بيطلّع أي findings، وشكله بالضبط زي فحص عدّى نضيف. والفريق محتاج يعرف الإصدار بيحقق مستوى الأمان المطلوب ولا لأ، وليه، وهل الأدلة كاملة.",
  ],
  constraints: [
    "يشتغل جوه الـ CI في دقايق، من غير ما يعتمد على أي خدمة hosted في النسخة مفتوحة المصدر.",
    "يكون deterministic وقابل للتفسير: مفيش أي موديل machine learning لا في الـ detection ولا في حساب الدرجات ولا في القرارات.",
    "عمره ما يخبّي findings — كل ملاحظة بتفضل في التقرير؛ الحاجة الوحيدة اللي ممكن تتغير هي هل بتعمل block ولا لأ.",
    "يشتغل مع الأدوات اللي الفرق بتشغّلها أصلًا، عن طريق استيراد وتصدير SARIF 2.1.0.",
    "توزيع موثوق: artifacts موقّعة، و SBOMs منشورة، ومفيش أي telemetry من الـ CLI.",
  ],
  architecture: {
    intro:
      "فيه orchestrator مكتوب بـ Go بيشغّل الـ analyzers بتاعته، وبيدير Semgrep و sidecar بـ Python بيعمل taint analysis، وبيستورد SARIF، وبعدين بيدّي كل finding درجة ويقرر هل يعمل block ولا لأ. والـ hosted workspace بيضيف قواعد للتغطية (coverage) وقرار إصدار واحد لكل scan.",
    layers: [
      {
        name: "مصادر الأدلة",
        nodes: [
          {
            label: "الـ API وهو شغال (DAST)",
            detail: "15 فحص HTTP مدمج: فحوصات passive، وفحوصات بـ authentication، و IDOR بمستخدمين اتنين، و active probes بالاختيار (opt-in).",
          },
          {
            label: "الكود والـ specs (SAST)",
            detail: "الـ secrets (18 قاعدة)، و textscan (29 قاعدة)، و Semgrep (23 قاعدة لـ Python)، و taint analysis على الـ AST بتاع Python، وفحوصات OpenAPI.",
          },
          {
            label: "الـ dependencies (SCA)",
            detail: "البحث في OSV لملفات الـ manifest بتاعة pip و npm، و govulncheck للـ Go modules.",
          },
          { label: "SARIF مستورد", detail: "نتايج من CodeQL أو Semgrep أو Trivy أو أي أداة SARIF 2.1.0." },
        ],
      },
      {
        name: "محرك الأدلة",
        nodes: [
          {
            label: "الربط (correlation)",
            detail: "الـ findings الـ static والـ runtime بتندمج لما تصنيفاتها تكون مرتبطة وأماكنها تتطابق: الـ route pattern، والـ endpoint، والـ path suffix، وبعدين الـ segment المشترك.",
          },
          {
            label: "درجة الثقة",
            detail: "درجة deterministic من 0 لـ 100، ولكل قاعدة اتطبقت سبب واحد منشور؛ HIGH ≥ 70 و MEDIUM ≥ 40.",
          },
          { label: "التغطية (coverage)", detail: "كل analyzer بيسجّل ok أو skipped أو failed، مع كود للسبب (reason code)." },
        ],
      },
      {
        name: "القرارات",
        nodes: [
          {
            label: "بوابة الـ CLI",
            detail: "كل finding بيبقى BLOCK أو WARN أو INFO؛ والـ exit code بيبقى 0، أو 1 (blocking)، أو 2 (خطأ، أو فجوة في التغطية مع تفعيل الـ enforcement).",
          },
          {
            label: "قرار الإصدار في النسخة الـ hosted",
            detail: "قرار واحد لكل scan: BLOCK، أو INCOMPLETE (أدلة مطلوبة ناقصة)، أو WARN، أو PASS — ومعاه الأسباب.",
          },
        ],
      },
      {
        name: "التسليم",
        nodes: [
          {
            label: "GitHub Action",
            detail: "بيتحقق من الإصدار الموقّع قبل ما يشتغل، وبيرفع SARIF على الـ code scanning، وبيعدّي أو يوقّف على حسب الـ exit code.",
          },
          {
            label: "الـ hosted workspace",
            detail: "الـ backend بـ Django و Celery و PostgreSQL؛ والـ frontend بـ Next.js بالإنجليزي والعربي.",
          },
          { label: "الربط مع أدوات تانية", detail: "الـ issues على Jira، وإشعارات Slack و Teams، والـ GitHub checks." },
        ],
      },
    ],
  },
  decisions: [
    {
      title: "البوابة على أساس الثقة، مش الخطورة (v2.0)",
      body: "الـ finding اللي عند الـ threshold بتاع الـ flag --fail-on أو فوقه ما بيعملش block إلا لو مستوى الثقة بتاعه (confidence band) والأدلة اللي بتدعمه يبرّروا ده؛ وغير كده بيظهر في التقرير كـ WARN. ده كان breaking change، عشان كده الـ flag --enforce-confidence=false بيرجّع السلوك القديم اللي بيعتمد على الخطورة (severity) بس، بالضبط زي ما كان، ومتثبّت باختبار بيغطي 54 تركيبة من الخطورة والـ threshold.",
    },
    {
      title: "الربط إشارة، مش هو البوابة",
      body: "لما finding من التحليل الـ static و finding من الـ runtime يوصفوا نفس المشكلة على نفس الـ route، بيندمجوا في finding واحد مترابط (correlated) وثقته بتزيد. والربط (correlation) ده إشارة واحدة من سبع إشارات مستقلة. الدليل القوي اللي جاي من مصدر واحد — response حي بيبيّن المشكلة، أو credential حقيقي في كود الـ production — ممكن يعمل block لوحده، والربط عمره ما بيشيل findings.",
    },
    {
      title: "كل نقطة في الدرجة ليها سبب",
      body: "الثقة بتبدأ من قيمة أساسية، وكل قاعدة بتزوّد أو بتنقّص مقدار ثابت ومعاه سبب مكتوب بكلام بسيط. والاختبارات بتضمن إن مجموع الأسباب يساوي الدرجة، فأي حد يقدر يشوف الـ finding عمل block ليه.",
    },
    {
      title: "التغطية نتيجة أساسية في حد ذاتها",
      body: "الـ scanner اللي ما اشتغلش بيتسجّل skipped أو failed، وعمره ما بيختفي في صمت. في الـ hosted workspace، لو فيه أدلة مطلوبة ناقصة، النتيجة بتبقى INCOMPLETE مش PASS؛ وفي الـ CLI، فيه flags بالاختيار (opt-in) بتحوّل فجوات التغطية لـ exit code بيدل على فشل.",
    },
    {
      title: "النتايج المستوردة مينفعش تشهد لنفسها",
      body: "الـ SARIF اللي جاي من أدوات تانية بيفضل بره الربط (correlation) بتاع Fendix نفسه. ومينفعش يأكد finding طالع من Fendix إلا لو أداة مستقلة طلّعت نفس الـ CWE في نفس المكان بعد الـ normalisation.",
    },
    {
      title: "سلسلة توريد ممكن التحقق منها",
      body: "الـ binaries، وحزم Linux، والـ SBOMs، والـ container images كلها موقّعة بالـ keyless signing بتاع cosign؛ وكل binary بينزل معاه SBOMs بصيغة CycloneDX و SPDX، و provenance statement حسب SLSA v1.0 (Level 2). والـ GitHub Action بيتحقق من سجل الـ build الموقّع قبل ما يشتغل.",
    },
  ],
  tradeoffs: [
    {
      choice: "فشل الـ build بيتحدد بالثقة",
      cost: "فيه builds كانت بتفشل وممكن دلوقتي تعدّي؛ والفرق اللي عايزة السلوك القديم لازم تعمل opt-out بشكل صريح، والقرارات دي بيتحط عليها علامة إنها policy overrides.",
    },
    {
      choice: "binary بـ Go ومعاه sidecar بـ Python",
      cost: "أعمق تحليل (الـ taint بتاع Python) محتاج شجرة ملفات الـ Python engine أو الـ container الرسمي؛ والـ binary لما يشتغل لوحده بيسجّله unavailable.",
    },
    {
      choice: "عمق مش متساوي بين اللغات",
      cost: "في Python، الـ taint analysis بيشتغل بين الـ functions (interprocedural) وبياخد الـ sanitizers في اعتباره؛ لكن Go و JavaScript/TypeScript و Java بيعتمدوا على pattern rules على مستوى السطر الواحد.",
    },
    {
      choice: "قواعد deterministic بدل موديلات متدرّبة",
      cost: "قرارات ممكن تفسيرها بالكامل، بس الـ detection محدود بالقواعد الموجودة.",
    },
    {
      choice: "Linux و macOS بس",
      cost: "الإصدارات معمولة لـ linux و darwin على amd64 و arm64، وكمان container multi-arch؛ ومفيش build لـ Windows.",
    },
  ],
  outcomes: [
    {
      title: "البوابة المبنية على الأدلة نزلت",
      body: "القرارات بتتحدد بالثقة من v2.0 (أغسطس 2026)، ومعاها fingerprints ثابتة للـ findings من v3.0، و suppression على مستوى كل occurrence من v3.6.",
    },
    {
      title: "إصدارات ممكن التحقق منها",
      body: "53 إصدار من أبريل 2026 لحد دلوقتي؛ والإصدارات الحالية موقّعة وبينزل معاها SBOMs و provenance. واتحققت بـ cosign من توقيعات الـ binary والـ container بتوع v3.6.3.",
    },
    {
      title: "benchmarks منشورة، ومعاها تحفّظاتها",
      body: "مجموعات اختبار (corpora) عليها gate في الـ CI (زي corpus صناعي لـ SAST فيه 56 حالة)، وحدودها مكتوبة: بتقيس القواعد على حالات متنقّية بعناية، مش نسبة الـ detection في الواقع.",
    },
    {
      title: "مفتوح المصدر، ومعاه نسخة hosted",
      body: "المحرك اللي برخصة MIT بيشتغل في أي CI؛ والـ hosted workspace بيضيف organisations، و roles، و MFA، و audit log، وقرارات الإصدار.",
    },
  ],
  myRole: [
    "عملت Fendix ولسه أنا الـ maintainer الوحيد ليه: محرك Go والـ analyzers بتوع Python، والـ backend والـ frontend بتوع النسخة الـ hosted، والـ release pipeline، والتوثيق.",
    "صممت نموذج الأدلة: قواعد الربط (correlation)، وحساب درجة الثقة، وتتبّع التغطية، والطبقتين بتوع القرارات.",
    "بنيت الـ pipeline بتاع الإصدارات الموقّعة والـ packaging (الـ binaries، وحزم ‎.deb/.rpm، والـ container images، والـ SBOMs، والـ provenance، والـ Homebrew tap).",
  ],
  scopeNotes: [
    "تأثير الربط (correlation) على الـ false positives ما اتقاسش؛ وهو متوصّف هنا على إنه آلية. نسخة أقدم من الموقع ده كانت بتدّعي إن فيه تقليل متقاس، وكانت بتوصف بوابة أشد من اللي نزلت فعلًا؛ والادعاءين دول اتشالوا.",
    "الـ Managed CI وسجلات القرارات اللي بتكشف أي تلاعب (tamper-evident) متاحين بشكل محدود؛ والـ demo workspace العام بيستخدم بيانات تجريبية.",
    "Fendix مش حاصل على أي شهادة أمان من طرف تالت، ومش بدّعي أي أرقام عملاء أو انتشار.",
    "الـ flag --offline لسه مش hermetic بالكامل لما فحص الـ dependencies بتاع Python بيشتغل؛ والـ README موثّق فيه الـ workaround.",
  ],
  next: "qatf",
};

const qatf: CaseStudy = {
  slug: "qatf",
  title: "Qatf",
  kicker: "أداة فيديو مفتوحة المصدر",
  headline: "Qatf: من فيديوهات طويلة لمقاطع بالطول، والعربي معمول صح",
  summary:
    "أداة مفتوحة المصدر (Apache-2.0) بتحوّل الفيديو الطويل لمقاطع 9:16 عليها captions كلمة بكلمة. موديل لغوي هو اللي بيختار اللحظات؛ لكن التفريغ وضبط حدود القص والـ rendering بيفضلوا deterministic، والـ captions بالعربي من اليمين للشمال جزء أساسي من الأداة. أنا اللي عملتها وبتابع صيانتها؛ وهي نموذج أولي شغال.",
  readTime: "قراءة 8 دقايق",
  role: "منشئ المشروع والـ maintainer · مستقل، مفتوح المصدر · أغسطس 2026 – لحد دلوقتي",
  links: [{ label: "الكود (Apache-2.0)", href: "https://github.com/Abdel-RahmanSaied/Qatf" }],
  tags: ["Python", "FastAPI", "faster-whisper", "ffmpeg", "libass", "SQLite", "React", "TypeScript", "Docker"],
  facts: [
    { value: "5", label: "مراحل في الـ pipeline" },
    { value: "8", label: "presets للموديلات" },
    { value: "4", label: "أشكال للـ captions كلمة بكلمة" },
    { value: "Apache-2.0", label: "رخصة مفتوحة المصدر" },
  ],
  problem: [
    "تقطيع محاضرة طويلة لمقاطع Reels و Shorts و TikTok باليد شغل بطيء، والأدوات اللي بتعمل ده أوتوماتيك معمولة على مقاس الإنجليزي. مع العربي، التفريغ ممكن يسمع المصطلحات التقنية غلط، والـ captions من اليمين للشمال ممكن تطلع بترتيب كلمات غلط.",
    "واختيار المقاطع بموديل لغوي بيعمل مشكلة تانية: الموديلات شاطرة في إنها تلاقي الأجزاء اللي تشد الانتباه، ومش كويسة في التوقيت، فالمقاطع بتبدأ أو بتخلص في نص كلمة.",
  ],
  constraints: [
    "العربي والـ captions من اليمين للشمال لازم يشتغلوا كويس زي الإنجليزي، والتحقق منهم يكون على frames متعملها render فعلًا، مش بالافتراض.",
    "الموديل مسموح له يختار الأجزاء ويقترح توقيتها، لكن الكود هو اللي بيحدد مكان القص النهائي على حدود كلمة حقيقية من الصوت.",
    "تغيير الـ provider بتاع الموديل، سواء hosted أو local، لازم ما يحتاجش أي تغيير في الكود، وما يأثرش على دقة القص.",
    "أمر واحد للتشغيل على لابتوب أو على جهاز فيه GPU؛ الـ GPU بيسرّع الشغل بس مش شرط.",
    "كل إعداد افتراضي لازم يكون وراه قياس متسجّل، وده يشمل الاختيارات اللي اتجربت واترفضت.",
  ],
  architecture: {
    intro:
      "خمس مراحل ورا job model واحد. Whisper بيحوّل الكلام لكلمات بتوقيتاتها، واستدعاء واحد للموديل بيختار الأجزاء، وكل حاجة تخص مكان القص deterministic. ونفس الـ pipeline بيشتغل ورا CLI، و service بـ FastAPI، وواجهة ويب بـ React.",
    layers: [
      {
        name: "المدخلات",
        nodes: [
          { label: "رفع ملف", detail: "رفع multipart، والحد الافتراضي 2 GB." },
          { label: "مسار على السيرفر", detail: "محصور جوه media root، فمفيش request يقدر يحدد ملف عشوائي." },
          { label: "لينك YouTube", detail: "بيتنزّل بـ yt-dlp، والـ host لازم يطابق allowlist بالضبط." },
        ],
      },
      {
        name: "الـ pipeline",
        nodes: [
          { label: "الصوت", detail: "فصل الصوت بـ ffmpeg (demux)، و denoising اختياري." },
          {
            label: "التفريغ",
            detail: "faster-whisper large-v3 على الـ GPU لو ينفع يتستخدم، أو الـ caption track بتاع الفيديو نفسه.",
          },
          { label: "الاختيار", detail: "الاستدعاء الوحيد للموديل: أنهي أجزاء، بدقة MM:SS." },
          { label: "الضبط على الكلمات", detail: "كل حد من حدود المقطع بيتنقل على كلمة حقيقية؛ وده deterministic." },
          {
            label: "الـ render",
            detail: "ضبط الكادر على 9:16، و captions كلمة بكلمة مدموجة في الفيديو (burned-in)، بـ H.265 أو H.264.",
          },
        ],
      },
      {
        name: "الواجهات",
        nodes: [
          { label: "CLI", detail: "مرحلة التخطيط بس، وبعدها تعديل plan.json، وبعدين render للخطة دي بالضبط." },
          { label: "HTTP API", detail: "مبني على FastAPI؛ كل طلب start بيرجّع 202 و job id، والـ client بيعمل polling." },
          { label: "واجهة الويب", detail: "React و Vite، بالإنجليزي والعربي مع layout معكوس (mirrored)." },
        ],
      },
      {
        name: "الحالة",
        nodes: [
          {
            label: "SQLite (WAL)",
            detail: "سجلات الـ jobs، وتصحيحات الكلمات، و cache للتفريغ الـ key بتاعه مكوّن من الموديل واللغة وقائمة المصطلحات.",
          },
        ],
      },
    ],
    notes: [
      "الـ imports ماشية في اتجاه واحد: core ← llm ← pipeline ← jobs ← api. وفيه smoke test بيقرا كود الـ core package، ويفشل لو لقى أي import راجع لفوق.",
      "المراحل 1 و 4 و 5 عمرها ما بتستدعي أي موديل، فتغيير الـ provider ما يقدرش يغيّر مكان القص ولا شكل الـ render بتاع المقطع.",
    ],
  },
  features: [
    {
      group: "إدخال الفيديو",
      items: [
        "رفع ملف (الحد الافتراضي 2 GB)، أو تحديد ملف موجود أصلًا على السيرفر، أو لصق لينك YouTube.",
        "المقبول بس youtube.com و m.youtube.com و music.youtube.com و youtu.be؛ وأي حاجة غير كده بتترفض.",
      ],
    },
    {
      group: "من الكلام لكلمات",
      items: [
        "Whisper من tiny لحد large-v3، على الـ GPU لو فيه واحد ينفع يتستخدم، أو بالإجبار على CUDA أو CPU. والجهاز اللي بيتحدد بالاسم عمره ما بيتحوّل لغيره في صمت.",
        "اللغة بتتحدد يدوي أو بتتكشف أوتوماتيك؛ ولو المصدر لينك YouTube، الـ caption track بتاع الفيديو نفسه ممكن ياخد مكان Whisper لو فيه توقيت لكل كلمة.",
        "للعربي: قائمة مصطلحات تكتبوا بيها الأسماء والمصطلحات بالشكل المطلوب، و denoising للصوت اللي فيه ضوضاء، و fix-ups بتصحّح إملاء الكلمة في كل مكان.",
        "بعد كده ممكن تصحيح أي كلمة باليد، أو قبول اقتراحات الموديل واحد واحد. التعديل بيغيّر نص الـ captions بس، ونقطة القص بتفضل زي ما هي.",
      ],
    },
    {
      group: "اختيار اللحظات",
      items: [
        "تحديد عدد المقاطع (5 افتراضيًا) والطول المسموح لكل مقطع (من 30 لـ 75 ثانية؛ و 52 ثانية هي القيمة الافتراضية المتحفّظة للمقاطع القصيرة).",
        "المقطع اللي طوله بره المدى المطلوب بيفضل موجود وعليه علامة، وعمره ما بيتشال في صمت.",
        "أي provider، والـ thinking شغال أو مقفول. وممكن الشغل يقف قبل الـ render عشان تتعدّل البدايات والنهايات والعناوين والترتيب؛ ونقط القص المتعدّلة بترجع تتظبط على الكلمات.",
      ],
    },
    {
      group: "الـ captions",
      items: [
        "أربع أشكال كلمة بكلمة (box و pill و marker و youtube) بتنوّر فيها الكلمة اللي بتتقال، في العربي من اليمين للشمال زي الإنجليزي.",
        "بديل (fallback) بيعرض سطر واحد في المرة، أو من غير captions خالص؛ والخط وعدد الكلمات في السطر ممكن يتظبطوا.",
        "الـ captions بتقع على حوالي 70% من ارتفاع الكادر من فوق، فوق المكان اللي TikTok و Shorts بيحطوا فيه الأزرار بتاعتهم.",
      ],
    },
    {
      group: "الفيديو",
      items: [
        "قص جزء 9:16، أو وضع الـ blur: الكادر كله فوق خلفية معمول لها blur، أو تتبّع أكبر وجه.",
        "دقة 1080p أو 1440p أو 4K أو أي مقاس، أو دقة المصدر نفسها؛ و H.265 بالـ tag بتاع أجهزة Apple، أو H.264.",
        "الـ encode preset، والجودة (CRF 20 افتراضيًا)، وإخراج 10-bit لما المصدر يكون 10-bit.",
      ],
    },
    {
      group: "وهو شغال، وبعد ما يخلص",
      items: [
        "نسبة التقدّم لحظة بلحظة للتحميل والـ render، متقاسة من ffmpeg مش متخمّنة، ومعاها زرار إلغاء.",
        "تحميل المقاطع واحد واحد أو كلهم مرة واحدة؛ وإعادة الـ render بإعدادات جديدة من غير تفريغ تاني.",
        "فيه health check بيعرض حالة ffmpeg، والـ provider الشغال، والـ credential بتاعه، وهل التفريغ هيلاقي GPU ولا لأ، قبل ما الـ job يبدأ.",
        "الـ provider والموديل والـ thinking ممكن يتغيروا من صفحة الإعدادات (Settings) من غير restart.",
      ],
    },
  ],
  decisions: [
    {
      title: "الموديل بيقترح اللحظة، والكود بيضبط مكان القص",
      body: "المرحلة 3 بتقرا التفريغ في أجزاء مدتها حوالي 12 ثانية، وبتقترح البداية والنهاية بصيغة MM:SS. المرحلة 4 بتاخد الاقتراح ده وتحرّك كل حد على توقيت كلمة حقيقية من Whisper. اختيار اللحظة جاي من الموديل، لكن مكان القص النهائي جاي من الصوت؛ عشان كده تغيير الـ provider ممكن يغيّر المقطع المختار، لكنه مش هيخلّيه يبدأ في نص كلمة.",
    },
    {
      title: "التحقق من الـ captions بالعربي على frames طالعة من الـ render",
      body: "سلوك في الـ bidi بتاع libass كان بيلخبط ترتيب الكلمات العربي كل ما الكلمة اللي عليها الـ highlight يتغير الـ style بتاعها، والاختبارات البديهية كلها عدّت. الحل إن كل كلمة بقى ليها caption cue خاص بيها. وفيه render check بيمشّي الـ highlight على طول السطر، ويعمل render لـ frame واحد عند كل موضع، ويتأكد إنه بيتحرك من اليمين للشمال؛ وأشكال الـ captions نفسها اتختارت من renders حقيقية لفيديو عربي.",
    },
    {
      title: "تعديل النص عمره ما يحرّك نقطة قص",
      body: "محرر التفريغ بيغيّر الكلمات بس، وأي حدود بتتعدّل باليد بترجع تتظبط على توقيتات الكلمات. عشان كده تصحيح إملائي بعد الـ render بيعيد مرحلة الـ render بس.",
    },
    {
      title: "كل إعداد افتراضي وراه رقم",
      body: "الـ crop هو الـ framing الافتراضي عشان بيحتفظ بحوالي تلات أضعاف الـ pixels بتاعة الـ subject مقارنة بالـ blur، وكان الـ render بيه أسرع 1.8× في الاختبار المتسجّل؛ والـ encode preset والـ codec وعوامل ضبط التفريغ، كل واحد فيهم وراه قياس، والاختيارات اللي اتجربت واترفضت مكتوبة هي كمان.",
    },
    {
      title: "فحوصات ممكن تفشل",
      body: "كل render fixture بيعمل render لحالة control ويتأكد إن الـ control ده بيفشل، والـ load test بتاع الـ API بيعمل assert مش مجرد report. والـ load test ده لقى إن الـ health check كان بيشغّل process لـ ffmpeg مع كل request، ودي حاجة مفيش اختبار sequential كان يقدر يشوفها.",
    },
  ],
  tradeoffs: [
    {
      choice: "الموديل بيختار، والكود بيقص",
      cost: "الضبط على الكلمات ممكن يزوّد كام ثانية في المقطع، فطلب 60 ثانية ممكن يطلّع 63 ثانية. عشان كده القيمة الافتراضية 52 ثانية، بهامش متحفّظ للمقاطع القصيرة؛ وهي اختيار في المنتج، مش حد من YouTube Shorts.",
    },
    {
      choice: "تتبّع أكبر وجه",
      cost: "لسه مفيش موديل بيحدد مين اللي بيتكلم (active speaker)، فلقطة فيها شخصين ممكن الكادر يتظبط فيها على اللي بيسمع، وثوابت التتبّع قيم مبدئية ما اتقاستش.",
    },
    {
      choice: "job queue جوه نفس الـ process، على SQLite",
      cost: "أمر واحد للتشغيل، بس الـ jobs بتضيع مع أي restart، والإلغاء ما بيتنفذش غير بين الخطوات.",
    },
    {
      choice: "مفيش authentication مدمج",
      cost: "الـ API لازم يتحط ورا حاجة تانية قبل ما أي port يتفتح لبره.",
    },
    {
      choice: "الـ GPU محجوز افتراضيًا في Docker",
      cost: "تفريغ سريع على جهاز فيه GPU؛ ومن غيره، ملف الـ compose محتاج تعديل بسيط، و large-v3 بيشتغل ببطء على الـ CPU.",
    },
  ],
  outcomes: [
    {
      title: "التحقق من الأول للآخر",
      body: "فيديو عربي مدته 12 دقيقة، 4K ProRes، متصوّر جوه عربية ماشية، عدّى على المراحل الخمسة كلها مع provider حقيقي، وطلّع 8 مقاطع بالطول عليها captions بالعربي مدموجة في الفيديو — مرة عن طريق الـ CLI على GPU، ومرة تانية لوحدها عن طريق الـ HTTP API.",
    },
    {
      title: "التفريغ العربي: من 23 غلطة لـ 3",
      body: "على التسجيل ده، أخطاء التفريغ المتتبَّعة نزلت من 23 لـ 3 بقائمة مصطلحات فيها 30 مصطلح، و denoising، و fix-ups، زي ما هو متسجّل في ملاحظات الجودة في الـ repository.",
    },
    {
      title: "متختبر من غير GPU",
      body: "الـ CI بيشغّل الـ suites بتاعة قاعدة البيانات والـ pipeline والـ provider والـ API على Python 3.10 و 3.12، و load test بـ 24 thread، واختبارات الـ frontend والـ type check، و render check حقيقي بـ ffmpeg، والـ Docker build.",
    },
    {
      title: "مفتوح للمساهمين",
      body: "رخصة Apache-2.0 مع DCO sign-off، ودليل للمساهمة مترتّب حسب القيمة مقابل المجهود. وأول مساهمة من بره، وهي إعادة تصميم لكل الشاشات بواجهة عربي، اتعملها merge.",
    },
  ],
  myRole: [
    "عملت Qatf وبتابع صيانته: الـ pipeline، وطبقة الـ provider، ونظام الـ jobs، والـ HTTP API، والـ CLI، وأول نسخة من واجهة الويب، والتوثيق — 117 commit من أصل 119.",
    "عملت القياسات اللي ورا الإعدادات الافتراضية: عوامل ضبط التفريغ على العربي، وأوضاع الـ framing، والـ codecs والـ encode presets، والـ API تحت ضغط متزامن (concurrent load).",
    "راجعت وعملت merge لتصميم الواجهة الحالي، بما فيه الواجهة العربي والـ layout من اليمين للشمال؛ والتصميم ده مساهمة من ‎@Dabash99 (PR #4).",
  ],
  scopeNotes: [
    "نموذج أولي شغال، مش production: الـ API مفيهوش أي authentication، والـ jobs بتضيع مع أي restart، والإلغاء ما يقدرش يقطع call لـ ffmpeg أو Whisper شغال بالفعل.",
    "مفيش غير OpenRouter اللي اتشغّل على الـ endpoint الحقيقي بتاعه؛ الـ providers التانيين متختبرين على الـ requests اللي Qatf بيبعتها، مش على ردود حقيقية.",
    "دقة توقيت الكلمات في Whisper على العربي ما اتقاستش، مع إن نقط القص والـ highlight بتاع الـ captions الاتنين معتمدين عليها.",
    "فحص الـ captions من اليمين للشمال بيشتغل في البيئة اللي الخط بيكون متاح فيها؛ وعلى الـ CI runner الحالي الخط مش متاح، فالـ CI بيعمل skip للفحص ده بدل ما يفشل.",
    "لسه مفيش loudness normalisation، ولا قص لفترات السكوت، ولا اكتشاف لتغيير المشهد؛ ومفيش أي ادعاء بأرقام استخدام أو انتشار.",
  ],
  next: "hayyak",
};

export const caseStudiesPart2: CaseStudy[] = [fendix, qatf];
