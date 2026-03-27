"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeFromCart, cartTotal, cartCount } =
    useCart();

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-[#0a0a0a] shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1f2937] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Cart ({cartCount})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 transition-colors hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Items */}
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6">
              <ShoppingBag className="mb-4 h-12 w-12 text-gray-600" />
              <p className="mb-1 text-base font-medium text-white">
                Your cart is empty
              </p>
              <p className="mb-6 text-sm text-gray-400">
                Add some products to get started
              </p>
              <button
                onClick={onClose}
                className="rounded-lg bg-[#0080FF] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0066cc]"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 rounded-xl border border-[#1f2937] bg-[#111827] p-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#0a0a0a]">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-sm font-medium text-white">
                            {item.product.name}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="shrink-0 text-gray-500 hover:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center rounded border border-[#1f2937] bg-[#0a0a0a]">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="px-2 py-1 text-gray-400 hover:text-white"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[1.5rem] text-center text-xs text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="px-2 py-1 text-gray-400 hover:text-white"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-white">
                            $
                            {(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-[#1f2937] px-6 py-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total</span>
                  <span className="text-lg font-bold text-[#0080FF]">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="flex-1 rounded-lg border border-[#1f2937] py-3 text-center text-sm font-medium text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="flex-1 rounded-lg bg-[#0080FF] py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#0066cc]"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
