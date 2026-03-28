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
  { border: "rgba(0, 200, 255, 0.4)", glow: "rgba(0, 200, 255, 0.12)", text: "#00C8FF" },
  { border: "rgba(124, 58, 237, 0.4)", glow: "rgba(124, 58, 237, 0.12)", text: "#7C3AED" },
  { border: "rgba(6, 182, 212, 0.4)", glow: "rgba(6, 182, 212, 0.12)", text: "#06B6D4" },
  { border: "rgba(59, 130, 246, 0.4)", glow: "rgba(59, 130, 246, 0.12)", text: "#3B82F6" },
  { border: "rgba(168, 85, 247, 0.4)", glow: "rgba(168, 85, 247, 0.12)", text: "#A855F7" },
  { border: "rgba(34, 211, 238, 0.4)", glow: "rgba(34, 211, 238, 0.12)", text: "#22D3EE" },
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
    <section id="categories" className="relative py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl">
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Browse Categories
          </span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-gray-300/60">
          Discover our curated collection of smart home technology
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, idx) => {
            const Icon = iconMap[cat.slug] || defaultIcons[idx % defaultIcons.length];
            const accent = accentColors[idx % accentColors.length];
            return (
              <a
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02]"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accent.border;
                  e.currentTarget.style.boxShadow = `0 0 50px ${accent.glow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="mb-4 inline-flex rounded-xl p-3 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${accent.text}15`, color: accent.text }}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-white">{cat.name}</h3>
                <p className="text-sm text-gray-400/70">{cat.productCount} products</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
