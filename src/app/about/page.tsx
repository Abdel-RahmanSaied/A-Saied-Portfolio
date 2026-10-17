import JsonLd from "@/components/JsonLd";
import { faqJsonLd, pageMetadata, profilePageJsonLd } from "@/lib/seo";
import { faqs } from "@/lib/faq";
import AboutClient from "./AboutClient";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Technical Lead & Staff-level Backend Engineer based in Riyadh, Saudi Arabia — building distributed systems, AI-powered platforms, and security tooling with Python, Django, FastAPI, Go, and PostgreSQL.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <JsonLd data={faqJsonLd(faqs)} />
      <AboutClient />
    </>
  );
}
