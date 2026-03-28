"use client";

import { useState } from "react";
import { Send, Sparkles } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(0,128,255,0.12) 0%, rgba(124,58,237,0.12) 50%, rgba(6,182,212,0.08) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-grid" />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb orb-blue" style={{ width: "300px", height: "300px", top: "-10%", right: "10%" }} />
        <div className="orb orb-purple" style={{ width: "250px", height: "250px", bottom: "-10%", left: "5%" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/20 bg-[#7C3AED]/10 px-4 py-1.5 text-sm text-[#7C3AED]">
          <Sparkles className="h-3.5 w-3.5" />
          Stay in the loop
        </div>

        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          <span className="gradient-text-purple">Stay Updated</span>
        </h2>
        <p className="mb-8 text-gray-400">
          Subscribe to our newsletter for the latest products, deals, and smart
          home tips.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 rounded-xl glass-card px-5 py-3.5 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-[#0080FF]/50 focus:shadow-[0_0_20px_rgba(0,128,255,0.1)]"
          />
          <button
            type="submit"
            className="glow-btn inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white"
          >
            <Send className="h-4 w-4" />
            Subscribe
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-sm text-[#00D4FF]">
            Thanks for subscribing! 🎉
          </p>
        )}
      </div>
    </section>
  );
}
