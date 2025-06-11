import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "AbdelRahman | Portfolio",
  description: "About Abdelrahman Mohamed Saied",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        <Navbar />
        <div className="pt-20">{children}</div> {/* عشان يبعد عن الـ navbar */}
      </body>
    </html>
  );
}