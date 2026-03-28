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
  const imageUrl = product.image || product.images?.[0] || "https://placehold.co/400x400/0a1628/0080FF?text=No+Image";

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
    <div className="group relative overflow-hidden rounded-2xl glass-card transition-all duration-500 hover:scale-[1.03] hover:border-[#0080FF]/30 hover:shadow-[0_0_40px_rgba(0,128,255,0.12),0_8px_32px_rgba(0,0,0,0.4)]">
      {/* Image section */}
      <div className="relative aspect-square overflow-hidden bg-[#0a1628]">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent opacity-60" />

        {/* Price badge floating on image */}
        <div className="absolute top-3 right-3 rounded-lg bg-[#0080FF]/90 backdrop-blur-sm px-3 py-1.5 text-sm font-bold text-white shadow-lg">
          ${product.price.toFixed(2)}
        </div>

        {/* Compare price badge */}
        {product.compareAtPrice && (
          <div className="absolute top-3 left-3 rounded-lg bg-red-500/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-white">
            Save ${(product.compareAtPrice - product.price).toFixed(0)}
          </div>
        )}

        {/* Add to cart - slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(cartProduct);
            }}
            className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-[#0080FF] to-[#00D4FF] py-3 text-sm font-semibold text-white transition-all hover:from-[#0066cc] hover:to-[#00B4DD]"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info section */}
      <div className="p-5">
        <h3 className="mb-1 text-base font-semibold text-white transition-colors group-hover:text-[#00D4FF]">
          {product.name}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-gray-400">
          {product.shortDescription}
        </p>

        {product.compareAtPrice && (
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-gray-500 line-through">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Hover glow overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(0,128,255,0.08), transparent 70%)",
        }}
      />
    </div>
  );
}
