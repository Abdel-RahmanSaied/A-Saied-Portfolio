import JsonLd from "@/components/JsonLd";
import { faqJsonLd, pageMetadata, profilePageJsonLd } from "@/lib/seo";
import { faqs } from "@/lib/faq";
import AboutView from "./AboutView";
import { pages } from "@/lib/pages";

export const metadata = pageMetadata(pages.about);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <JsonLd data={faqJsonLd(faqs)} />
      <AboutView />
    </>
  );
}
