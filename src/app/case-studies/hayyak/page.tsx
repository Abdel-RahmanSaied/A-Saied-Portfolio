import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import HayyakClient from "./HayyakClient";

export const metadata = pageMetadata({
  title: "Hayyak Case Study — Multi-Tenant Hotel Management Integrations",
  description:
    "Integrating Opera PMS (OHIP) and dual payment gateways into a multi-tenant hotel management system — PCI-compliant payment flows, Firebase push notifications, and real-time WebSocket updates.",
  path: "/case-studies/hayyak",
});

export default function HayyakCaseStudyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: "Hayyak", path: "/case-studies/hayyak" },
        ])}
      />
      <HayyakClient />
    </>
  );
}
