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
    description:
      "We push the boundaries of what smart home technology can do, making the future accessible today.",
  },
  {
    icon: Heart,
    title: "Customer Obsessed",
    description:
      "Every product we curate is tested, reviewed, and chosen with our customers' needs in mind.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Honest pricing, clear specifications, and straightforward return policies. No surprises.",
  },
  {
    icon: Cpu,
    title: "Quality Standards",
    description:
      "We partner with top-tier manufacturers and rigorously test every product before listing.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#1f2937] bg-gradient-to-b from-[#0080FF]/5 to-transparent py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
            Making Homes{" "}
            <span className="text-[#0080FF]">Smarter</span>, One Gadget
            at a Time
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
            Founded in 2024, Air Gadgets was born from a simple belief: smart
            home technology shouldn&apos;t be complicated or overpriced. We
            curate the finest smart home products and deliver them with
            exceptional service.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-white">Our Story</h2>
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
            <div className="rounded-2xl border border-[#1f2937] bg-[#111827] p-6 text-center">
              <p className="text-3xl font-bold text-[#0080FF]">5K+</p>
              <p className="mt-1 text-sm text-gray-400">Happy Customers</p>
            </div>
            <div className="rounded-2xl border border-[#1f2937] bg-[#111827] p-6 text-center">
              <p className="text-3xl font-bold text-[#0080FF]">200+</p>
              <p className="mt-1 text-sm text-gray-400">Products</p>
            </div>
            <div className="rounded-2xl border border-[#1f2937] bg-[#111827] p-6 text-center">
              <p className="text-3xl font-bold text-[#0080FF]">4.9</p>
              <p className="mt-1 text-sm text-gray-400">Average Rating</p>
            </div>
            <div className="rounded-2xl border border-[#1f2937] bg-[#111827] p-6 text-center">
              <p className="text-3xl font-bold text-[#0080FF]">24/7</p>
              <p className="mt-1 text-sm text-gray-400">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="border-y border-[#1f2937] bg-[#111827]/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            What Drives Us
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-[#1f2937] bg-[#0a0a0a] p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0080FF]/10">
                  <v.icon className="h-6 w-6 text-[#0080FF]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          Meet the Team
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center rounded-2xl border border-[#1f2937] bg-[#111827] p-6 text-center"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#0080FF]/10 text-xl font-bold text-[#0080FF]">
                {member.avatar}
              </div>
              <h3 className="text-base font-semibold text-white">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
