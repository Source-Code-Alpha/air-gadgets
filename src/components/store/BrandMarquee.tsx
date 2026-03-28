"use client";

const brands = [
  "Google Nest",
  "Ring",
  "Philips Hue",
  "Amazon Echo",
  "Apple HomeKit",
  "Samsung SmartThings",
];

export default function BrandMarquee() {
  return (
    <section className="relative py-16 overflow-hidden">
      <p className="text-center text-sm text-gray-500/60 font-medium tracking-widest uppercase mb-8">
        Trusted by leading smart home brands
      </p>
      <div className="marquee-container">
        <div className="marquee-track">
          {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="inline-flex items-center px-6 py-3 mx-3 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl text-sm font-semibold text-gray-300/70 whitespace-nowrap hover:text-cyan-400 hover:border-cyan-400/30 transition-colors duration-300"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
