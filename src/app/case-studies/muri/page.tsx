import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import MuriClient from "./MuriClient";

export const metadata = pageMetadata({
  title: "MURI Case Study — Geospatial Student Transportation Platform",
  description:
    "Designing a student transportation platform around client, driver, and admin roles — dedicated Flutter and Angular apps on a modular Django API with PostGIS routing, WebSocket live tracking, and subscription packages.",
  path: "/case-studies/muri",
});

export default function MuriCaseStudyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: "MURI", path: "/case-studies/muri" },
        ])}
      />
      <MuriClient />
    </>
  );
}
