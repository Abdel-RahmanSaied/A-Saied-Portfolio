/**
 * Renders schema.org structured data as an inline JSON-LD script tag.
 *
 * Safety: `data` is always build-time static site content authored in this
 * repo (never user/request input), it is serialized with JSON.stringify, and
 * "<" is escaped to its unicode form so the payload can never close the
 * script tag — the mitigation recommended by the Next.js JSON-LD guide.
 */
export default function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
