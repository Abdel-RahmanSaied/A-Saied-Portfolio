import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import FendixClient from "./FendixClient";

export const metadata = pageMetadata({
  title: "Fendix Case Study — Correlated DAST + SAST Security Scanning in Go",
  description:
    "Why security scanners drown teams in noise — and how requiring DAST and SAST engines to agree cut false positives by ~70% in Fendix, an open-source Go security scanner for CI pipelines.",
  path: "/case-studies/fendix",
});

export default function FendixCaseStudyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: "Fendix", path: "/case-studies/fendix" },
        ])}
      />
      <FendixClient />
    </>
  );
}
