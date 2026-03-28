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
  { border: "rgba(0, 128, 255, 0.4)", glow: "rgba(0, 128, 255, 0.15)", text: "#0080FF" },
  { border: "rgba(0, 212, 255, 0.4)", glow: "rgba(0, 212, 255, 0.15)", text: "#00D4FF" },
  { border: "rgba(124, 58, 237, 0.4)", glow: "rgba(124, 58, 237, 0.15)", text: "#7C3AED" },
  { border: "rgba(6, 182, 212, 0.4)", glow: "rgba(6, 182, 212, 0.15)", text: "#06B6D4" },
  { border: "rgba(0, 128, 255, 0.4)", glow: "rgba(0, 128, 255, 0.15)", text: "#0080FF" },
  { border: "rgba(0, 212, 255, 0.4)", glow: "rgba(0, 212, 255, 0.15)", text: "#00D4FF" },
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
    <section id="categories" className="relative py-24 overflow-hidden">
      {/* Section mesh background */}
      <div className="absolute inset-0 mesh-bg-2" />
      <div className="absolute inset-0 bg-grid" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl">
          <span className="gradient-text">Browse Categories</span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-gray-400">
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
                className="group relative overflow-hidden rounded-2xl glass-card transition-all duration-500 hover:scale-[1.03] p-8"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = accent.border;
                  el.style.boxShadow = `0 0 40px ${accent.glow}, 0 8px 32px rgba(0,0,0,0.3)`;
                  el.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(255,255,255,0.06)";
                  el.style.boxShadow = "none";
                  el.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <div
                  className="mb-4 inline-flex rounded-xl p-3 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${accent.text}15`,
                    color: accent.text,
                  }}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-white">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {cat.productCount} products
                </p>

                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 120%, ${accent.glow}, transparent 70%)`,
                  }}
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
