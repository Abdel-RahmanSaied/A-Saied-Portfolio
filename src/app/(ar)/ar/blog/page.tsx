import { BlogPage, pageMeta } from "@/screens/pages";

export const metadata = pageMeta("blog", "ar");

export default function Page() {
  return <BlogPage locale="ar" />;
}
