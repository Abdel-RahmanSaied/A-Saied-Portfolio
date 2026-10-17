import { pageMetadata } from "@/lib/seo";
import { pages } from "@/lib/pages";
import CaseStudiesIndex from "./CaseStudiesIndex";

export const metadata = pageMetadata(pages.caseStudies);

export default function CaseStudiesPage() {
  return <CaseStudiesIndex />;
}
