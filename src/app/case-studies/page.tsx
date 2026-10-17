import { pageMetadata } from "@/lib/seo";
import CaseStudiesClient from "./CaseStudiesClient";
import { pages } from "@/lib/pages";

export const metadata = pageMetadata(pages.caseStudies);

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
