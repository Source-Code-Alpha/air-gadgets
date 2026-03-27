"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();

  const shipping = cartTotal >= 200 ? 0 : 15;
  const total = cartTotal + shipping;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <ShoppingBag className="mb-4 h-16 w-16 text-gray-600" />
        <h1 className="mb-2 text-2xl font-bold text-white">Your cart is empty</h1>
        <p className="mb-6 text-gray-400">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/products"
          className="rounded-lg bg-[#0080FF] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0066cc]"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-white">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 rounded-2xl border border-[#1f2937] bg-[#111827] p-4 sm:p-6"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#0a0a0a] sm:h-28 sm:w-28">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-base font-semibold text-white hover:text-[#0080FF]"
                    >
                      {item.product.name}
                    </Link>
                    <p className="mt-0.5 text-sm text-gray-400">
                      ${item.product.price.toFixed(2)} each
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-[#1f2937] bg-[#0a0a0a]">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="px-3 py-2 text-gray-400 transition-colors hover:text-white"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-medium text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="px-3 py-2 text-gray-400 transition-colors hover:text-white"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-base font-bold text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-500 transition-colors hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-[#1f2937] bg-[#111827] p-6">
            <h2 className="mb-6 text-lg font-semibold text-white">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-white">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-500">
                  Free shipping on orders over $200
                </p>
              )}
              <div className="border-t border-[#1f2937] pt-3">
                <div className="flex justify-between text-base font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-[#0080FF]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-lg bg-[#0080FF] py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#0066cc]"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
