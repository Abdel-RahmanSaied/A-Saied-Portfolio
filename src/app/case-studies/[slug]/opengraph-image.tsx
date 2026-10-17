import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Engineering case study by Abdel-Rahman Saied";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  return renderOg({
    eyebrow: study ? `Case study · ${study.kicker}` : "Case study",
    title: study?.headline ?? "Case study",
    tags: study?.tags.slice(0, 5) ?? [],
  });
}
