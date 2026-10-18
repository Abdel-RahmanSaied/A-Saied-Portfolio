import { ogContentType, ogSize } from "@/lib/og";
import { homeOg } from "@/screens/og";

const og = homeOg("en");

export const alt = og.alt;
export const size = ogSize;
export const contentType = ogContentType;
export default og.Image;
