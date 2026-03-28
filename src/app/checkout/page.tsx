"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Banknote, ShoppingBag, Loader2, MapPin, CreditCard, StickyNote } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ShippingForm {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  notes: string;
}

const initialForm: ShippingForm = {
  fullName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  notes: "",
};

const steps = [
  { icon: MapPin, label: "Shipping" },
  { icon: CreditCard, label: "Payment" },
  { icon: StickyNote, label: "Notes" },
];

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<ShippingForm>(initialForm);
  const [errors, setErrors] = useState<Partial<ShippingForm>>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const shipping = cartTotal >= 200 ? 0 : 15;
  const total = cartTotal + shipping;

  const update = (field: keyof ShippingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<ShippingForm> = {};
    const required: (keyof ShippingForm)[] = [
      "fullName", "email", "phone", "street", "city", "state", "zip", "country",
    ];
    required.forEach((field) => {
      if (!form[field].trim()) newErrors[field] = "Required";
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setApiError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.fullName,
          customerEmail: form.email,
          customerPhone: form.phone,
          shippingAddress: {
            street: form.street,
            city: form.city,
            state: form.state,
            zip: form.zip,
            country: form.country,
          },
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
          notes: form.notes || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || "Failed to create order");
        return;
      }

      clearCart();
      router.push(`/order/${data.orderNumber}?email=${encodeURIComponent(form.email)}`);
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <div className="mb-4 rounded-full bg-white/[0.03] p-6">
          <ShoppingBag className="h-12 w-12 text-gray-600" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-white">Cart is empty</h1>
        <p className="mb-6 text-gray-400">Add some products before checking out.</p>
        <Link href="/products" className="glow-btn rounded-lg px-8 py-3 text-sm font-semibold text-white">
          Browse Products
        </Link>
      </div>
    );
  }

  const inputClass = (field: keyof ShippingForm) =>
    `w-full rounded-lg glass-card px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
      errors[field]
        ? "border-red-500/30 focus:border-red-500/50 focus:shadow-[0_0_20px_rgba(239,68,68,0.08)]"
        : "focus:border-[#0080FF]/40 focus:shadow-[0_0_20px_rgba(0,128,255,0.08)]"
    }`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-3xl font-bold">
        <span className="gradient-text-wide">Checkout</span>
      </h1>

      {/* Step indicators */}
      <div className="mb-8 flex items-center justify-center gap-8">
        {steps.map((step, idx) => (
          <div key={step.label} className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
              style={{
                background: "linear-gradient(135deg, #0080FF, #00D4FF)",
                boxShadow: "0 0 15px rgba(0,128,255,0.3)",
              }}
            >
              <step.icon className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-300">{step.label}</span>
            {idx < steps.length - 1 && (
              <div className="ml-4 h-px w-12 bg-gradient-to-r from-[#0080FF]/30 to-transparent" />
            )}
          </div>
        ))}
      </div>

      {apiError && (
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="glass-card p-6">
              <h2 className="mb-6 text-lg font-semibold gradient-text">Shipping Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm text-gray-400">Full Name *</label>
                  <input type="text" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="John Doe" className={inputClass("fullName")} />
                  {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="john@example.com" className={inputClass("email")} />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">Phone *</label>
                  <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 234 567 8900" className={inputClass("phone")} />
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm text-gray-400">Street Address *</label>
                  <input type="text" value={form.street} onChange={(e) => update("street", e.target.value)} placeholder="123 Main Street" className={inputClass("street")} />
                  {errors.street && <p className="mt-1 text-xs text-red-400">{errors.street}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">City *</label>
                  <input type="text" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="New York" className={inputClass("city")} />
                  {errors.city && <p className="mt-1 text-xs text-red-400">{errors.city}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">State / Province *</label>
                  <input type="text" value={form.state} onChange={(e) => update("state", e.target.value)} placeholder="NY" className={inputClass("state")} />
                  {errors.state && <p className="mt-1 text-xs text-red-400">{errors.state}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">ZIP / Postal Code *</label>
                  <input type="text" value={form.zip} onChange={(e) => update("zip", e.target.value)} placeholder="10001" className={inputClass("zip")} />
                  {errors.zip && <p className="mt-1 text-xs text-red-400">{errors.zip}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-gray-400">Country *</label>
                  <input type="text" value={form.country} onChange={(e) => update("country", e.target.value)} placeholder="United States" className={inputClass("country")} />
                  {errors.country && <p className="mt-1 text-xs text-red-400">{errors.country}</p>}
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="mb-4 text-lg font-semibold gradient-text">Payment Method</h2>
              <div className="flex items-center gap-3 rounded-lg border border-[#0080FF]/30 p-4" style={{ background: "rgba(0,128,255,0.05)" }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, #0080FF, #00D4FF)" }}>
                  <Banknote className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Cash on Delivery</p>
                  <p className="text-xs text-gray-400">Pay when your order arrives</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="mb-4 text-lg font-semibold gradient-text">
                Order Notes <span className="text-sm font-normal text-gray-500">(optional)</span>
              </h2>
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Special delivery instructions, gift notes, etc."
                rows={3}
                className="w-full rounded-lg glass-card px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#0080FF]/40 focus:outline-none focus:shadow-[0_0_20px_rgba(0,128,255,0.08)] transition-all duration-300"
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 glass-card rounded-2xl p-6" style={{
              background: "linear-gradient(180deg, rgba(0,128,255,0.04), rgba(255,255,255,0.03))",
            }}>
              <h2 className="mb-6 text-lg font-semibold gradient-text">Order Summary</h2>
              <div className="mb-4 max-h-64 space-y-3 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#0a1628]">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between">
                      <div>
                        <p className="truncate text-sm text-white">{item.product.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="shrink-0 text-sm font-medium text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-white/[0.06] pt-4 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-white">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && <p className="text-xs text-gray-500">Free shipping on orders over $200</p>}
                <div className="section-divider" />
                <div className="pt-3">
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-white">Total</span>
                    <span className="gradient-text">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="glow-btn mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" />Processing...</>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
