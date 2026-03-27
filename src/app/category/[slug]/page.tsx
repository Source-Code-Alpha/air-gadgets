"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ChevronDown, Loader2 } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import type { ProductCardData } from "@/components/ui/ProductCard";

type SortOption = "price-asc" | "price-desc" | "newest" | "name-asc";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  productCount: number;
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [sort, setSort] = useState<SortOption>("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        const cats = Array.isArray(data) ? data : [];
        const found = cats.find((c: Category) => c.slug === slug);
        setCategory(found || null);
      })
      .catch(console.error);
  }, [slug]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?category=${slug}&sort=${sort}&limit=24`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [slug, sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (!loading && !category) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold text-white">Category Not Found</h1>
        <Link href="/products" className="rounded-lg bg-[#0080FF] px-6 py-3 text-sm font-medium text-white hover:bg-[#0066cc]">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/products" className="hover:text-white">Categories</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white">{category?.name || slug}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{category?.name || slug}</h1>
        {category?.description && <p className="mt-2 text-gray-400">{category.description}</p>}
      </div>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {loading ? "Loading..." : `${products.length} product${products.length !== 1 ? "s" : ""}`}
        </p>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="appearance-none rounded-lg border border-[#1f2937] bg-[#111827] px-4 py-2 pr-8 text-sm text-white focus:border-[#0080FF] focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#0080FF]" />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#1f2937] bg-[#111827] py-20">
          <p className="mb-2 text-lg font-medium text-white">No products in this category yet</p>
          <Link href="/products" className="mt-4 rounded-lg bg-[#0080FF] px-6 py-2 text-sm font-medium text-white hover:bg-[#0066cc]">
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
}
