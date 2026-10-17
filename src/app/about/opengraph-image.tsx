import { pages } from "@/lib/pages";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = pages.about.og.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg(pages.about.og);
}
