"use client";

import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The Philips Hue setup transformed my living room. The ambiance is incredible, and the app control is seamless. Air Gadgets made the whole process effortless.",
    name: "Sarah Mitchell",
    title: "Smart Home Enthusiast",
  },
  {
    quote: "I was skeptical about smart security, but the Ring system from Air Gadgets changed my mind. Crystal clear video, instant alerts — I feel completely safe now.",
    name: "James Rodriguez",
    title: "Homeowner & Tech Lover",
  },
  {
    quote: "Best customer support I've ever experienced. They helped me design an entire automation system for my apartment. Everything works like magic.",
    name: "Emily Chen",
    title: "Interior Designer",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
        setFade(true);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[active];

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            What Our Customers Say
          </span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-gray-300/60">
          Real experiences from our smart home community
        </p>

        <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-10 min-h-[250px] flex flex-col items-center justify-center">
          <Quote className="h-8 w-8 text-cyan-400/40 mb-6" />
          <div className={`transition-all duration-300 ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <p className="text-lg text-gray-200/90 leading-relaxed mb-6 italic">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="font-semibold text-white">{t.name}</p>
            <p className="text-sm text-gray-400/70">{t.title}</p>
          </div>

          {/* Dots */}
          <div className="flex gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setFade(false); setTimeout(() => { setActive(i); setFade(true); }, 300); }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-cyan-400" : "w-2 bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
