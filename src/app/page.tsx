import type { Metadata } from "next";
import HomeScreen from '@/components/HomeScreen';

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
};

export default function Home() {
  return <HomeScreen />;
}
