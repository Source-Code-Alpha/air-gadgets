"use client";

import { Truck, ShieldCheck, HeadphonesIcon, RotateCcw } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on all orders over $50. Fast and reliable.",
    color: "#3B82F6",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Your data is protected with industry-standard encryption.",
    color: "#06B6D4",
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Support",
    description: "24/7 customer support from our smart home specialists.",
    color: "#7C3AED",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns on all products.",
    color: "#22D3EE",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Why Choose Us
          </span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-gray-300/60">
          We&apos;re committed to providing the best smart home shopping experience
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.05]"
              >
                <div
                  className="mb-4 inline-flex rounded-xl p-3 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${f.color}15`, color: f.color }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400/70">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
