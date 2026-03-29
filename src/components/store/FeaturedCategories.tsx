"use client";

import { useEffect, useState } from "react";
import {
  Lightbulb,
  Shield,
  Thermometer,
  Speaker,
  Cpu,
  ChefHat,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  "smart-lighting": Lightbulb,
  "security-systems": Shield,
  "climate-control": Thermometer,
  "smart-speakers": Speaker,
  "home-automation": Cpu,
  "smart-kitchen": ChefHat,
};

const defaultIcons = [Lightbulb, Shield, Thermometer, Speaker, Cpu, ChefHat];

const accentColors = [
  { gradient: "from-cyan-500/20 to-blue-600/20", border: "hover:border-cyan-400/40", text: "#00C8FF", glow: "rgba(0, 200, 255, 0.15)" },
  { gradient: "from-purple-500/20 to-violet-600/20", border: "hover:border-purple-400/40", text: "#7C3AED", glow: "rgba(124, 58, 237, 0.15)" },
  { gradient: "from-teal-500/20 to-cyan-600/20", border: "hover:border-teal-400/40", text: "#06B6D4", glow: "rgba(6, 182, 212, 0.15)" },
  { gradient: "from-blue-500/20 to-indigo-600/20", border: "hover:border-blue-400/40", text: "#3B82F6", glow: "rgba(59, 130, 246, 0.15)" },
  { gradient: "from-fuchsia-500/20 to-purple-600/20", border: "hover:border-fuchsia-400/40", text: "#A855F7", glow: "rgba(168, 85, 247, 0.15)" },
  { gradient: "from-sky-500/20 to-cyan-600/20", border: "hover:border-sky-400/40", text: "#22D3EE", glow: "rgba(34, 211, 238, 0.15)" },
];

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  productCount: number;
}

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  if (categories.length === 0) return null;

  return (
    <section id="categories" className="relative py-28">
      {/* Background shift */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/[0.05] to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Browse Categories
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-300/60">
            Discover our curated collection of smart home technology
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, idx) => {
            const Icon = iconMap[cat.slug] || defaultIcons[idx % defaultIcons.length];
            const accent = accentColors[idx % accentColors.length];
            return (
              <a
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br ${accent.gradient} backdrop-blur-xl p-10 transition-all duration-500 hover:scale-[1.03] ${accent.border} hover:shadow-2xl`}
                style={{
                  ["--cat-glow" as string]: accent.glow,
                }}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 60px ${accent.glow}` }}
                />

                <div
                  className="relative mb-6 inline-flex rounded-2xl p-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{ backgroundColor: `${accent.text}20`, color: accent.text }}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="relative mb-2 text-xl font-bold text-white">{cat.name}</h3>
                <p className="relative text-sm text-gray-400/80">{cat.productCount} products</p>

                {/* Arrow indicator */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-[-10px]">
                  <svg className="h-6 w-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
