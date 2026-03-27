"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingCart, ChevronRight, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ui/ProductCard";
import type { ProductCardData } from "@/components/ui/ProductCard";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice: number | null;
  sku: string;
  stock: number;
  images: string[];
  specs: Record<string, string> | null;
  featured: boolean;
  active: boolean;
  categoryId: string;
  category: { id: string; name: string; slug: string };
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setProduct(null);
        } else {
          setProduct(data);
          // Fetch related products
          fetch(`/api/products?category=${data.category.slug}&limit=4`)
            .then((r) => r.json())
            .then((rData) => {
              setRelatedProducts(
                (rData.products || []).filter((p: ProductCardData) => p.id !== data.id).slice(0, 4)
              );
            })
            .catch(console.error);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0080FF]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold text-white">Product Not Found</h1>
        <Link href="/products" className="rounded-lg bg-[#0080FF] px-6 py-3 text-sm font-medium text-white hover:bg-[#0066cc]">
          Browse Products
        </Link>
      </div>
    );
  }

  const allImages = product.images.length > 0 ? product.images : ["https://placehold.co/600x600/111827/0080FF?text=No+Image"];

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      compareAtPrice: product.compareAtPrice ?? undefined,
      shortDescription: product.shortDescription,
      image: allImages[0],
      images: product.images,
      categoryId: product.categoryId,
      featured: product.featured,
    };
    for (let i = 0; i < quantity; i++) {
      addToCart(cartProduct);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/products" className="hover:text-white">Products</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl border border-[#1f2937] bg-[#111827]">
            <Image src={allImages[selectedImage]} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    i === selectedImage ? "border-[#0080FF]" : "border-[#1f2937] hover:border-gray-500"
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <Link href={`/category/${product.category.slug}`} className="mb-2 inline-block text-sm font-medium text-[#0080FF] hover:underline">
            {product.category.name}
          </Link>
          <h1 className="mb-4 text-3xl font-bold text-white lg:text-4xl">{product.name}</h1>

          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-[#0080FF]">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">${product.compareAtPrice.toFixed(2)}</span>
                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                  Save ${(product.compareAtPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          <p className="mb-4 text-lg text-gray-300">{product.shortDescription}</p>
          <p className="mb-8 leading-relaxed text-gray-400">{product.description}</p>

          {product.stock > 0 ? (
            <p className="mb-4 text-sm text-green-400">✓ In stock ({product.stock} available)</p>
          ) : (
            <p className="mb-4 text-sm text-red-400">✗ Out of stock</p>
          )}

          <div className="mb-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-lg border border-[#1f2937] bg-[#111827]">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-4 py-3 text-gray-400 transition-colors hover:text-white">
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[3rem] text-center text-sm font-medium text-white">{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} className="px-4 py-3 text-gray-400 transition-colors hover:text-white">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex flex-1 items-center justify-center gap-3 rounded-lg bg-[#0080FF] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#0066cc] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
          </div>

          {product.specs && Object.keys(product.specs).length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-white">Specifications</h2>
              <div className="overflow-hidden rounded-xl border border-[#1f2937]">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value], i) => (
                      <tr key={key} className={i % 2 === 0 ? "bg-[#111827]" : "bg-[#0a0a0a]"}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-400">{key}</td>
                        <td className="px-4 py-3 text-sm text-white">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-white">Related Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/products/${p.slug}`}>
                <ProductCard product={p} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
