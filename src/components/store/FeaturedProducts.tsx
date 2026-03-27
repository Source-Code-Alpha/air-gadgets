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
    <section className="bg-[#0a0a0a] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-white sm:text-4xl">
          Featured Products
        </h2>

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
