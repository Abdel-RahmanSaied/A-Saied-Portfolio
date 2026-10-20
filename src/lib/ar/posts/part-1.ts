import type { Post } from "@/lib/posts";

export const postsPart1: Post[] = [
  {
    slug:     "observability-before-optimization",
    title:    "ليه الـ observability بتيجي قبل الـ optimization",
    date:     "2026-07-06",
    readTime: "مدة القراءة: 8 دقايق",
    tags:     ["Observability", "Backend", "Reliability", "Architecture", "Leadership"],
    summary:
      "من غير observability، قرارات تحسين الأداء بتعتمد على التخمين. قبل ما تزوّدوا workers، أو تعيدوا كتابة services، أو تغيّروا قاعدة البيانات، لازم تعرفوا الوقت والأخطاء وضغط الـ queue والتكلفة جايين منين فعلًا.",
    content: [
      {
        type: "p",
        text: "كتير بنبدأ نراجع الأداء بعد ما المشكلة توصل للمستخدم. الـ API يبقى بطيء، أو المهام تتراكم في queue، أو الـ CPU عالي، أو مستخدم بيشتكي. وأول رد فعل تلقائي بيكون الـ optimization: نزوّد workers، أو نعمل cache لحاجة، أو نعيد كتابة hot path، أو ننقل شغل لـ Go، أو نعمل scale لقاعدة البيانات. أحيانًا ده بينفع. لكن في أغلب الأحيان بينقل الـ bottleneck لمكان تاني، عشان محدش قاس النظام قبل ما يغيّره.",
      },
      {
        type: "p",
        text: "في شغلي على أنظمة الـ production، برجع لنفس النقطة: لازم نفهم اللي بيحصل قبل ما نحسّن الأداء. من غير قياسات واضحة، ممكن نصرف وقت في تعديل جزء مش هو سبب المشكلة أصلًا.",
      },
      {
        type: "callout",
        text: "لو مش عارفين تشرحوا الـ latency والأخطاء وضغط الـ queue والتكلفة جايين منين، يبقى لسه مش وقت الـ optimization. ده وقت القياس.",
      },
      {
        type: "h2",
        text: "فخ الـ optimization",
      },
      {
        type: "p",
        text: "الخطير في الـ optimization بتاع الـ backend إن كل حل لوحده بيبان منطقي. نضيف caching بالـ Redis. نزوّد الـ concurrency في Celery. نضيف indexes. نقسم service. ننقل الشغل اللي بيحتاج CPU كتير لـ Go. نستخدم Elasticsearch. نضيف read replicas. كل حل من دول ممكن يفيد، لو بيعالج سبب البطء الفعلي.",
      },
      {
        type: "p",
        text: "لو قاعدة البيانات بطيئة عشان فيه indexes ناقصة، زيادة الـ workers في Celery بتزوّد الضغط على قاعدة البيانات. لو الـ queue متكدّسة عشان API خارجي بيعمل timeout، زيادة الـ workers ممكن تخلّينا نوصل للـ rate limits أسرع. ولو الـ p95 latency عالية بسبب permission check واحد مكلّف، إعادة كتابة الـ endpoint كله مجهود ضايع.",
      },
      {
        type: "h2",
        text: "اللي لازم الـ observability تجاوب عليه",
      },
      {
        type: "p",
        text: "الـ backend اللي شغال في الـ production مش محتاج كل لوحات التحكم الممكنة من أول يوم. محتاج قياسات تجاوب على الأسئلة اللي هنختار الحل على أساسها.",
      },
      {
        type: "list",
        items: [
          "الـ latency: وقت الـ request بيروح فين فعلًا — كود التطبيق، قاعدة البيانات، الـ cache، الشبكة، API خارجي، الـ serialization؟",
          "الأخطاء: أنهي failures بتوصل للمستخدم، أو ينفع نعمل لها retry، أو جاية من برّه، أو ليها علاقة بالـ validation، أو سببها الكود بتاعنا إحنا؟",
          "ضغط الـ queue: الـ tasks مستنية عشان الـ workers واصلين لأقصى طاقتهم، ولا عشان الـ tasks نفسها بطيئة، ولا عشان الـ retries بتزيد بسرعة، ولا عشان الـ downstream services بتفشل؟",
          "الـ throughput: النظام يقدر يعالج كام request أو job أو record أو event قبل ما أداؤه يبدأ يقل؟",
          "التكلفة: أنهي workload هو المسؤول عن تكلفة الـ compute، أو قاعدة البيانات، أو الـ cache، أو التخزين، أو الـ APIs بتاعة طرف تالت؟",
        ],
      },
      {
        type: "h2",
        text: "نبدأ بأربعة مؤشرات",
      },
      {
        type: "p",
        text: "في أغلب أنظمة الـ backend، عايز أشوف أربعة مؤشرات قبل ما أثق في أي خطة optimization: الـ latency بتاعة الـ requests، ونسبة الأخطاء، وطول الـ queue، والـ saturation. دي حاجات بسيطة، بس مع بعض بتوضّح إذا كان النظام بطيء، ولا فيه عطل، ولا عليه حمل أكبر من طاقته، ولا مستني حاجة تانية.",
      },
      {
        type: "code",
        lang: "text",
        code: `Minimum useful production view

HTTP:
  - request count by endpoint
  - p50 / p95 / p99 latency by endpoint
  - 4xx / 5xx error rate

Database:
  - slow queries
  - connection pool usage
  - lock wait time

Queue:
  - queue depth
  - task runtime
  - retry count
  - failure reason

Infrastructure:
  - CPU / memory
  - container restarts
  - external API latency`,
      },
      {
        type: "h2",
        text: "مثال: ضغط الـ queue في Celery",
      },
      {
        type: "p",
        text: "تخيّلوا queue في Celery بدأت تتأخر كل ما حجم البيانات الواردة يزيد فجأة. أول حل ممكن نفكر فيه إننا نزوّد الـ concurrency بتاعة الـ workers. ده ممكن يكون صح، بس بشرط إن الـ workers يكونوا فعلًا CPU-bound أو مستنيين slots فاضية. لكن لو الـ tasks بطيئة عشان كل job بيعمل تلات عمليات write على قاعدة البيانات واستدعاء لـ API خارجي، زيادة الـ workers ممكن تخلّي النظام أسوأ.",
      },
      {
        type: "p",
        text: "بدل ما نبدأ بسؤال «إزاي نخلّي Celery أسرع؟»، نسأل «وقت الـ task بيروح فين؟». الإجابة بتحدد هنبدأ الـ debugging منين.",
      },
      {
        type: "code",
        lang: "python",
        code: `# Useful task instrumentation pattern
import time
import logging

logger = logging.getLogger(__name__)

def timed_step(name, fn):
    start = time.perf_counter()
    try:
        return fn()
    finally:
        duration_ms = round((time.perf_counter() - start) * 1000, 2)
        logger.info("task_step_completed", extra={
            "step": name,
            "duration_ms": duration_ms,
        })

def process_event(event):
    validated = timed_step("validate", lambda: validate_event(event))
    enriched = timed_step("enrich", lambda: enrich_event(validated))
    saved = timed_step("store", lambda: store_event(enriched))
    timed_step("notify", lambda: maybe_notify(saved))`,
      },
      {
        type: "p",
        text: "أول ما البيانات دي تبقى عندكم، ممكن الـ optimization يطلع مختلف جدًا عن أول تخمين. يمكن الـ validation مش مكلّف، والـ enrichment بطيء، والتخزين تمام، والإشعارات بتعمل timeout. في الحالة دي، الحل مش workers أكتر. ممكن يكون timeout، أو circuit breaker، أو queue منفصلة، أو إننا ننقل شغل الإشعارات لـ pipeline أولويته أقل.",
      },
      {
        type: "h2",
        text: "القياس بيوضّح المفاضلات",
      },
      {
        type: "p",
        text: "جزء كبير من شغل الـ Staff Engineer هو توضيح المفاضلات ومساعدة الفريق يختار. نضيف caching بالـ Redis ولا نصلّح الـ query؟ نزوّد workers ولا نقلّل وقت تنفيذ الـ task؟ نقسم service ولا نفضل على الـ monolith؟ ننقل hot path لـ Go ولا نحسّن كود الـ Python؟",
      },
      {
        type: "p",
        text: "القياس بيدّي الفريق أساس يقارن بيه الحلول دي، بدل ما الاختيار يعتمد على التفضيلات الشخصية.",
      },
      {
        type: "list",
        items: [
          "لو أغلب الـ p95 latency جاية من query واحدة على قاعدة البيانات، يبقى نصلّح الـ query قبل ما نضيف infrastructure.",
          "لو الـ p99 latency جاية من APIs خارجية، يبقى نضيف timeouts، و retries، و fallbacks، وحالات بتظهر للمستخدم.",
          "لو طول الـ queue بيزيد بس استهلاك الـ CPU بتاع الـ workers قليل، يبقى نحقّق في الانتظار على الـ downstream وفي الـ retry storms.",
          "لو الـ CPU واصل لأقصى طاقته والـ algorithm هو اللي واخد أغلب وقت التنفيذ، ساعتها تغيير اللغة أو الـ runtime ممكن يبقى له مبرر.",
        ],
      },
      {
        type: "h2",
        text: "الترتيب اللي بفضّله",
      },
      {
        type: "p",
        text: "لما النظام يبقى تحت ضغط، ده الترتيب اللي عادةً بكون عايز الفريق يمشي عليه.",
      },
      {
        type: "list",
        items: [
          "نقيس المسار: الـ request، وقاعدة البيانات، والـ cache، والـ queue، والـ dependency الخارجية.",
          "نحدد الـ bottleneck بالأدلة، مش بالإحساس.",
          "نطبّق أصغر حل يعالج الـ bottleneck.",
          "نقيس تاني بعد التغيير.",
          "ساعتها بس نفكر في تغييرات أكبر في الـ architecture.",
        ],
      },
      {
        type: "callout",
        text: "الـ optimization مش بيخلص لما الكود يتغيّر. بيخلص لما القياسات تتحسّن والفريق يفهم ليه.",
      },
      {
        type: "h2",
        text: "الـ observability كمان أداة قيادة",
      },
      {
        type: "p",
        text: "الـ observability الكويسة بتغيّر سلوك الفريق. بتقلّل اللوم وقت الـ incidents، عشان الفريق يقدر يبص على الأدلة. بتساعد فرق المنتج تفهم المفاضلات، عشان المهندسين يقدروا يشرحوا تكلفة أي ميزة. وبتساعد المهندسين الـ junior يتعلموا التفكير بعقلية الـ production، عشان يقدروا يشوفوا الكود بيتصرف إزاي برّه اللابتوب بتاعهم.",
      },
      {
        type: "p",
        text: "عشان كده أنا شايف إن الـ observability مكانها في نقاشات الـ architecture، مش في مهام الـ DevOps بس. الـ logs والـ metrics والـ traces ولوحات التحكم والتنبيهات والـ runbooks جزء من نموذج تشغيل المنتج. لو الفريق مش قادر يشغّل النظام، يبقى الـ architecture ناقصة.",
      },
      {
        type: "h2",
        text: "اللي هضيفه من بدري",
      },
      {
        type: "p",
        text: "في أي نظام backend، هجهّز القياسات دي بدري باستخدام الأدوات المناسبة للـ stack، حتى قبل ما يزيد حجم الاستخدام.",
      },
      {
        type: "list",
        items: [
          "الـ structured logs، وفيها الـ request IDs والـ task IDs.",
          "الـ metrics بتاعة الـ latency والأخطاء على مستوى كل endpoint.",
          "رؤية للـ slow queries، والـ metrics بتاعة الـ connection pool في قاعدة البيانات.",
          "طول الـ queue في Celery، ووقت تنفيذ الـ tasks، والـ retries، وأسباب الفشل.",
          "الـ latency بتاعة الـ APIs الخارجية، وعدد الـ timeouts، وعدد الـ retries.",
          "قالب مختصر لتوثيق الـ incident: التأثير، والسبب الجذري، والإصلاح، والإجراء الوقائي.",
        ],
      },
      {
        type: "h2",
        text: "الهدف الحقيقي",
      },
      {
        type: "p",
        text: "القياسات لازم تساعد الفريق يفهم النظام. لما حاجة تبطّأ أو تفشل أو تكلفتها تزيد، المفروض نعرف نراجع أنهي بيانات وإيه السؤال اللي محتاجين نجاوب عليه.",
      },
      {
        type: "p",
        text: "تجهيز الـ observability من بدري بيخلّي تحسين الأداء مبني على بيانات. ووقت الأعطال، البيانات دي بتساعدنا نحدد السبب ونختار تعديل نقدر نقيس أثره، من غير تعقيد ملوش لازمة.",
      },
    ],
  },
  {
    slug:     "scaling-sentiment-api",
    title:    "تجهيز خدمة لتحليل المشاعر بموديلات Hugging Face للتشغيل على FastAPI",
    date:     "2026-10-17",
    readTime: "مدة القراءة: 8 دقايق",
    tags:     ["Python", "FastAPI", "NLP", "Machine Learning", "Backend"],
    summary:
      "إيه اللي اتغيّر لما service لتحليل المشاعر في اللهجات العربية انتقلت من نموذج أولي للـ production: تحميل الموديلات في الـ lifespan بتاع FastAPI، وتثبيت الـ revisions بتاعة الموديلات، وحفظ الموديلات في cache دائم، والـ half precision على الـ GPUs بس، وخيارات الـ scaling اللي سبناها لبعدين عن قصد.",
    content: [
      {
        type: "callout",
        text: "المقال ده اتكتب من جديد في أكتوبر 2026. النسخة اللي قبلها كانت بتعرض أرقام الذاكرة والـ latency والتسريع على إنها قياسات، وكانت بتقول إن واحد من الموديلات مش مستخدم. الأرقام دي كانت تقديرات، والموديل ده بيخدم نسبة حقيقية من الـ requests، فاحتفظنا بيه. النسخة دي بتوصف التغييرات اللي نزلت على الـ production.",
      },
      {
        type: "p",
        text: "الـ service بتصنّف المشاعر في بوستات السوشيال ميديا لتقارير Twiscope: بالعربي، ومن ضمنه اللهجات الخليجية والمصرية، وبالإنجليزي. وبتشغّل تلات موديلات pretrained من Hugging Face ورا FastAPI — موديل لهجات من CAMeL-Lab للعربي، وموديل Twitter RoBERTa للإنجليزي، وموديل multilingual للنصوص اللي بتجمع أكتر من لغة أو مكتوبة بلغات تانية. مفيش أي موديل بيتدرّب هنا؛ الشغل هنا هو إننا نشغّلهم بشكل موثوق.",
      },
      {
        type: "h2",
        text: "1. تحميل الموديلات في الـ lifespan، مش وقت الـ import",
      },
      {
        type: "p",
        text: "النموذج الأولي كان بيحمّل الموديلات وقت ما الـ module بيتعمله import، فخطأ في الـ download كان بيحصل قبل ما دورة تشغيل التطبيق تبدأ بشكل واضح. نقل التحميل للـ lifespan في FastAPI خلّاه جزء واضح من بدء التشغيل: لو اكتمل، الخدمة تبدأ تستقبل requests؛ ولو فشل، الـ orchestrator يتعامل معاه كفشل في بدء التشغيل.",
      },
      {
        type: "code",
        lang: "python",
        code: `from contextlib import asynccontextmanager
from fastapi import FastAPI, Response

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.ready = False
    app.state.models = load_models(settings)   # pinned revisions, see below
    app.state.ready = True
    yield
    app.state.models = None                    # release memory on shutdown

app = FastAPI(lifespan=lifespan)

@app.get("/ready")
def ready(response: Response):
    if not app.state.ready:
        response.status_code = 503
    return {"ready": app.state.ready}`,
      },
      {
        type: "p",
        text: "لو حصل exception جوه الـ lifespan، التطبيق مش هيبدأ، وده السلوك المقصود: يفشل بسرعة والـ orchestrator يقدر يعيد تشغيله. والـ readiness endpoint هنا بيعبّر عن حالة التطبيق بعد الـ startup؛ مش بيتنادى أثناء تحميل الموديلات، لأن FastAPI مبيستقبلش requests قبل ما الـ lifespan يوصل لـ yield.",
      },
      {
        type: "h2",
        text: "2. تثبيت الـ revision بتاع كل موديل",
      },
      {
        type: "p",
        text: "أي model id على الـ Hugging Face Hub بيشاور على آخر حاجة اتعملها push، مهما كانت. وفي منتج تحليلات، نفس النص المفروض ياخد نفس الـ label الشهر الجاي، عشان كده كل موديل بيتحمّل على revision متثبّت ومحفوظ في الـ configuration.",
      },
      {
        type: "code",
        lang: "python",
        code: `model = AutoModelForSequenceClassification.from_pretrained(
    cfg.model_id,
    revision=cfg.revision,   # commit SHA or tag, reviewed like any dependency bump
)`,
      },
      {
        type: "h2",
        text: "3. حفظ ملفات الموديلات على volume دائم",
      },
      {
        type: "p",
        text: "من غير cache دائم، كل restart للـ container كان بيعمل download للموديلات من تاني. ووجود named volume متعمله mount على إنه الـ cache بتاع Hugging Face بيخلّي الـ restarts والـ redeploys تعيد استخدام اللي موجود أصلًا.",
      },
      {
        type: "code",
        lang: "yaml",
        code: `services:
  sentiment-api:
    environment:
      HF_HOME: /models-cache
    volumes:
      - hf-cache:/models-cache
volumes:
  hf-cache:`,
      },
      {
        type: "h2",
        text: "4. الـ half precision بس في المكان اللي بيفيد فيه",
      },
      {
        type: "p",
        text: "الـ float16 بيقلّل ذاكرة الـ weights للنصف تقريبًا وبيسرّع الـ inference على الـ GPUs. على الـ CPUs غالبًا مش بيفيد، وممكن يكون أبطأ، عشان كده الـ service بتختار الـ dtype على حسب الـ device: half precision على CUDA أو Apple MPS، و float32 على الـ CPU. الـ hosts اللي شغالة على CPU بتتصرف بالضبط زي ما كانت قبل التغيير.",
      },
      {
        type: "code",
        lang: "python",
        code: `def model_dtype(device: str) -> torch.dtype:
    return torch.float16 if device in ("cuda", "mps") else torch.float32`,
      },
      {
        type: "h2",
        text: "5. إرسال النصوص على دفعات",
      },
      {
        type: "p",
        text: "الـ callers بيبعتوا النصوص في batches (الـ backend بتاع Twiscope بيبعت لحد 100 نص في المرة)، والـ service بتعمل batched inference، وده بيوزّع تكلفة الـ tokenisation والـ overhead بتاع الموديل أحسن بكتير من request لكل بوست.",
      },
      {
        type: "h2",
        text: "ليه احتفظنا بالموديل متعدد اللغات",
      },
      {
        type: "p",
        text: "الـ optimisation المغري لتوفير الذاكرة كان إننا نشيل الموديل الـ multilingual ونسيب موديلات العربي والإنجليزي بس. الـ logs وضّحت إننا لسه محتاجينه: البوستات اللي بتجمع أكتر من لغة أو مكتوبة بلغات تانية — والفريق قدّر إنها 20–30% من الـ calls — بتعتمد عليه. راجعوا استخدام أي مكوّن قبل ما تقرروا تستغنوا عنه.",
      },
      {
        type: "h2",
        text: "اللي سبناه لبعدين عن قصد",
      },
      {
        type: "list",
        items: [
          "زيادة عدد الـ worker processes. كل worker في uvicorn بيحمّل نسخة خاصة بيه من كل موديل، فالذاكرة المطلوبة بتتضرب في عدد الـ workers. PyTorch أصلًا بيستخدم كذا thread في كل process للـ inference، عشان كده منزوّدش processes غير بعد ما القياس يثبت إن الـ process الواحدة هي الـ bottleneck.",
          "الـ ONNX Runtime والـ INT8 quantization. الاتنين ممكن يقلّلوا الـ latency والذاكرة بشكل كبير، بس كل واحد فيهم محتاج فحص للـ accuracy على بيانات اللهجات العربية قبل ما يبقى يستاهل الـ migration.",
          "إعادة كتابة الـ service بلغة تانية. الـ bottleneck هو الموديل، مش الـ request handling في Python.",
        ],
      },
      {
        type: "p",
        text: "التغييرات دي بسيطة كل واحدة لوحدها، لكن مع بعض جهّزت الخدمة للتشغيل بشكل أكثر استقرارًا: تحميل واضح للموديلات، وإصدارات محددة، وإعادة استخدام الملفات بعد كل deployment. وخيارات التوسّع الباقية لسه محتاجة قياس قبل تنفيذها.",
      },
    ],
  },
];
