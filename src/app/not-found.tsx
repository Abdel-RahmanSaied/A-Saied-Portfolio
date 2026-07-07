import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
];

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">404</p>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Page not found.</h1>
        <p className="text-zinc-500 text-sm sm:text-base leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Here are some good
          places to continue:
        </p>
        <nav className="flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
