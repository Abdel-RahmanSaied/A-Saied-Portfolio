import { posts, type Post } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

function postToMarkdown(post: Post): string {
  const lines: string[] = [
    `# ${post.title}`,
    "",
    `URL: ${absoluteUrl(`/blog/${post.slug}`)}`,
    `Published: ${post.date} · ${post.readTime}`,
    `Tags: ${post.tags.join(", ")}`,
    `Author: ${site.name} (${site.url})`,
    "",
    post.summary,
    "",
  ];
  for (const block of post.content) {
    switch (block.type) {
      case "p":
        lines.push(block.text, "");
        break;
      case "h2":
        lines.push(`## ${block.text}`, "");
        break;
      case "h3":
        lines.push(`### ${block.text}`, "");
        break;
      case "code":
        lines.push("```" + block.lang, block.code, "```", "");
        break;
      case "list":
        lines.push(...block.items.map((item) => `- ${item}`), "");
        break;
      case "callout":
        lines.push(`> ${block.text}`, "");
        break;
      case "divider":
        lines.push("---", "");
        break;
    }
  }
  return lines.join("\n");
}

export function GET() {
  const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  const body = [
    `# ${site.name} — Blog (full text)`,
    "",
    `All engineering articles from ${site.url}, by ${site.nameFull} (${site.nameArabic}), ${site.jobTitle}, ${site.location.city}, ${site.location.country}.`,
    "",
    ...sortedPosts.map(postToMarkdown),
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
