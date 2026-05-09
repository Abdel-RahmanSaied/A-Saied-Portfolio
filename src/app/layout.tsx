import "./globals.css";
import Navbar from "@/components/Navbar";
import CursorFollower from "@/components/CursorFollower";
import ScrollProgress from "@/components/ScrollProgress";
import Script from "next/script";

export const metadata = {
  title: "Abdel-Rahman Saied | Backend Architect & Team Lead",
  description: "Senior Software Engineer & Team Lead specializing in scalable backend systems, real-time data pipelines, and API security tooling.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "Abdel-Rahman Saied | Backend Architect & Team Lead",
    description: "Senior Software Engineer & Team Lead specializing in scalable backend systems, real-time data pipelines, and API security tooling.",
    url: "https://www.asaied.dev",
    siteName: "asaied.dev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdel-Rahman Saied | Backend Architect & Team Lead",
    description: "Senior Software Engineer & Team Lead specializing in scalable backend systems, real-time data pipelines, and API security tooling.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3XVC5T3GZE" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3XVC5T3GZE');
        `}</Script>
        <ScrollProgress />
        <CursorFollower />
        <Navbar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}