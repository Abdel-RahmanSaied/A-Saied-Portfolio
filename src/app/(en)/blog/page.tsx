import { BlogPage, pageMeta } from "@/screens/pages";

export const metadata = pageMeta("blog", "en");

export default function Page() {
  return <BlogPage locale="en" />;
}
