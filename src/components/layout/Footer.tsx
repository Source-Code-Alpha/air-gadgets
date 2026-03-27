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
    <footer className="border-t border-[#1f2937] bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/logo-transparent.png"
                alt="Air Gadgets"
                width={180}
                height={50}
                className="h-12 w-auto"
                unoptimized
              />
            </Link>
            <p className="mb-4 text-sm text-gray-400">
              Premium smart home gadgets and automation systems for the modern
              home. Elevate your living experience with cutting-edge technology.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="rounded-lg bg-[#111827] p-2 text-gray-400 transition-colors hover:bg-[#1f2937] hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Customer Service
            </h3>
            <ul className="space-y-2">
              {customerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
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
                className="flex-1 rounded-lg border border-[#1f2937] bg-[#111827] px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#0080FF]"
              />
              <button
                type="submit"
                className="rounded-lg bg-[#0080FF] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0066cc]"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-[#1f2937] pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Air Gadgets. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
