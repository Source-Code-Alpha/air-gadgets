"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The Philips Hue setup transformed my living room. The ambiance is incredible, and the app control is seamless. Air Gadgets made the whole process effortless.",
    name: "Sarah Mitchell",
    title: "Smart Home Enthusiast",
    initials: "SM",
    accentColor: "from-cyan-400 to-blue-500",
    glowColor: "rgba(0, 200, 255, 0.1)",
  },
  {
    quote: "I was skeptical about smart security, but the Ring system from Air Gadgets changed my mind. Crystal clear video, instant alerts — I feel completely safe now.",
    name: "James Rodriguez",
    title: "Homeowner & Tech Lover",
    initials: "JR",
    accentColor: "from-purple-400 to-violet-500",
    glowColor: "rgba(124, 58, 237, 0.1)",
  },
  {
    quote: "Best customer support I've ever experienced. They helped me design an entire automation system for my apartment. Everything works like magic.",
    name: "Emily Chen",
    title: "Interior Designer",
    initials: "EC",
    accentColor: "from-blue-400 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.1)",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              What Our Customers Say
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-300/60">
            Real experiences from our smart home community
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-8 transition-all duration-500 hover:border-white/[0.15] hover:shadow-2xl"
            >
              {/* Unique accent glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{ boxShadow: `inset 0 0 60px ${t.glowColor}` }}
              />

              {/* Quote icon */}
              <Quote className="relative h-8 w-8 text-white/10 mb-6" />

              {/* Stars */}
              <div className="relative flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="relative text-base text-gray-200/90 leading-relaxed mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="relative flex items-center gap-4">
                {/* Avatar initials */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${t.accentColor} text-white font-bold text-sm shadow-lg`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-gray-400/70">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
