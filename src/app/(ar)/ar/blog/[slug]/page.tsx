import { PostPage, postMeta, postParams } from "@/screens/pages";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = postParams;

export function generateMetadata({ params }: Props) {
  return postMeta("ar", params);
}

export default function Page({ params }: Props) {
  return <PostPage locale="ar" params={params} />;
}
