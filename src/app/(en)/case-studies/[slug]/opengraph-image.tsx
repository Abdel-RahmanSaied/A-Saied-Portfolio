import { ogContentType, ogSize } from "@/lib/og";
import { caseStudyOg } from "@/screens/og";
import { caseStudyParams } from "@/screens/pages";

const og = caseStudyOg("en");

export const alt = og.alt;
export const size = ogSize;
export const contentType = ogContentType;
export const generateStaticParams = caseStudyParams;
export default og.Image;
