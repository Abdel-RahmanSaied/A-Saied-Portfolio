import type { Post } from "@/lib/posts";
import { postsPart1 } from "./part-1";
import { postsPart2 } from "./part-2";
import { postsPart3 } from "./part-3";
import { postsPart4 } from "./part-4";

// Same order and slugs as src/lib/posts.ts.
export const postsAr: Post[] = [...postsPart1, ...postsPart2, ...postsPart3, ...postsPart4];
