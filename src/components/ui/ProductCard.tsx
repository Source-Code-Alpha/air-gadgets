"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export interface ProductCardData {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  shortDescription: string;
  description?: string;
  images: string[];
  image?: string;
  categoryId?: string;
  featured?: boolean;
  specs?: Record<string, string> | null;
}

export default function ProductCard({ product }: { product: ProductCardData }) {
  const { addToCart } = useCart();
  const imageUrl = product.image || product.images?.[0] || "https://placehold.co/400x400/111827/0080FF?text=No+Image";

  const cartProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    compareAtPrice: product.compareAtPrice ?? undefined,
    shortDescription: product.shortDescription,
    image: imageUrl,
    images: product.images,
    categoryId: product.categoryId || "",
    featured: product.featured || false,
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#1f2937] bg-[#111827] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#0080FF]/5">
      <div className="relative aspect-square overflow-hidden bg-[#0a0a0a]">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="p-5">
        <h3 className="mb-1 text-base font-semibold text-white">
          {product.name}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-gray-400">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#0080FF]">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(cartProduct);
            }}
            className="rounded-lg bg-[#0080FF] p-2.5 text-white transition-colors hover:bg-[#0066cc]"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
