import { ImageResponse } from "next/og";
import { getPost, getAllSlugs } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  const title    = post?.title    ?? "Blog | Abdel-Rahman Saied";
  const tags     = post?.tags     ?? [];
  const date     = post?.date     ? formatDate(post.date) : "";
  const readTime = post?.readTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#09090b",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, #ffffff06 1px, transparent 1px), linear-gradient(to bottom, #ffffff06 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Top: Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#f4f4f5",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#09090b", fontWeight: 900, fontSize: "15px", letterSpacing: "-1px" }}>
              AS
            </span>
          </div>
          <span style={{ color: "#71717a", fontSize: "18px", fontWeight: 600 }}>
            asaied<span style={{ color: "#3f3f46" }}>.dev</span>
          </span>
        </div>

        {/* Middle: Tags + Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Tags */}
          <div style={{ display: "flex", gap: "10px" }}>
            {tags.slice(0, 4).map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "6px 16px",
                  border: "1px solid #3f3f46",
                  borderRadius: "999px",
                  color: "#71717a",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 55 ? "46px" : "54px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              maxWidth: "980px",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: Date · Read time · Author */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {date && (
            <span style={{ color: "#52525b", fontSize: "16px", fontWeight: 500 }}>{date}</span>
          )}
          {date && readTime && (
            <span style={{ color: "#27272a", fontSize: "16px" }}>·</span>
          )}
          {readTime && (
            <span style={{ color: "#52525b", fontSize: "16px", fontWeight: 500 }}>{readTime}</span>
          )}
          {readTime && (
            <span style={{ color: "#27272a", fontSize: "16px" }}>·</span>
          )}
          <span style={{ color: "#52525b", fontSize: "16px", fontWeight: 500 }}>Abdel-Rahman Saied</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
