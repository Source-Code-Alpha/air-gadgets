"use client";

import { useState } from "react";
import { Send } from "lucide-react";

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
    <section className="bg-gradient-to-r from-[#0080FF]/20 to-[#0a0a0a] py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
          Stay Updated
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
            className="flex-1 rounded-xl border border-[#1f2937] bg-[#111827] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-[#0080FF]"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0080FF] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0066cc]"
          >
            <Send className="h-4 w-4" />
            Subscribe
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-sm text-green-400">
            Thanks for subscribing! 🎉
          </p>
        )}
      </div>
    </section>
  );
}
