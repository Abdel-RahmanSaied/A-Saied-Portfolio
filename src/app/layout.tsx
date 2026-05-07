import "./globals.css";
import Navbar from "@/components/Navbar";
import CursorFollower from "@/components/CursorFollower";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: "Abdel-Rahman Saied | Backend Architect & Team Lead",
  description: "Senior Software Engineer & Team Lead specializing in scalable backend systems, real-time data pipelines, and API security tooling.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
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
        <ScrollProgress />
        <CursorFollower />
        <Navbar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}