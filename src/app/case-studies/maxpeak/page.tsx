import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import MaxpeakClient from "./MaxpeakClient";

export const metadata = pageMetadata({
  title: "Maxpeak Case Study — AI-Vetted Talent Marketplace",
  description:
    "How a 3-stage AI vetting pipeline solved the Egypt-to-Saudi talent trust problem — connecting elite engineers with Saudi companies through verified, guaranteed hiring.",
  path: "/case-studies/maxpeak",
});

export default function MaxpeakCaseStudyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: "Maxpeak", path: "/case-studies/maxpeak" },
        ])}
      />
      <MaxpeakClient />
    </>
  );
}
