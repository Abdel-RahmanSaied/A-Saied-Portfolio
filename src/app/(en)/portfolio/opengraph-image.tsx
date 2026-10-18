import { ogContentType, ogSize } from "@/lib/og";
import { pageOg } from "@/screens/og";

const og = pageOg("portfolio", "en");

export const alt = og.alt;
export const size = ogSize;
export const contentType = ogContentType;
export default og.Image;
