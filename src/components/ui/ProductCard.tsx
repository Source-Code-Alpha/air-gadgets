"use client";

import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
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
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
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
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_50px_rgba(0,200,255,0.12)]"
      style={{ willChange: "transform" }}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(400px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(0,200,255,0.1), transparent 60%)",
        }}
      />

      {/* Image section - larger */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-white/[0.02] to-white/[0.05]">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Glow halo on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(0,200,255,0.15), transparent 70%)",
          }}
        />

        {/* Sale badge */}
        {product.compareAtPrice && (
          <div className="absolute right-4 top-4 z-20 rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-red-500/30">
            SAVE ${(product.compareAtPrice - product.price).toFixed(0)}
          </div>
        )}

        {/* Rating stars */}
        <div className="absolute left-4 top-4 z-20 flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-cyan-300 line-clamp-1">
          {product.name}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-400/80 leading-relaxed flex-1">
          {product.shortDescription}
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">
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
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-105 active:scale-95"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
