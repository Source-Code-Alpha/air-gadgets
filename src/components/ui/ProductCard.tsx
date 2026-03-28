"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRef, type MouseEvent } from "react";

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
  const cardRef = useRef<HTMLDivElement>(null);
  const imageUrl =
    product.image ||
    product.images?.[0] ||
    "https://placehold.co/400x400/111827/0080FF?text=No+Image";

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

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--spotlight-x", `${x}px`);
    card.style.setProperty("--spotlight-y", `${y}px`);
    // Tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(0,200,255,0.1)] product-card-spotlight"
      style={{ willChange: "transform" }}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(300px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(0,200,255,0.12), transparent 60%)",
        }}
      />

      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-3 left-3 rounded-lg bg-black/50 px-3 py-1.5 backdrop-blur-md">
          <span className="text-lg font-bold text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.compareAtPrice && (
            <span className="ml-2 text-xs text-gray-400 line-through">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>

        {product.compareAtPrice && (
          <div className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg">
            SAVE ${(product.compareAtPrice - product.price).toFixed(0)}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(cartProduct);
            }}
            className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-sm font-semibold text-white transition-all hover:from-blue-500 hover:to-cyan-400"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-1 text-sm font-semibold text-white transition-colors group-hover:text-cyan-300">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-xs text-gray-400/80">
          {product.shortDescription}
        </p>
      </div>
    </div>
  );
}
