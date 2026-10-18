import type { Post } from "@/lib/posts";

// Invisible left-to-right marks (U+200E) sit before ".NET", the --fail-on and
// --enforce-confidence flags and the /case-studies/fendix path, so the browser
// does not move their leading "." "--" or "/" to the other end.

export const postsPart3: Post[] = [
  {
    slug:     "serverless-architecture-limits",
    title:    "الـ Serverless Architecture وحدودها: اللي بيحصل فعلًا ورا الكواليس",
    date:     "2024-11-05",
    updated:  "2026-10-17",
    readTime: "قراءة 5 دقايق",
    tags:     ["Serverless", "AWS Lambda", "Cloud", "Architecture"],
    summary:
      "الـ serverless بيدّي مرونة حقيقية و scaling تلقائي — بس معاه قيود أغلب الـ tutorials بتفوّتها. هنا بشرح الـ cold starts وحدود وقت التنفيذ والـ statelessness معناها إيه فعلًا في الشغل الحقيقي، وإزاي نتحايل عليها.",
    content: [
      {
        type: "p",
        text: "الـ serverless computing عنده مشكلة في التسويق. الوعد اللي بيتسوّق بيه — «مفيش سيرفرات محتاجة إدارة، scale بلا حدود، والدفع على قد الاستخدام بس» — صحيح، بس ناقص. كل pattern في الـ architecture ليه تمن، وتمن الـ serverless محدد ومش بديهي. وفهم التمن ده هو الفرق بين deployment ناجح على الـ serverless، ونظام يحرجكم في الـ production.",
      },
      {
        type: "h2",
        text: "الـ serverless معناه إيه فعلًا",
      },
      {
        type: "p",
        text: "الـ serverless مش معناه إن مفيش سيرفرات — معناه إنكم مش اللي بتديروها. الـ function بتاعتكم بتشتغل جوه container، الـ cloud provider بيقوّمه عند الطلب، وينفّذ فيه الـ function، وبعدين يشيله. AWS Lambda و Azure Functions و Google Cloud Functions كلهم ماشيين بالنموذج ده. إنتو بتكتبوا الـ function؛ والـ provider بيتولّى الـ provisioning والـ scaling والصيانة.",
      },
      {
        type: "p",
        text: "طريقة التسعير ميزة حقيقية: الدفع بيكون على كل invocation وعلى كل millisecond من وقت التنفيذ، مش على capacity واقفة من غير استخدام. ومع الـ workloads الـ event-driven اللي الضغط فيها بييجي على دفعات، ده بيطلع أرخص بفرق كبير جدًا من إنكم تسيبوا سيرفرات شغالة وجاهزة 24/7.",
      },
      {
        type: "h2",
        text: "التحدي الأول: الـ cold starts",
      },
      {
        type: "p",
        text: "لما الـ function متكونش اتنادت من فترة قريبة، الـ provider محتاج يقوّم container جديد قبل ما ينفّذها. الـ latency بتاعة التهيئة دي — اللي هي الـ cold start — ممكن تبقى من 100ms لحد كذا ثانية، على حسب الـ runtime وحجم الـ function.",
      },
      {
        type: "list",
        items: [
          "Python و Node.js الـ cold starts بتاعتهم أسرع من Java أو ‎.NET، عشان تهيئة الـ runtime فيهم أخف",
          "الـ deployment packages الكبيرة (dependencies تقيلة) بتخلّي الـ cold starts أسوأ — خلّوا الـ packages بتاعة الـ functions خفيفة",
          "الـ Lambda functions المربوطة بـ VPC كانت بتزوّد ثواني عشان تجهيز الـ network interface؛ من ساعة ما AWS نقلت لـ Hyperplane interfaces مشتركة في 2019، التأخير ده اختفى إلى حد كبير",
        ],
      },
      {
        type: "code",
        lang: "python",
        code: `# Expensive setup inside the handler runs on every invocation
def handler(event, context):
    client = boto3.client("s3")        # new client each call
    model = load_model("model.bin")    # reloaded each call
    return predict(model, event)


# Module-level setup runs once per execution environment and is
# reused by every warm invocation that follows
import boto3
from inference import load_model, predict

client = boto3.client("s3")
model = load_model("model.bin")

def handler(event, context):
    return predict(model, event)`,
      },
      {
        type: "callout",
        text: "مع الـ endpoints الحساسة للـ latency، استخدموا Provisioned Concurrency على AWS Lambda — بيسيب pool من الـ containers المتهيّأة شغالة وجاهزة على طول، فبيلغي الـ cold starts، بس التمن إنكم بتدفعوا على capacity واقفة من غير استخدام. استخدموه بانتقائية على الـ hot paths، مش على كل حاجة.",
      },
      {
        type: "h2",
        text: "التحدي التاني: حدود وقت التنفيذ",
      },
      {
        type: "p",
        text: "أقصى وقت تنفيذ في AWS Lambda هو 15 دقيقة. Azure Functions على الـ Consumption plan الحد الافتراضي فيها 5 دقايق وبتقف عند 10؛ أما الـ Premium والـ Dedicated plans فالحد الافتراضي فيها 30 دقيقة وممكن تشتغل أطول من كده. الحد الصارم ده معناه إن الـ serverless ببساطة مش الأداة المناسبة للعمليات اللي بتاخد وقت طويل — الـ batch jobs، ومعالجة الملفات الكبيرة، والـ ML training.",
      },
      {
        type: "p",
        text: "الحل هو التقسيم: قسّموا المهام الكبيرة لوحدات أصغر، كل وحدة فيها تخلص جوه الحد، وبعدين اربطوها ورا بعض بالـ event triggers أو الـ step functions.",
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
        text: "التحدي التالت: الـ statelessness",
      },
      {
        type: "p",
        text: "الـ serverless functions متصممة من الأساس إنها تبقى stateless. كل invocation ممكن يشتغل على container instance مختلف. أي state متخزّن في الـ memory بين invocation والتاني مينفعش تعتمدوا عليه — ممكن يكون موجود في الـ call الجاي، وممكن لأ.",
      },
      {
        type: "p",
        text: "ودي ميزة، مش bug — الـ statelessness هي اللي بتخلّي الـ horizontal scaling اللي ملوش حدود ممكن. بس ده محتاج تغيير في طريقة التفكير: كل الـ persistent state لازم يتخزن في storage خارجي.",
      },
      {
        type: "list",
        items: [
          "DynamoDB أو RDS للـ persistent data — lookups بـ latency قليلة، وتقدروا تعتمدوا عليها من invocation للتاني",
          "S3 للتخزين المؤقت للملفات — ابعتوا بين الـ functions مراجع الملفات (الـ keys)، مش محتوى الملفات نفسه",
          "ElastiCache (Redis) للـ session state المشترك، أو للتنسيق المؤقت بين الـ function instances",
        ],
      },
      {
        type: "h2",
        text: "إمتى الـ serverless يبقى الاختيار الصح",
      },
      {
        type: "list",
        items: [
          "المعالجة الـ event-driven: رفع ملفات على S3، ورسايل SQS، والـ webhook receivers — الـ functions بتشتغل لما يحصل event وبعدين بتنتهي",
          "الـ traffic اللي بييجي على دفعات ومش متوقع: الـ serverless بينزل لصفر في أوقات الهدوء، ويطلع لآلاف الـ instances وقت الـ spikes",
          "المهام المجدولة: triggers بأسلوب cron للـ jobs الخفيفة اللي بتتكرر بشكل دوري",
          "الـ API backends اللي الضغط عليها متغير: موفّرة في التكلفة لما الـ traffic ميكونش ماشي على وتيرة ثابتة",
        ],
      },
      {
        type: "h2",
        text: "إمتى الـ serverless يبقى الاختيار الغلط",
      },
      {
        type: "list",
        items: [
          "الـ hot paths اللي الـ latency فيها حرجة، والـ cold starts فيها مش مقبولة، وتكلفة الـ provisioned concurrency فيها أعلى من سيرفر بيفضل شغال على طول",
          "العمليات الطويلة اللي بتعدّي حدود وقت التنفيذ وصعب تتقسم لأجزاء أصغر",
          "الـ protocols الـ stateful زي WebSockets (استخدموا API Gateway WebSocket APIs بحذر — فيه قيود)",
          "الـ traffic الكبير والثابت، اللي فيه الـ compute الشغال على طول بيطلع أرخص من الدفع على كل invocation",
        ],
      },
      {
        type: "p",
        text: "الـ serverless أداة قوية، بس مناسبة لحالات محددة. استخدموه في الحالات اللي قيوده فيها ماشية مع طبيعة الـ workload بتاعكم، ومتفرضوهوش في الحالات اللي مش كده. والمهندسين اللي بيطلّعوا أكبر استفادة من الـ serverless هما اللي فاهمين حدوده بنفس الوضوح اللي فاهمين بيه مميزاته.",
      },
    ],
  },

  {
    slug:     "false-positive-problem",
    title:    "الدليل، مش الخطورة: إزاي Fendix بيقرر إيه اللي يوقّف الـ build",
    date:     "2026-10-17",
    readTime: "قراءة 7 دقايق",
    tags:     ["Security", "Go", "CI/CD", "Open Source"],
    summary:
      "بوابات الأمان اللي بتعتمد على الخطورة (severity) بس بتفشّل الـ builds بسبب findings مش مُثبتة، والـ scanner اللي مشتغلش من غير ما يدّي أي إشارة بيبان كأنه pass نضيف. هنا بشرح إزاي Fendix بيقيّم الأدلة، وبيتابع التغطية (coverage)، وبيقرر إيه اللي يوقّف الـ build — وإيه اللي غلطت فيه في أول نسخة.",
    content: [
      {
        type: "callout",
        text: "المقال ده اتكتب من جديد في أكتوبر 2026. نسخة أقدم منه كانت بتوصف بوابة correlation أشد، وكانت بتذكر رقم لتقليل الـ false positives. ولا واحدة فيهم كانت دقيقة: أول إصدار كانت البوابة فيه معتمدة على الخطورة بس، وتأثير الـ correlation على الـ false positives عمره ما اتقاس. النسخة دي بتشرح البوابة بتشتغل إزاي فعلًا.",
      },
      {
        type: "p",
        text: "أغلب بوابات الأمان في الـ CI بتاخد قرار واحد: هل فيه أي finding خطورته (severity) عند threshold معيّن أو أعلى؟ لو أيوه، الـ build بيفشل. القاعدة دي سهل تتشرح، وسهل اللف حواليها. الـ findings اللي مش مُثبتة بتوقّف الإصدارات، والفِرق بتتعلم تعمل override للبوابة، والبوابة بتبطّل يبقى ليها أي معنى.",
      },
      {
        type: "p",
        text: "وفيه كمان فشل أهدى. لو scanner مشتغلش — الأداة مكانتش متسطّبة، أو الـ target مكانش ينفع يتوصل له، أو الـ configuration كانت غلط — مبيطلّعش أي findings، وغياب الـ findings شكله بالظبط زي pass نضيف.",
      },
      {
        type: "h2",
        text: "الخطورة بتجاوب على السؤال الغلط",
      },
      {
        type: "list",
        items: [
          "الخطورة (severity) بتقول الـ finding هيبقى خطير قد إيه لو طلع حقيقي. ومبتقولش أي حاجة عن احتمال إنه يكون حقيقي.",
          "الـ DAST بيشوف السلوك، بس مش بيشوف الكود: ممكن يبيّن إن endpoint بيرد بشكل غلط من غير ما يعرف أنهي handler اللي طلّع الرد ده.",
          "الـ SAST بيشوف الكود، بس مش بيشوف السلوك: ممكن يعلّم على pattern خطير من غير ما يعرف الـ path ده ممكن يتوصل له ولا لأ، أو عليه حماية بالفعل ولا لأ.",
        ],
      },
      {
        type: "p",
        text: "عشان كده Fendix بيحتفظ بالخطورة — هي لسه بتوصف التأثير — بس قرار إن الـ finding يوقّف الـ build ولا لأ بياخده من الدليل اللي وراه.",
      },
      {
        type: "h2",
        text: "الـ correlation إشارة، مش البوابة",
      },
      {
        type: "p",
        text: "لما static finding و runtime finding يوصفوا نفس المشكلة في نفس المكان، Fendix بيدمجهم في correlated finding واحد. الـ matching بيمشي على cascade ثابت، مش على weighted score: لازم الـ categories تكون مرتبطة ببعض، وبعدين لازم الأماكن تتطابق بالـ route pattern، أو بالـ endpoint بعد الـ normalisation، أو بالـ path suffix، أو بـ path segment مشترك، بالترتيب ده.",
      },
      {
        type: "code",
        lang: "go",
        code: `// Simplified from the correlator: is this static (whitebox) finding
// the same issue as this runtime (blackbox) finding?
func sameIssue(w, b Finding) bool {
    if !relatedCategories(w.Category, b.Category) {
        return false
    }
    switch {
    case w.Route != "" && routeMatches(w.Route, b.Method, b.URL):
        return true // route pattern confirmed against the live request
    case normalize(w.Endpoint) == normalize(b.Endpoint):
        return true
    case suffixMatches(w.Endpoint, b.Endpoint):
        return true
    default:
        return sharesSegment(w.Endpoint, b.Endpoint)
    }
}`,
      },
      {
        type: "p",
        text: "اتفاق الـ engines مع بعض دليل قوي، بس هو إشارة واحدة من سبع إشارات مستقلة. route اتعمله confirm، أو taint path ممكن يتوصل له، أو payload اتعمله validation، أو أداة مستقلة بتبلّغ عن نفس الـ CWE في نفس المكان — دول كمان بيتحسبوا. وفيه أدلة بتثبت نفسها بنفسها: live response بيبيّن المشكلة، أو credential حقيقي اتعمله commit في كود الـ production، ممكن يوقّف الـ build من غير engine تاني. والـ correlation عمره ما بيشيل finding؛ كل حاجة بتفضل في التقرير.",
      },
      {
        type: "h2",
        text: "score تقدروا تراجعوه",
      },
      {
        type: "p",
        text: "كل finding بياخد درجة ثقة (confidence score) deterministic من 0 لـ 100. بتبدأ من قيمة أساسية (base)، وكل قاعدة بتنطبق بتزوّد أو بتنقّص مقدار ثابت، ومعاها سبب مكتوب بكلام بسيط. وفيه اختبارات بتضمن إن الأسباب لما تتجمع تطلع نفس الـ score، عشان محدش يبقى مضطر يثق في black box.",
      },
      {
        type: "code",
        lang: "text",
        code: `confidence_score: 90 (HIGH)
  base                          35
  + static evidence             10
  + runtime evidence            10
  + cross-engine agreement      25
  + route confirmed             10

bands: HIGH >= 70, MEDIUM >= 40, LOW < 40`,
      },
      {
        type: "h2",
        text: "إيه اللي بيوقّف فعلًا",
      },
      {
        type: "list",
        items: [
          "تحت الـ threshold بتاع ‎--fail-on: يبقى WARN (لـ medium وأعلى) أو INFO. عمره ما يبقى block.",
          "عند الـ threshold أو أعلى منه، والثقة LOW: يبقى WARN.",
          "عند الـ threshold أو أعلى منه، والثقة MEDIUM ومفيش إشارة مستقلة: يبقى WARN.",
          "غير كده: BLOCK — مع كام حالة القرار بيتخفّف فيها، زي الـ test fixtures اللي مفيهاش دليل مستقل، أو dependency فيها ثغرة بس عمرها ما بتتعمل import.",
        ],
      },
      {
        type: "p",
        text: "بوابة الثقة دي نزلت في v2.0 كـ breaking change: فيه builds كانت بتفشل وبقت دلوقتي بتعدّي. عشان كده ‎--enforce-confidence=false بيرجّع بالظبط السلوك القديم اللي كان معتمد على الخطورة بس، وفيه اختبار بيغطي 54 تركيبة من الخطورة والـ threshold بيضمن إن الـ escape hatch ده يفضل بيعمل اللي بيوعد بيه. والقرارات اللي بتتاخد بالطريقة دي بتظهر في التقرير متعلّم عليها إنها policy overrides.",
      },
      {
        type: "h2",
        text: "الـ scanner اللي مشتغلش مش pass",
      },
      {
        type: "p",
        text: "كل analyzer بيسجّل هو اشتغل، ولا اتعمله skip، ولا فشل، ومعاه reason code. في الـ CLI، فيه flags اختيارية (opt-in) بتحوّل الـ analyzers الناقصة أو الفجوات في التغطية (coverage) لـ exit code بيدل على فشل. وفي الـ hosted workspace، التغطية المطلوبة بتعتمد على الـ scan mode، ولو فيه دليل مطلوب ناقص، قرار الإصدار بيطلع INCOMPLETE بدل PASS.",
      },
      {
        type: "h2",
        text: "اللي كنت هقوله لنفسي أيام أول نسخة",
      },
      {
        type: "list",
        items: [
          "اكتب الـ semantics بتاعة البوابة كاختبارات قبل ما تكتب الـ README. أول README كان بيوصف قاعدة الكود مكانش بينفّذها.",
          "انشر الـ benchmarks ومعاها حدودها. الـ corpus المتنقّي بعناية بيقيس القواعد على حالات إنت اللي كاتبها، مش معدل اكتشاف (detection rate) في الواقع.",
          "أي تغيير يخلّي البوابة أشد أو أخف اعتبره breaking change، ونزّل معاه escape hatch بيرجّع السلوك القديم بالظبط.",
        ],
      },
      {
        type: "callout",
        text: "الـ engine بتاع Fendix مفتوح المصدر (MIT) على github.com/Fendix-app/Fendix؛ والـ hosted workspace على fendix.dev. دراسة الحالة كاملة على ‎/case-studies/fendix",
      },
    ],
  },
];
