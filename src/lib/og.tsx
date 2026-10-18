import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { uiAr } from "@/lib/ar/ui";
import { fullMark } from "@/lib/brand";
import type { Locale } from "@/lib/i18n";
import { arabicItems } from "@/lib/og-arabic";
import { site } from "@/lib/site";

// Shared renderer for every route's opengraph-image.tsx, so link previews
// on LinkedIn/X/Slack carry the page's own title instead of a generic card.
// Arabic cards are the same card mirrored, set in IBM Plex Sans Arabic.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export type OgInput = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tags?: readonly string[];
  footer?: string;
};

let arabicFonts: Promise<{ name: string; data: Buffer; weight: 500 | 700; style: "normal" }[]> | undefined;

function loadArabicFonts() {
  const font = (file: string) => readFile(join(process.cwd(), "src/assets/fonts", file));
  arabicFonts ??= Promise.all([font("IBMPlexSansArabic-Medium.ttf"), font("IBMPlexSansArabic-Bold.ttf")]).then(
    ([medium, bold]) => [
      { name: "Plex Arabic", data: medium, weight: 500, style: "normal" },
      { name: "Plex Arabic", data: bold, weight: 700, style: "normal" },
    ],
  );
  return arabicFonts;
}

/** Arabic text as word items laid out right to left; see og-arabic.ts. */
function ArabicText({ text, size }: { text: string; size: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", columnGap: `${Math.round(size * 0.26)}px` }}>
      {arabicItems(text).map((word, i) => (
        <span key={i}>{word}</span>
      ))}
    </div>
  );
}

export async function renderOg({ eyebrow, title, subtitle, tags = [], footer }: OgInput, locale: Locale = "en") {
  const ar = locale === "ar";
  const titleSize = title.length > 70 ? 44 : title.length > 45 ? 52 : 64;
  // English-only strings (most tags) are plain left-to-right text on either card.
  const text = (s: string, size: number) => (ar && /[\u0600-\u06FF]/.test(s) ? <ArabicText text={s} size={size} /> : s);
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
          fontFamily: ar ? "Plex Arabic" : "system-ui, sans-serif",
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

        <div style={{ display: "flex", flexDirection: ar ? "row-reverse" : "row", alignItems: "center", gap: "20px" }}>
          <svg width="96" height="56" viewBox={fullMark.viewBox}>
            <path fill="#f4f4f5" fillRule="evenodd" d={fullMark.d} />
          </svg>
          <span style={{ color: "#a1a1aa", fontSize: "20px", fontWeight: 600 }}>
            asaied<span style={{ color: "#8e8e98" }}>.dev</span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: ar ? "flex-end" : "stretch",
            gap: "18px",
            maxWidth: "1020px",
            ...(ar ? { marginLeft: "auto" } : {}),
          }}
        >
          {eyebrow && (
            <div
              style={
                ar
                  ? { display: "flex", color: "#a1a1aa", fontSize: "20px", fontWeight: 700 }
                  : { color: "#a1a1aa", fontSize: "16px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase" }
              }
            >
              {text(eyebrow, 20)}
            </div>
          )}
          <div
            style={{
              display: "flex",
              fontSize: `${titleSize}px`,
              fontWeight: ar ? 700 : 900,
              color: "#ffffff",
              // Arabic needs room above and below the letters; letter-spacing would break the joins.
              lineHeight: ar ? 1.3 : 1.08,
              letterSpacing: ar ? "0px" : "-1.5px",
            }}
          >
            {text(title, titleSize)}
          </div>
          {subtitle && (
            <div style={{ display: "flex", fontSize: "26px", color: "#a1a1aa", fontWeight: 500, lineHeight: ar ? 1.5 : 1.35 }}>
              {text(subtitle, 26)}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: ar ? "row-reverse" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: ar ? "row-reverse" : "row", gap: "10px", flexWrap: "wrap" }}>
            {tags.slice(0, 5).map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "7px 16px",
                  border: "1px solid #3f3f46",
                  borderRadius: "999px",
                  color: "#a1a1aa",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                {text(tag, 15)}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", color: "#8e8e98", fontSize: "17px", fontWeight: 500 }}>
            {text(footer ?? (ar ? uiAr.site.name : site.name), 17)}
          </div>
        </div>
      </div>
    ),
    { ...ogSize, ...(ar ? { fonts: await loadArabicFonts() } : {}) },
  );
}
