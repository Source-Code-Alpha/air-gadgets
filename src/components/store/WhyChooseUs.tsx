import { Truck, Shield, Headphones, RotateCcw } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on all orders over $50. Fast and reliable.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Your data is protected with industry-standard encryption.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "24/7 customer support from our smart home specialists.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns on all products.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#111827] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-white sm:text-4xl">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center">
              <div className="mx-auto mb-4 inline-flex rounded-2xl bg-[#0080FF]/10 p-4 text-[#0080FF]">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {title}
              </h3>
              <p className="text-sm text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
