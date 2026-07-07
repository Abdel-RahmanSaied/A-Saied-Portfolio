import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import TwiscopeClient from "./TwiscopeClient";

export const metadata = pageMetadata({
  title: "Twiscope Case Study — 5M+ Events a Day Social Intelligence Platform",
  description:
    "How I architected a real-time Arabic OSINT social intelligence platform handling 5M+ data points daily — Django, Celery, Redis, ML-driven trend detection, and sub-second WebSocket alerting.",
  path: "/case-studies/twiscope",
});

export default function TwiscopeCaseStudyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: "Twiscope", path: "/case-studies/twiscope" },
        ])}
      />
      <TwiscopeClient />
    </>
  );
}
