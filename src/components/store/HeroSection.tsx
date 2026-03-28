"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const line1Words = ["Elevate", "Your", "Home", "with"];
const line2Words = ["Smart", "Technology"];

export default function HeroSection() {
  return (
    <section className="relative flex h-[90vh] min-h-[600px] items-center justify-center overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md"
          style={{ animation: "float 4s ease-in-out infinite" }}
        >
          <Sparkles className="h-4 w-4" />
          Next-Gen Smart Home
        </motion.div>

        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-white drop-shadow-lg">
            {line1Words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </span>{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {line2Words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-gray-300/80 sm:text-xl"
        >
          Premium gadgets and automation systems for the modern home
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/products"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105"
          >
            Shop Now
          </Link>
          <Link
            href="#categories"
            className="rounded-xl border border-white/15 bg-white/[0.05] px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10"
          >
            Explore Categories
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
