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
  { glow: "rgba(0, 200, 255, 0.12)", text: "#00C8FF" },
  { glow: "rgba(124, 58, 237, 0.12)", text: "#7C3AED" },
  { glow: "rgba(6, 182, 212, 0.12)", text: "#06B6D4" },
  { glow: "rgba(59, 130, 246, 0.12)", text: "#3B82F6" },
  { glow: "rgba(168, 85, 247, 0.12)", text: "#A855F7" },
  { glow: "rgba(34, 211, 238, 0.12)", text: "#22D3EE" },
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
                className="group relative overflow-hidden rounded-2xl p-[1px] transition-all duration-500 hover:scale-[1.02] animated-gradient-border"
              >
                <div className="relative rounded-2xl bg-white/[0.03] backdrop-blur-xl p-8 h-full">
                  <div
                    className="mb-4 inline-flex rounded-xl p-3 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${accent.text}15`, color: accent.text }}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-white">{cat.name}</h3>
                  <p className="text-sm text-gray-400/70">{cat.productCount} products</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
