import { getPost, getAllSlugs } from "@/lib/posts";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Blog post by Abdel-Rahman Saied";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOg({
    eyebrow: post ? `Blog · ${formatDate(post.date)} · ${post.readTime}` : "Blog",
    title: post?.title ?? "Blog",
    tags: post?.tags ?? [],
  });
}
