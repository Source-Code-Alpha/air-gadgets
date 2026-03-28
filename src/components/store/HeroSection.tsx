"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  radius: number;
  opacity: number;
  color: string;
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 120;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticle(): Particle {
      const w = canvas?.width ?? 1920;
      return {
        x: Math.random() * w,
        y: -10,
        speed: 0.3 + Math.random() * 1.5,
        radius: 0.5 + Math.random() * 2,
        opacity: 0.2 + Math.random() * 0.6,
        color: Math.random() > 0.5 ? "#0080FF" : "#ffffff",
      };
    }

    function init() {
      resize();
      const h = canvas?.height ?? 900;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = createParticle();
        p.y = Math.random() * h;
        particles.push(p);
      }
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.speed;

        const bottomZone = canvas.height * 0.8;
        if (p.y > bottomZone) {
          p.opacity *= 0.99;
        }

        if (p.y > canvas.height || p.opacity < 0.02) {
          particles[i] = createParticle();
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color === "#ffffff"
            ? `rgba(255,255,255,${p.opacity})`
            : `rgba(0,128,255,${p.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative flex h-[90vh] min-h-[600px] items-center justify-center overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0f1d32] to-[#0a1628]" />
      {/* Radial glow accents */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0080FF]/[0.07] blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#7C3AED]/[0.05] blur-[80px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#06B6D4]/[0.05] blur-[80px]" />
      </div>

      {/* Starfall canvas - KEPT EXACTLY AS IS */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {/* Floating badge */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0080FF]/20 bg-[#0080FF]/[0.08] px-5 py-2 text-sm font-medium text-[#00D4FF] backdrop-blur-sm"
          style={{ animation: "float 4s ease-in-out infinite" }}
        >
          <Sparkles className="h-4 w-4" />
          Next-Gen Smart Home
        </div>

        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-white">Elevate Your Home with</span>{" "}
          <span className="gradient-text">Smart Technology</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 sm:text-xl">
          Premium gadgets and automation systems for the modern home
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/products"
            className="glow-btn rounded-xl px-8 py-3.5 text-base font-semibold text-white"
          >
            Shop Now
          </Link>
          <Link
            href="#categories"
            className="glass-card rounded-xl px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-[#0080FF]/30 hover:bg-white/[0.06]"
          >
            Explore Categories
          </Link>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a1628] to-transparent" />
    </section>
  );
}
