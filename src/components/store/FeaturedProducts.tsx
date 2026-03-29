"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import type { ProductCardData } from "@/components/ui/ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductCardData[]>([]);

  useEffect(() => {
    fetch("/api/products?featured=true&limit=6")
      .then((r) => r.json())
      .then((data) => setProducts((data.products || []).slice(0, 6)))
      .catch(console.error);
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="relative py-28">
      {/* Section background variation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/[0.04] to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-300/70">
            Handpicked smart home essentials for your connected lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>

        {/* View All link */}
        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(0,200,255,0.1)]"
          >
            View All Products
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
