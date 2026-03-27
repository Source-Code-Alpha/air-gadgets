"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, Truck } from "lucide-react";

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderNumber = params.orderNumber as string;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">
        {/* Animated checkmark */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle className="h-12 w-12 text-green-500 animate-[pulse_1s_ease-in-out]" />
        </div>

        <h1 className="mb-2 text-3xl font-bold text-white">
          Thank you for your order!
        </h1>
        <p className="mb-8 text-gray-400">
          Your order has been placed successfully.
        </p>

        {/* Order details card */}
        <div className="mb-8 rounded-2xl border border-[#1f2937] bg-[#111827] p-6 text-left">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-400">Order Number</span>
            <span className="font-mono text-sm font-bold text-[#0080FF]">
              {orderNumber}
            </span>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-400">Payment Method</span>
            <span className="text-sm text-white">Cash on Delivery</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Status</span>
            <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
              Pending
            </span>
          </div>
        </div>

        {/* Delivery timeline */}
        <div className="mb-8 rounded-2xl border border-[#1f2937] bg-[#111827] p-6">
          <h2 className="mb-4 text-left text-sm font-semibold text-white">
            Estimated Delivery
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0080FF]/10">
                <Package className="h-5 w-5 text-[#0080FF]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">
                  Processing
                </p>
                <p className="text-xs text-gray-400">1-2 business days</p>
              </div>
            </div>
            <div className="ml-5 h-6 border-l border-dashed border-[#1f2937]" />
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500/10">
                <Truck className="h-5 w-5 text-gray-500" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">Delivery</p>
                <p className="text-xs text-gray-400">3-7 business days</p>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/products"
          className="inline-block rounded-lg bg-[#0080FF] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0066cc]"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
