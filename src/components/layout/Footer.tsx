"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, MessageCircle, Camera, Play } from "lucide-react";

const quickLinks = [
  { href: "/products", label: "All Products" },
  { href: "/category/smart-lighting", label: "Smart Lighting" },
  { href: "/category/security-systems", label: "Security Systems" },
  { href: "/category/home-automation", label: "Home Automation" },
];

const customerLinks = [
  { href: "/contact", label: "Contact Us" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/shipping", label: "Shipping Policy" },
  { href: "/returns", label: "Returns & Refunds" },
];

const socials = [
  { icon: Globe, href: "#", label: "Facebook" },
  { icon: MessageCircle, href: "#", label: "Twitter" },
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: Play, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Top divider */}
      <div className="section-divider" />

      {/* Background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, #0a1628 0%, #0d1a2f 50%, #0a1628 100%)",
      }} />
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="/logo-transparent.png"
                alt="Air Gadgets"
                width={180}
                height={50}
                className="h-12 w-auto"
                unoptimized
              />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Premium smart home gadgets and automation systems for the modern
              home. Elevate your living experience with cutting-edge technology.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="glass-card rounded-lg p-2.5 text-gray-400 transition-all duration-300 hover:border-[#0080FF]/30 hover:text-[#00D4FF] hover:shadow-[0_0_15px_rgba(0,128,255,0.1)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider gradient-text">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-all duration-300 hover:text-white hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider gradient-text">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {customerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-all duration-300 hover:text-white hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider gradient-text">
              Newsletter
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Subscribe to get updates on new products and exclusive deals.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-lg glass-card px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-[#0080FF]/40 focus:shadow-[0_0_15px_rgba(0,128,255,0.08)]"
              />
              <button
                type="submit"
                className="glow-btn rounded-lg px-4 py-2.5 text-sm font-medium text-white"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="section-divider mt-12" />
        <div className="pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Air Gadgets. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
