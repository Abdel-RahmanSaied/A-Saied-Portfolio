import type { CaseStudy } from "@/lib/case-study-types";
import { caseStudiesPart1 } from "./part-1";
import { caseStudiesPart2 } from "./part-2";
import { caseStudiesPart3 } from "./part-3";

// Same order and slugs as src/lib/case-studies.ts.
export const caseStudiesAr: CaseStudy[] = [...caseStudiesPart1, ...caseStudiesPart2, ...caseStudiesPart3];
