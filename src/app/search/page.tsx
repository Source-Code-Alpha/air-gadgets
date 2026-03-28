"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import type { ProductCardData } from "@/components/ui/ProductCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    fetch(`/api/products?search=${encodeURIComponent(initialQuery)}&limit=24`)
      .then((r) => r.json())
      .then((data) => setResults(data.products || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative mx-auto max-w-2xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl glass-card py-4 pl-12 pr-4 text-base text-white placeholder-gray-500 focus:border-[#0080FF]/40 focus:outline-none focus:shadow-[0_0_30px_rgba(0,128,255,0.1)] transition-all duration-300"
            autoFocus
          />
        </div>
      </form>

      {initialQuery ? (
        <>
          <p className="mb-6 text-sm text-gray-400">
            {loading ? "Searching..." : `${results.length} result${results.length !== 1 ? "s" : ""}`} for{" "}
            <span className="font-medium text-white">&quot;{initialQuery}&quot;</span>
          </p>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-[#0080FF]" />
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center glass-card rounded-2xl py-20">
              <Search className="mb-4 h-12 w-12 text-gray-600" />
              <p className="mb-2 text-lg font-medium text-white">No results found</p>
              <p className="mb-6 text-sm text-gray-400">Try different keywords or browse all products</p>
              <Link href="/products" className="glow-btn rounded-lg px-6 py-2.5 text-sm font-medium text-white">
                Browse All Products
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="mb-4 h-12 w-12 text-gray-600" />
          <p className="text-lg font-medium text-white">Search for products</p>
          <p className="mt-1 text-sm text-gray-400">Type a keyword to find what you&apos;re looking for</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#0080FF]" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
