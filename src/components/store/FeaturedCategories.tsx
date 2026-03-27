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
    <section id="categories" className="bg-[#0a0a0a] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-white sm:text-4xl">
          Browse Categories
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, idx) => {
            const Icon = iconMap[cat.slug] || defaultIcons[idx % defaultIcons.length];
            return (
              <a
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-[#1f2937] bg-gradient-to-br from-[#111827] to-[#0a0a0a] p-8 transition-all duration-300 hover:scale-[1.02] hover:border-[#0080FF]/40 hover:shadow-lg hover:shadow-[#0080FF]/10"
              >
                <div className="mb-4 inline-flex rounded-xl bg-[#0080FF]/10 p-3 text-[#0080FF] transition-colors group-hover:bg-[#0080FF]/20">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-white">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {cat.productCount} products
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
