import { pageMetadata } from "@/lib/seo";
import PortfolioClient from "./PortfolioClient";

export const metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Selected projects by Abdel-Rahman Saied — production platforms, open-source security tooling, AI pipelines, and mobile systems built with Python, Django, FastAPI, Go, and Flutter.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return <PortfolioClient />;
}
