"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const line1 = "Elevate Your Home";
const line2 = "with Smart Technology";

const floatingProducts = [
  { src: "/products/smart-hub-pro.png", alt: "Smart Hub Pro", top: "12%", left: "5%", delay: 0, size: 120 },
  { src: "/products/smart-thermostat.png", alt: "Smart Thermostat", top: "20%", right: "6%", delay: 0.3, size: 110 },
  { src: "/products/voice-speaker.png", alt: "Voice Speaker", bottom: "18%", left: "8%", delay: 0.6, size: 100 },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden">
      {/* Hero banner background with dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-banner.png"
          alt="Smart Home"
          fill
          className="object-cover opacity-30"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Floating product images - desktop only */}
      <div className="absolute inset-0 z-[1] hidden lg:block">
        {floatingProducts.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 1, delay: 1.5 + p.delay, ease: "easeOut" }}
            className="absolute"
            style={{
              top: p.top,
              left: p.left,
              right: (p as Record<string, unknown>).right as string | undefined,
              bottom: (p as Record<string, unknown>).bottom as string | undefined,
              animation: `float-slow ${6 + i * 2}s ease-in-out infinite`,
            }}
          >
            <div className="relative rounded-2xl bg-white/[0.05] p-3 backdrop-blur-sm border border-white/10 shadow-2xl">
              <Image
                src={p.src}
                alt={p.alt}
                width={p.size}
                height={p.size}
                className="rounded-xl"
                unoptimized
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content with parallax */}
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-6 py-2.5 text-sm font-medium text-cyan-300 backdrop-blur-md"
          style={{ animation: "float 4s ease-in-out infinite" }}
        >
          <Sparkles className="h-4 w-4" />
          Next-Gen Smart Home — Free Shipping Over $50
        </motion.div>

        {/* Line 1 - MASSIVE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-2 text-5xl font-black leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem]"
        >
          <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            {line1}
          </span>
        </motion.h1>

        {/* Line 2 - Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8 text-5xl font-black leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem]"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(0,200,255,0.3)]">
            {line2}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mx-auto mb-12 max-w-2xl text-lg text-gray-300/90 sm:text-xl md:text-2xl font-light"
        >
          Premium gadgets and automation systems that transform how you live
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <Link
            href="/products"
            className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-4 text-lg font-bold text-white shadow-[0_0_30px_rgba(0,128,255,0.4)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(0,128,255,0.6)] hover:scale-105"
          >
            Shop Now
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#categories"
            className="rounded-2xl border border-white/15 bg-white/[0.06] px-10 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
          >
            Explore Categories
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
