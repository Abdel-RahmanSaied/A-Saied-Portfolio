import { ogContentType, ogSize } from "@/lib/og";
import { postOg } from "@/screens/og";
import { postParams } from "@/screens/pages";

const og = postOg("en");

export const alt = og.alt;
export const size = ogSize;
export const contentType = ogContentType;
export const generateStaticParams = postParams;
export default og.Image;
