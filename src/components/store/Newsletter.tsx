"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="relative py-24">
      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Stay Updated
          </span>
        </h2>
        <p className="mb-8 text-gray-300/60">
          Subscribe to our newsletter for the latest products, deals, and smart home tips.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setEmail("");
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3.5 text-white placeholder-gray-500 backdrop-blur-xl transition-all focus:border-cyan-400/40 focus:outline-none focus:ring-1 focus:ring-cyan-400/20"
            required
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40 hover:scale-105"
          >
            <Send className="h-4 w-4" />
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
