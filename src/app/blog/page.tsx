import JsonLd from "@/components/JsonLd";
import { blogIndexJsonLd, pageMetadata } from "@/lib/seo";
import { posts } from "@/lib/posts";
import BlogClient from "./BlogClient";
import { pages } from "@/lib/pages";

export const metadata = pageMetadata(pages.blog);

export default function BlogPage() {
  return (
    <>
      <JsonLd data={blogIndexJsonLd(posts)} />
      <BlogClient />
    </>
  );
}
