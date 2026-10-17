import { pageMetadata } from "@/lib/seo";
import LetsTalkClient from "./LetsTalkClient";
import { pages } from "@/lib/pages";

export const metadata = pageMetadata(pages.letsTalk);

export default function LetsTalkPage() {
  return <LetsTalkClient />;
}
