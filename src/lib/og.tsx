import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { fullMark } from "@/lib/brand";

// Shared renderer for every route's opengraph-image.tsx, so link previews
// on LinkedIn/X/Slack carry the page's own title instead of a generic card.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgInput = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tags?: readonly string[];
  footer?: string;
};

export function renderOg({ eyebrow, title, subtitle, tags = [], footer }: OgInput) {
  const titleSize = title.length > 70 ? 44 : title.length > 45 ? 52 : 64;
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, #ffffff06 1px, transparent 1px), linear-gradient(to bottom, #ffffff06 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <svg width="96" height="56" viewBox={fullMark.viewBox}>
            <path fill="#f4f4f5" fillRule="evenodd" d={fullMark.d} />
          </svg>
          <span style={{ color: "#a1a1aa", fontSize: "20px", fontWeight: 600 }}>
            asaied<span style={{ color: "#8e8e98" }}>.dev</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "1020px" }}>
          {eyebrow && (
            <div
              style={{
                color: "#a1a1aa",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </div>
          )}
          <div
            style={{
              fontSize: `${titleSize}px`,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.08,
              letterSpacing: "-1.5px",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: "26px", color: "#a1a1aa", fontWeight: 500, lineHeight: 1.35 }}>{subtitle}</div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {tags.slice(0, 5).map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "7px 16px",
                  border: "1px solid #3f3f46",
                  borderRadius: "999px",
                  color: "#a1a1aa",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <span style={{ color: "#8e8e98", fontSize: "17px", fontWeight: 500 }}>{footer ?? site.name}</span>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
