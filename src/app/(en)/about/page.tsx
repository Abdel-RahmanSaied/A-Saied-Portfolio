import { AboutPage, pageMeta } from "@/screens/pages";

export const metadata = pageMeta("about", "en");

export default function Page() {
  return <AboutPage locale="en" />;
}
