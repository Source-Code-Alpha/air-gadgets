"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

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

    // Seed initial particles across the screen
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

        // Fade out near the bottom
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
    <section className="relative flex h-[90vh] min-h-[600px] items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#111827]">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Elevate Your Home with{" "}
          <span className="text-[#0080FF]">Smart Technology</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 sm:text-xl">
          Premium gadgets and automation systems for the modern home
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/products"
            className="rounded-xl bg-[#0080FF] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#0080FF]/25 transition-all hover:bg-[#0066cc] hover:shadow-[#0080FF]/40"
          >
            Shop Now
          </Link>
          <Link
            href="#categories"
            className="rounded-xl border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white/50 hover:bg-white/5"
          >
            Explore Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
