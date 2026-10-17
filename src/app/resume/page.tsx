import { pageMetadata } from "@/lib/seo";
import ResumeClient from "./ResumeClient";
import { pages } from "@/lib/pages";

export const metadata = pageMetadata(pages.resume);

export default function ResumePage() {
  return <ResumeClient />;
}
