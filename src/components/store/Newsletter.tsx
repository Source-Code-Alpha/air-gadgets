"use client";

import { useState } from "react";
import { Send, Sparkles } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative py-28">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-cyan-900/20 pointer-events-none" />

      {/* Top decorative line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        {/* Sparkle decoration */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-cyan-300/80">
          <Sparkles className="h-4 w-4" />
          Never miss a deal
        </div>

        <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Stay Updated
          </span>
        </h2>
        <p className="mb-10 text-lg text-gray-300/70 max-w-lg mx-auto">
          Subscribe to our newsletter for the latest products, exclusive deals, and smart home tips.
        </p>

        {submitted ? (
          <div className="rounded-2xl border border-green-400/20 bg-green-400/[0.05] p-8 backdrop-blur-xl">
            <p className="text-lg font-semibold text-green-400">Thanks for subscribing! 🎉</p>
            <p className="mt-2 text-sm text-gray-400">We&apos;ll keep you updated with the latest.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) {
                setSubmitted(true);
                setEmail("");
              }
            }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 text-lg text-white placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 focus:shadow-[0_0_30px_rgba(0,200,255,0.1)]"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-4 text-lg font-bold text-white shadow-[0_0_30px_rgba(0,128,255,0.3)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,128,255,0.5)] hover:scale-105 active:scale-95"
            >
              <Send className="h-5 w-5" />
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
