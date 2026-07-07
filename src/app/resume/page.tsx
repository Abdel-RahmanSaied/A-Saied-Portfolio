import { pageMetadata } from "@/lib/seo";
import ResumeClient from "./ResumeClient";

export const metadata = pageMetadata({
  title: "Resume",
  description:
    "Resume of Abdel-Rahman Saied — Technical Lead & Staff Backend Engineer in Riyadh, Saudi Arabia. Distributed systems, AI infrastructure, and engineering leadership across social intelligence, mobility, hospitality, and security.",
  path: "/resume",
});

export default function ResumePage() {
  return <ResumeClient />;
}
