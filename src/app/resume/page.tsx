import { pageMetadata } from "@/lib/seo";
import { pages } from "@/lib/pages";
import ResumeDocument from "./ResumeDocument";

export const metadata = pageMetadata(pages.resume);

export default function ResumePage() {
  return <ResumeDocument />;
}
