import JsonLd from "@/components/JsonLd";
import { pageMetadata, portfolioJsonLd } from "@/lib/seo";
import { projects } from "@/lib/projects";
import PortfolioClient from "./PortfolioClient";
import { pages } from "@/lib/pages";

export const metadata = pageMetadata(pages.portfolio);

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={portfolioJsonLd(projects)} />
      <PortfolioClient />
    </>
  );
}
