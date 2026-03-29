"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Products Delivered" },
  { value: 50, suffix: "+", label: "Smart Home Brands" },
  { value: 24, suffix: "/7", label: "Expert Support" },
  { value: 30, suffix: "-Day", label: "Returns Policy" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Start immediately on mount AND when in view (belt and suspenders)
  useEffect(() => {
    setStarted(true);
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const duration = 2200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return (
    <div ref={ref} className="relative">
      {/* Pulsing glow behind number */}
      <div
        className="absolute inset-0 -inset-x-4 rounded-full blur-2xl"
        style={{
          background: "radial-gradient(circle, rgba(0,200,255,0.15), transparent 70%)",
          animation: "pulse-slow 3s ease-in-out infinite",
        }}
      />
      <span className="relative bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent text-6xl sm:text-7xl lg:text-8xl font-black tabular-nums tracking-tight">
        {count}{suffix}
      </span>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="relative py-24">
      {/* Background variation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/[0.04] to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-center gap-0">
          {stats.map((stat, i) => (
            <div key={i} className="relative flex flex-col items-center text-center px-8 py-8 sm:px-12 w-1/2 lg:w-1/4">
              {/* Glass divider on desktop (between items) */}
              {i > 0 && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block h-20 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              )}
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              <span className="mt-4 text-sm sm:text-base text-gray-400/80 font-medium tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
