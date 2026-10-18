# Arabic (Egyptian) style guide for asaied.dev

The Arabic site at `/ar` is written in **Egyptian Arabic**, the way an Egyptian
senior engineer writes for other engineers and hiring managers: clear and
professional, never slangy, never stiff. It is not a word-for-word translation.
Each sentence is rewritten so it reads as if it were first written in Arabic, but
it says **exactly** what the English says.

Every Arabic file under `src/lib/ar/` mirrors an English source file. When the
English changes, the Arabic changes in the same commit.

## 1. Meaning first: no new claims, no lost caveats

- Keep every fact exactly: numbers, dates, versions, counts, percentages, names,
  URLs, licences. Do not round, add, or drop any of them.
- Keep every caveat, limit and "not measured / not verified / prototype" note.
  These are the most important sentences on the site.
- Do not make anything sound bigger or more certain than the English does. If the
  English says "about", "roughly", "up to" or "a working prototype", so does the
  Arabic.
- Keep who did what exactly as stated: "I", "the team", "teammates", a named
  contributor. Do not turn "I led the team" into "I built".
- Person: keep the English person. The FAQ is third person (هو). Case studies,
  posts and the résumé are first person (أنا, often implicit in the verb).

## 2. Register: professional Egyptian Arabic

Use Egyptian grammar and function words naturally:

| Use | Avoid (MSA-heavy) |
|---|---|
| ده / دي / دول | هذا / هذه / هؤلاء |
| اللي | الذي / التي / الذين |
| مش | ليس / لا (for "not") |
| عشان | لكي / من أجل / لأن (as "so that / because") |
| إزاي، إيه، ليه، فين | كيف، ماذا، لماذا، أين |
| بـ + present ("بقود الفريق") | يقوم بـ |
| هـ + present for future ("هيتنفذ") | سوف / سـ |
| كمان، برضه، لسه، دلوقتي، كده | أيضًا (sparingly OK), حاليًا (OK) |
| فيه / مفيش | يوجد / لا يوجد |

But keep it professional:

- No jokes, no slang (جامد، أوي، يا جماعة، اشطة, etc.), no emojis.
- "جدًا" is fine. Short, direct sentences are better than long chained ones.
- Avoid assuming the reader's gender. Prefer impersonal phrasing ("لو الـ API
  بطيء...") or the plural ("لو عندكم...") over masculine "إنت".

## 3. Technical terms

Engineers in Egypt say most technical terms in English. Keep them in **Latin
letters**, and put the Arabic article as a separate prefix with a tatweel:
**الـ API**, **الـ backend**, **الـ cache**, **الـ queue**, **الـ pipeline**,
**في الـ CI**, **بالـ Celery**.

Always keep in Latin letters, unchanged:

- Product, company and project names: Twiscope, Sanad AI, Fendix, Qatf, MURI,
  Check-In (Hayyak), Maxpeak, ASAS IT, Deep-In, Influencer Impact, Sadeed,
  Decision Hub, HyperPay, Tap Payments, Oracle OPERA, OHIP, Shomoos, OpenRouter.
- Technologies, libraries, protocols, file formats, standards: Python, Django,
  DRF, FastAPI, Celery, Redis, PostgreSQL, PostGIS, Elasticsearch, Kong, AWS,
  SQS, Terraform, Docker, Go, Semgrep, SARIF, JWT, OTP, RBAC, REST, BM25, kNN,
  RAG, LLM, CI/CD, SBOM, HTTP, JSON, SQLite, ffmpeg, Whisper, etc.
- Code, identifiers, CLI flags, file paths, URLs, environment variables, HTTP
  status codes and API routes. **Code blocks are never translated** (comments
  inside code blocks stay as they are too).

Use these fixed Arabic forms for common words, so the whole site is consistent:

| English | Arabic |
|---|---|
| backend / frontend | الـ backend / الـ frontend |
| server | السيرفر |
| database | قاعدة البيانات |
| production (environment) | الـ production |
| deployment / to deploy | الـ deployment / ينزل على الـ production |
| test(s) | الاختبارات (unit tests / load test stay English) |
| team / team lead | الفريق / قائد الفريق |
| project / platform / product / app | المشروع / المنصة / المنتج / التطبيق |
| feature / features / feature list | ميزة / المميزات / قائمة المميزات |
| case study / case studies | دراسة حالة / دراسات الحالة |
| open source | مفتوح المصدر |
| licence | الرخصة |
| architecture | الـ architecture |
| trade-off | التمن (the cost of a choice) / المفاضلة |
| constraint(s) | القيود |
| outcome(s) | النتايج |
| scope notes | حدود الشغل |
| model (AI) / prompt | الموديل / الـ prompt |
| user / customer | المستخدم / العميل |
| report / dashboard | التقرير / لوحة التحكم |
| alert / notification | التنبيه / الإشعار |
| subscription | الاشتراك |
| payment / refund | الدفع / الاسترداد |
| release (software) | الإصدار |
| vulnerability / finding | الثغرة / الـ finding |
| severity / confidence / coverage | الخطورة (severity) / الثقة (confidence) / التغطية (coverage) — English in brackets only on first use in a section |
| clip / caption(s) / transcript | المقطع / الترجمة على الفيديو (captions) / التفريغ |
| driver / student / trip / seat | السواق / الطالب / الرحلة / المقعد |
| guest / hotel / reservation / check-in | الضيف / الفندق / الحجز / تسجيل الدخول (check-in) |
| freelance / independent / full-time | فريلانس / مستقل / دوام كامل |
| Software Team Lead | قائد فريق برمجيات |
| Senior Backend Engineer | مهندس Backend أول |
| Senior Software Engineer, Backend | مهندس برمجيات أول، Backend |
| Software Engineer / Backend Software Engineer | مهندس برمجيات / مهندس برمجيات Backend |
| Technical Lead, Backend | قائد تقني، Backend |
| Present (in date ranges) | لحد دلوقتي |
| since <date> | من <date> لحد دلوقتي |
| system / systems | النظام / الأنظمة |
| integration(s) | الربط مع… / عمليات الربط (not تكاملات) |
| code review | مراجعة الكود |
| application security | أمان التطبيقات |
| hands-on | بشتغل بإيدي (verb) / عملي (adjective) |
| mentoring | توجيه المهندسين |
| teammates | زمايلي في الفريق |
| keywords / brand / influencers | الكلمات المفتاحية / البراند / المؤثرين |
| evidence / gate / supply chain | الأدلة / البوابة / سلسلة التوريد |
| third-party | طرف تالت |
| by default | افتراضيًا |
| pre-launch | قبل الإطلاق |
| right-to-left | من اليمين للشمال |
| vertical clips | مقاطع بالطول (not طولية, which reads like طويلة) |
| on-site / remote / relocation | حضوري / عن بُعد / الانتقال لمكان الشغل |
| Creator & maintainer | منشئ المشروع والـ maintainer |
| Desktop Software Engineer | مهندس برمجيات Desktop |

Also kept in Latin letters: delivery, provider, render, frame(s), hosted,
deterministic, marketplace, quota(s), score / scoring, social intelligence,
override, opt-out, maintainer.

"Service": خدمة / خدمات in ordinary prose ("خدمات بحث", "منصات متعددة
الخدمات"); "الـ service" in Latin when it names one deployed component ("الـ
auth service", "حدود الـ services"). Don't mix the two for the same thing in
one sentence.

Month names use the Egyptian forms: يناير، فبراير، مارس، أبريل، مايو، يونيو،
يوليو، أغسطس، سبتمبر، أكتوبر، نوفمبر، ديسمبر. Keep digits Western (2024, 13, 70%).

## 4. Punctuation and typography

- Arabic comma ، semicolon ؛ question mark ؟. A full stop is a normal ".".
- Use "—" for asides, as the English does, with spaces around it.
- Quotation marks are «…», not “…” (curly English quotes point the wrong way
  in right-to-left text).
- Write the English `→` as `←`: Arabic reads right to left, so the arrow points
  the way the reader is moving. Keep `·`, `×`, `%`, `/` as they are.
- An identifier that starts with a neutral character (`@Dabash99`, `--fail-on`,
  `.deb`) right after Arabic text gets flipped by the browser ("Dabash99@").
  Put an invisible left-to-right mark (U+200E) before it, or rephrase so a
  Latin word comes first ("الـ flag --fail-on").
- A number right after an English word joins that word for the browser:
  "الـ backend: 8 تقنيات" shows as "8 :backend". Put an invisible right-to-left
  mark (U+200F) after the punctuation, or rephrase. Likewise an arrow between two
  English words ("ATS ← assessment") makes them one left-to-right run; keep an
  Arabic word next to each arrow, or reverse an all-English chain.
- Every invisible mark gets a comment at the top of its file saying where it is.
- Never put a Latin word and an Arabic word together without a space, except the
  "الـ" prefix.
- Lists keep the same number of items, in the same order.

## 5. Examples

> I was its sole backend developer for two years and now lead the team.
>
> كنت مطور الـ backend الوحيد فيه لمدة سنتين، ودلوقتي بقود الفريق.

> Most CI security gates fail a build on severity alone.
>
> أغلب بوابات الأمان في الـ CI بتوقّف الـ build على أساس الخطورة بس.

> The model never emits timing.
>
> الموديل عمره ما بيحدد التوقيت.

> A working prototype, not production: the API has no authentication.
>
> نموذج أولي شغال، مش production: الـ API مفيهوش أي authentication.

> If you cannot explain where latency comes from, you are not ready to optimize.
> You are ready to instrument.
>
> لو مش عارفين تشرحوا الـ latency جاية منين، يبقى لسه مش وقت الـ optimization.
> ده وقت القياس.

## 6. Checklist before committing Arabic

1. Every number, date, name and caveat from the English is present.
2. No sentence claims more than the English.
3. Technical terms are in Latin letters and consistent with the table above.
4. It reads as natural Egyptian Arabic out loud, with no MSA-only connectors
   (الذي، ليس، سوف، يقوم بـ، حيث).
5. Code blocks, URLs and identifiers are byte-for-byte unchanged.
