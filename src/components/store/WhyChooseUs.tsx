"use client";

import { Truck, Shield, Headphones, RotateCcw } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on all orders over $50. Fast and reliable.",
    accent: "#0080FF",
    glowColor: "rgba(0, 128, 255, 0.12)",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Your data is protected with industry-standard encryption.",
    accent: "#00D4FF",
    glowColor: "rgba(0, 212, 255, 0.12)",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "24/7 customer support from our smart home specialists.",
    accent: "#7C3AED",
    glowColor: "rgba(124, 58, 237, 0.12)",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns on all products.",
    accent: "#06B6D4",
    glowColor: "rgba(6, 182, 212, 0.12)",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg-3" />
      <div className="absolute inset-0 bg-grid" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl">
          <span className="gradient-text-purple">Why Choose Us</span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-gray-400">
          We&apos;re committed to providing the best smart home shopping experience
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {badges.map(({ icon: Icon, title, description, accent, glowColor }) => (
            <div
              key={title}
              className="group glass-card p-8 transition-all duration-500 hover:scale-[1.02]"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${accent}40`;
                e.currentTarget.style.boxShadow = `0 0 40px ${glowColor}, 0 8px 32px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="flex items-start gap-5">
                <div
                  className="shrink-0 rounded-2xl p-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${accent}12`,
                    color: accent,
                  }}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
