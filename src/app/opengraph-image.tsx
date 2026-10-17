import { site } from "@/lib/site";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = `${site.name} — ${site.jobTitle}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    title: site.name,
    subtitle: site.jobTitle,
    tags: ["Python · Django · FastAPI", "PostgreSQL · Redis · Celery", "Elasticsearch · AWS", "Engineering leadership"],
    footer: `${site.location.city}, ${site.location.country}`,
  });
}
