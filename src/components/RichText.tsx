import Link from "next/link";
import { localePath, type Locale, type Rich } from "@/lib/i18n";

/** Renders text with inline internal links, pointing each link at the page's own locale. */
export default function RichText({ parts, locale, linkClassName }: { parts: Rich; locale: Locale; linkClassName: string }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <Link key={i} href={localePath(locale, part.href)} className={linkClassName}>
            {part.text}
          </Link>
        ),
      )}
    </>
  );
}
