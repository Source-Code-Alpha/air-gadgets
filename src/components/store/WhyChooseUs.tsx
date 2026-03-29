"use client";

import { Truck, ShieldCheck, HeadphonesIcon, RotateCcw } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on all orders over $50. Fast and reliable worldwide shipping.",
    color: "#3B82F6",
    gradient: "from-blue-500/10 to-indigo-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Your data is protected with industry-standard encryption and secure checkout.",
    color: "#06B6D4",
    gradient: "from-cyan-500/10 to-teal-500/10",
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Support",
    description: "24/7 customer support from our team of smart home specialists.",
    color: "#7C3AED",
    gradient: "from-purple-500/10 to-violet-500/10",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns on all products. No questions asked.",
    color: "#22D3EE",
    gradient: "from-sky-500/10 to-cyan-500/10",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-28">
      {/* Background shift */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/[0.04] via-transparent to-blue-900/[0.04] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why Choose Us
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-300/60">
            We&apos;re committed to providing the best smart home shopping experience
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br ${f.gradient} backdrop-blur-xl p-10 transition-all duration-500 hover:border-white/[0.15] hover:shadow-2xl`}
              >
                {/* Animated border glow on hover */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${f.color}40, 0 0 40px ${f.color}10`,
                  }}
                />

                <div
                  className="relative mb-6 inline-flex rounded-2xl p-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{ backgroundColor: `${f.color}18`, color: f.color }}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="relative mb-3 text-xl font-bold text-white">{f.title}</h3>
                <p className="relative text-base leading-relaxed text-gray-400/80">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
