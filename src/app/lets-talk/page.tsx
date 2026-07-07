import { pageMetadata } from "@/lib/seo";
import LetsTalkClient from "./LetsTalkClient";

export const metadata = pageMetadata({
  title: "Let's Talk",
  description:
    "Get in touch with Abdel-Rahman Saied for technical leadership roles, backend architecture consulting, and distributed systems work — based in Riyadh, Saudi Arabia, working globally.",
  path: "/lets-talk",
});

export default function LetsTalkPage() {
  return <LetsTalkClient />;
}
