import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Abdel-Rahman Saied — Senior Software Engineer & Team Lead";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#09090b",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
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

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "#f4f4f5",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#09090b", fontWeight: 900, fontSize: "18px", letterSpacing: "-1px" }}>
              AS
            </span>
          </div>
          <span style={{ color: "#a1a1aa", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.3px" }}>
            asaied<span style={{ color: "#52525b" }}>.dev</span>
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "-2px",
            marginBottom: "20px",
          }}
        >
          Abdel-Rahman Saied
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "28px",
            color: "#71717a",
            fontWeight: 500,
            letterSpacing: "-0.5px",
            marginBottom: "40px",
          }}
        >
          Senior Software Engineer · Team Lead
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["Python · Django", "Go · Fendix", "6+ Years", "7 Industries"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 18px",
                border: "1px solid #27272a",
                borderRadius: "999px",
                color: "#52525b",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
