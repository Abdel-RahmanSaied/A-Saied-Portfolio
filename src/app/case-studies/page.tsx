import { pageMetadata } from "@/lib/seo";
import CaseStudiesClient from "./CaseStudiesClient";

export const metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Deep dives into production systems: a social intelligence platform processing 5M+ events daily, an open-source security scanner, geospatial student transportation, hotel PMS integrations, and AI-driven talent vetting.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
