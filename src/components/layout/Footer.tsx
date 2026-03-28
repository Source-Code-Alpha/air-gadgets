import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/products" },
    { label: "Smart Lighting", href: "/category/smart-lighting" },
    { label: "Security Systems", href: "/category/security-systems" },
    { label: "Home Automation", href: "/category/home-automation" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "About Us", href: "/about" },
    { label: "Shipping Info", href: "#" },
    { label: "Returns", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      {/* Animated gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] footer-gradient-line" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/logo-transparent.png"
                alt="Air Gadgets"
                width={160}
                height={45}
                className="h-10 w-auto opacity-80"
                unoptimized
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-gray-400/60">
              Premium smart home gadgets and automation systems for the modern connected home.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold text-white/80">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-cyan-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-8 text-center text-sm text-gray-500/50">
          © {new Date().getFullYear()} Air Gadgets. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
