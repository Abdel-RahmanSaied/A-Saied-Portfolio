import { ArrowDown, Database, Search, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const flows = {
  twiscope: {
    icon: Database,
    en: ["Data sources", "Collect & analyse", "Reports & decisions"],
    ar: ["مصادر البيانات", "جمع وتحليل", "تقارير ودعم القرار"],
  },
  "sanad-ai": {
    icon: Search,
    en: ["Authorised reports", "Hybrid retrieval", "Answer with sources"],
    ar: ["التقارير المسموح بها", "بحث هجين", "إجابة بمصادرها"],
  },
  fendix: {
    icon: ShieldCheck,
    en: ["Security findings", "Policy & coverage", "Release decision"],
    ar: ["نتائج فحص الأمان", "السياسة ونطاق الفحص", "قرار الإصدار"],
  },
};

/** A conceptual flow, not a product screenshot or a complete architecture. */
export default function ProjectFlow({ slug, locale }: { slug: string; locale: Locale }) {
  const flow = flows[slug as keyof typeof flows];
  if (!flow) return null;
  const Icon = flow.icon;
  return (
    <figure className="relative flex flex-col justify-center overflow-hidden rounded-xl border border-emerald-300/10 bg-emerald-950/20 p-5 sm:p-6">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#34d39912,transparent_70%)]" />
      <figcaption className="relative mb-4 flex items-center gap-2 text-xs text-emerald-200">
        <Icon aria-hidden="true" className="h-4 w-4" />
        {locale === "ar" ? "مسار مبسّط" : "Simplified flow"}
      </figcaption>
      <ol className="relative grid grid-cols-3 gap-2 md:block md:space-y-2">
        {flow[locale].map((label, i) => (
          <li key={label}>
            {i > 0 && <ArrowDown aria-hidden="true" className="mx-auto mb-2 hidden h-3 w-3 text-emerald-300/70 md:block" />}
            <div className={`h-full rounded-lg border px-2 py-2 text-center text-xs md:px-3 ${i === 2 ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100" : "border-zinc-700/70 bg-zinc-950/70 text-zinc-300"}`}>
              <span aria-hidden="true" className="mb-1 block text-emerald-200 md:hidden">{i + 1}</span>
              {label}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
