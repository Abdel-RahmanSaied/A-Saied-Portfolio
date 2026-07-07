import JsonLd from "@/components/JsonLd";
import { blogIndexJsonLd, pageMetadata } from "@/lib/seo";
import { posts } from "@/lib/posts";
import BlogClient from "./BlogClient";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Engineering articles on distributed backend systems, observability, caching, scaling ML inference, Django, FastAPI, Go, and technical leadership — written from production experience.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <JsonLd data={blogIndexJsonLd(posts)} />
      <BlogClient />
    </>
  );
}
