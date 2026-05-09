import { ImageResponse } from "next/og";
import { getPost, getAllSlugs } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  const title = post?.title ?? "Blog | Abdel-Rahman Saied";
  const tags  = post?.tags ?? [];

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
          padding: "72px 80px",
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

        {/* Middle: Title */}
        <div
          style={{
            fontSize: title.length > 60 ? "44px" : "52px",
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            maxWidth: "960px",
          }}
        >
          {title}
        </div>

        {/* Bottom: Tags + author */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            {tags.slice(0, 4).map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "6px 14px",
                  border: "1px solid #27272a",
                  borderRadius: "999px",
                  color: "#52525b",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ color: "#3f3f46", fontSize: "15px", fontWeight: 500 }}>
            Abdel-Rahman Saied
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
