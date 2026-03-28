"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import type { ProductCardData } from "@/components/ui/ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductCardData[]>([]);

  useEffect(() => {
    fetch("/api/products?featured=true&limit=8")
      .then((r) => r.json())
      .then((data) => setProducts(data.products || []))
      .catch(console.error);
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Mesh background */}
      <div className="absolute inset-0 mesh-bg-1" />

      {/* Radial glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#0080FF]/[0.04] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl">
          <span className="gradient-text-wide">Featured Products</span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-gray-400">
          Handpicked smart home essentials for your connected lifestyle
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
