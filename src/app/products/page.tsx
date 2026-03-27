"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { SlidersHorizontal, X, ChevronDown, Loader2 } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import type { ProductCardData } from "@/components/ui/ProductCard";

type SortOption = "price-asc" | "price-desc" | "newest" | "name-asc";

interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.set("category", selectedCategory);
      params.set("sort", sort);
      params.set("limit", "24");

      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const clearFilters = () => {
    setSelectedCategory("");
    setSort("newest");
  };

  const hasActiveFilters = !!selectedCategory;

  const filterPanel = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex cursor-pointer items-center gap-3 text-sm text-gray-300 hover:text-white"
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat.slug}
                onChange={() => setSelectedCategory(selectedCategory === cat.slug ? "" : cat.slug)}
                className="h-4 w-4 border-[#1f2937] bg-[#111827] text-[#0080FF] focus:ring-[#0080FF] focus:ring-offset-0"
              />
              <span>{cat.name}</span>
              <span className="ml-auto text-xs text-gray-500">{cat.productCount}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
          Sort By
        </h3>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="w-full appearance-none rounded-lg border border-[#1f2937] bg-[#111827] px-3 py-2 pr-8 text-sm text-white focus:border-[#0080FF] focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full rounded-lg border border-[#1f2937] px-4 py-2 text-sm text-gray-400 transition-colors hover:border-red-500/50 hover:text-red-400"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-gray-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-white">All Products</span>
      </nav>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">All Products</h1>
          <p className="mt-1 text-sm text-gray-400">
            {loading ? "Loading..." : `Showing ${products.length} products`}
          </p>
        </div>
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-[#1f2937] px-4 py-2 text-sm text-gray-300 transition-colors hover:border-[#0080FF] hover:text-white lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>

      {hasActiveFilters && (
        <div className="mb-6 flex flex-wrap gap-2">
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory("")}
              className="flex items-center gap-1.5 rounded-full bg-[#0080FF]/10 px-3 py-1 text-xs font-medium text-[#0080FF] transition-colors hover:bg-[#0080FF]/20"
            >
              {categories.find((c) => c.slug === selectedCategory)?.name}
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      )}

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-[#1f2937] bg-[#111827] p-6">
            {filterPanel}
          </div>
        </aside>

        <div className="flex-1">
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
              <p className="mb-2 text-lg font-medium text-white">No products found</p>
              <p className="text-sm text-gray-400">Try adjusting your filters</p>
              <button
                onClick={clearFilters}
                className="mt-4 rounded-lg bg-[#0080FF] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0066cc]"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-[#0a0a0a] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            {filterPanel}
          </div>
        </>
      )}
    </div>
  );
}
