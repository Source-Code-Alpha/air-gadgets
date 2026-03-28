"use client";

import { Cpu, Eye, Heart, Zap } from "lucide-react";

const team = [
  { name: "Alex Chen", role: "CEO & Founder", avatar: "AC" },
  { name: "Sarah Miller", role: "Head of Product", avatar: "SM" },
  { name: "James Park", role: "Lead Engineer", avatar: "JP" },
  { name: "Emily Rodriguez", role: "Design Director", avatar: "ER" },
];

const values = [
  {
    icon: Zap,
    title: "Innovation First",
    description: "We push the boundaries of what smart home technology can do, making the future accessible today.",
    accent: "#0080FF",
  },
  {
    icon: Heart,
    title: "Customer Obsessed",
    description: "Every product we curate is tested, reviewed, and chosen with our customers' needs in mind.",
    accent: "#00D4FF",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Honest pricing, clear specifications, and straightforward return policies. No surprises.",
    accent: "#7C3AED",
  },
  {
    icon: Cpu,
    title: "Quality Standards",
    description: "We partner with top-tier manufacturers and rigorously test every product before listing.",
    accent: "#06B6D4",
  },
];

const stats = [
  { value: "5K+", label: "Happy Customers" },
  { value: "200+", label: "Products" },
  { value: "4.9", label: "Average Rating" },
  { value: "24/7", label: "Support" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 mesh-bg-2" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-[#0080FF]/[0.06] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
            <span className="text-white">Making Homes </span>
            <span className="gradient-text">Smarter</span>
            <span className="text-white">, One Gadget at a Time</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
            Founded in 2024, Air Gadgets was born from a simple belief: smart
            home technology shouldn&apos;t be complicated or overpriced. We
            curate the finest smart home products and deliver them with
            exceptional service.
          </p>
        </div>

        <div className="section-divider mt-16" />
      </section>

      {/* Story + Stats */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold">
              <span className="gradient-text-wide">Our Story</span>
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                It started in a small apartment filled with too many smart
                devices and not enough patience. Our founder, Alex, spent
                months researching, buying, and returning smart home gadgets
                — most of which didn&apos;t live up to their promises.
              </p>
              <p>
                That frustration became the spark for Air Gadgets. We set out
                to build a store where every product is hand-picked, thoroughly
                tested, and genuinely worth your investment. No gimmicks, no
                inflated prices — just technology that works.
              </p>
              <p>
                Today, we serve thousands of customers who trust us to bring
                the best smart home technology directly to their doorstep.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => {
              const colors = ["#0080FF", "#00D4FF", "#7C3AED", "#06B6D4"];
              const color = colors[idx % colors.length];
              return (
                <div
                  key={stat.label}
                  className="glass-card p-6 text-center transition-all duration-500 hover:scale-[1.03]"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${color}40`;
                    e.currentTarget.style.boxShadow = `0 0 30px ${color}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <p className="text-3xl font-bold" style={{ color }}>{stat.value}</p>
                  <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 mesh-bg-3" />
        <div className="absolute inset-0 bg-grid" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">
            <span className="gradient-text-purple">What Drives Us</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="glass-card p-6 transition-all duration-500 hover:scale-[1.03]"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${v.accent}40`;
                  e.currentTarget.style.boxShadow = `0 0 30px ${v.accent}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${v.accent}12`, color: v.accent }}
                >
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{v.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold">
          <span className="gradient-text">Meet the Team</span>
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, idx) => {
            const colors = ["#0080FF", "#00D4FF", "#7C3AED", "#06B6D4"];
            const color = colors[idx % colors.length];
            return (
              <div
                key={member.name}
                className="glass-card flex flex-col items-center p-6 text-center transition-all duration-500 hover:scale-[1.03]"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${color}40`;
                  e.currentTarget.style.boxShadow = `0 0 30px ${color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="mb-4 flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold"
                  style={{ backgroundColor: `${color}12`, color }}
                >
                  {member.avatar}
                </div>
                <h3 className="text-base font-semibold text-white">{member.name}</h3>
                <p className="mt-1 text-sm text-gray-400">{member.role}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
