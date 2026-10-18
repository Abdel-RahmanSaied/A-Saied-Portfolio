import { CaseStudyPage, caseStudyMeta, caseStudyParams } from "@/screens/pages";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = caseStudyParams;

export function generateMetadata({ params }: Props) {
  return caseStudyMeta("en", params);
}

export default function Page({ params }: Props) {
  return <CaseStudyPage locale="en" params={params} />;
}
