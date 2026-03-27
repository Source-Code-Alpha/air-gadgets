import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.admin.upsert({
    where: { email: "admin@airgadgets.com" },
    update: {},
    create: {
      email: "admin@airgadgets.com",
      password: hashedPassword,
      name: "Admin",
      role: "SUPER_ADMIN",
    },
  });
  console.log("✅ Admin user created");

  // Create categories
  const categoriesData = [
    { name: "Smart Lighting", slug: "smart-lighting", description: "Intelligent lighting solutions for every room" },
    { name: "Security Systems", slug: "security-systems", description: "Advanced home security and surveillance" },
    { name: "Climate Control", slug: "climate-control", description: "Smart thermostats and air quality monitors" },
    { name: "Smart Speakers", slug: "smart-speakers", description: "Voice-controlled speakers and assistants" },
    { name: "Home Automation", slug: "home-automation", description: "Hubs, controllers, and automation kits" },
    { name: "Smart Kitchen", slug: "smart-kitchen", description: "Connected kitchen appliances and gadgets" },
  ];

  const categories: Record<string, string> = {};
  for (const cat of categoriesData) {
    const result = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: cat,
    });
    categories[cat.slug] = result.id;
  }
  console.log("✅ Categories created");

  // Create products
  const productsData = [
    {
      name: "Smart Hub Pro",
      slug: "smart-hub-pro",
      description: "The Smart Hub Pro is the ultimate central command center for your entire smart home ecosystem. With Matter, Zigbee, Z-Wave, and Wi-Fi support, it seamlessly connects and controls all your devices from a single interface.",
      shortDescription: "Central command center for all your smart home devices with Matter support.",
      price: 149.99,
      compareAtPrice: 199.99,
      sku: "SHP-001",
      stock: 45,
      images: JSON.stringify(["https://placehold.co/600x600/0a0a0a/0080FF?text=Smart+Hub+Pro"]),
      specs: JSON.stringify({ Connectivity: "Matter, Zigbee 3.0, Z-Wave, Wi-Fi 6", Display: "4-inch IPS Touchscreen", Processor: "Quad-core ARM Cortex-A55", Memory: "2GB RAM, 16GB Storage" }),
      featured: true,
      categorySlug: "home-automation",
    },
    {
      name: "AI Security Camera",
      slug: "ai-security-camera",
      description: "Experience next-generation home security with the AI Security Camera. Featuring 4K Ultra HD resolution, advanced AI-powered person and package detection, and enhanced color night vision.",
      shortDescription: "4K AI-powered camera with person detection and night vision.",
      price: 89.99,
      compareAtPrice: 119.99,
      sku: "ASC-001",
      stock: 32,
      images: JSON.stringify(["https://placehold.co/600x600/0a0a0a/0080FF?text=AI+Security+Camera"]),
      specs: JSON.stringify({ Resolution: "4K Ultra HD (3840×2160)", "Field of View": "160° Wide Angle", "Night Vision": "Color Night Vision up to 30ft", "Weather Rating": "IP67" }),
      featured: true,
      categorySlug: "security-systems",
    },
    {
      name: "Smart Thermostat",
      slug: "smart-thermostat",
      description: "The Smart Thermostat uses machine learning to understand your comfort preferences and daily schedule, automatically adjusting temperatures to maximize comfort while minimizing energy consumption.",
      shortDescription: "Energy-saving thermostat that learns your schedule and preferences.",
      price: 129.99,
      compareAtPrice: null,
      sku: "ST-001",
      stock: 18,
      images: JSON.stringify(["https://placehold.co/600x600/0a0a0a/0080FF?text=Smart+Thermostat"]),
      specs: JSON.stringify({ Display: "3.5-inch OLED Touch", Sensors: "Temperature, Humidity, Occupancy", Compatibility: "All 24V HVAC systems", "Energy Savings": "Up to 26%" }),
      featured: true,
      categorySlug: "climate-control",
    },
    {
      name: "Ambient Light Strip",
      slug: "ambient-light-strip",
      description: "Transform any room with the Ambient Light Strip. Featuring RGBW LEDs with 16 million colors, music sync mode, and scene presets.",
      shortDescription: "RGBW LED strip with 16 million colors and music sync mode.",
      price: 39.99,
      compareAtPrice: 54.99,
      sku: "ALS-001",
      stock: 120,
      images: JSON.stringify(["https://placehold.co/600x600/0a0a0a/0080FF?text=Ambient+Light+Strip"]),
      specs: JSON.stringify({ Length: "5 meters (extendable)", "LED Type": "RGBW SMD 5050", Colors: "16 million + Warm White", Brightness: "1200 lumens" }),
      featured: true,
      categorySlug: "smart-lighting",
    },
    {
      name: "Voice Assistant Speaker",
      slug: "voice-assistant-speaker",
      description: "The Voice Assistant Speaker delivers room-filling 360° sound with deep bass and crystal-clear highs. Built-in voice assistant support for Alexa and Google.",
      shortDescription: "Premium sound quality with built-in voice assistant and multi-room audio.",
      price: 79.99,
      compareAtPrice: null,
      sku: "VAS-001",
      stock: 67,
      images: JSON.stringify(["https://placehold.co/600x600/0a0a0a/0080FF?text=Voice+Speaker"]),
      specs: JSON.stringify({ Speaker: "40W Full-range + 20W Subwoofer", Audio: "360° Omnidirectional", Connectivity: "Wi-Fi, Bluetooth 5.2, AirPlay 2" }),
      featured: true,
      categorySlug: "smart-speakers",
    },
    {
      name: "Smart Door Lock",
      slug: "smart-door-lock",
      description: "Never fumble with keys again. The Smart Door Lock offers five ways to unlock: fingerprint, PIN code, app, voice, or traditional key backup.",
      shortDescription: "Keyless entry with fingerprint, code, and app control.",
      price: 199.99,
      compareAtPrice: 249.99,
      sku: "SDL-001",
      stock: 22,
      images: JSON.stringify(["https://placehold.co/600x600/0a0a0a/0080FF?text=Smart+Door+Lock"]),
      specs: JSON.stringify({ "Unlock Methods": "Fingerprint, PIN, App, Voice, Key", "Fingerprint Capacity": "100 fingerprints", Battery: "4× AA (12 months)", Material: "Zinc Alloy, Grade 3 Security" }),
      featured: true,
      categorySlug: "security-systems",
    },
    {
      name: "Smart Coffee Maker",
      slug: "smart-coffee-maker",
      description: "Wake up to the perfect cup every morning. The Smart Coffee Maker lets you schedule brews, customize strength, and choose from 12 drink types.",
      shortDescription: "Schedule your brew from bed. Supports 12 drink types with app control.",
      price: 159.99,
      compareAtPrice: null,
      sku: "SCM-001",
      stock: 15,
      images: JSON.stringify(["https://placehold.co/600x600/0a0a0a/0080FF?text=Smart+Coffee+Maker"]),
      specs: JSON.stringify({ "Drink Types": "12 varieties", Capacity: "1.8L Water Tank", Grinder: "Built-in Ceramic Burr", Pressure: "19 bar" }),
      featured: true,
      categorySlug: "smart-kitchen",
    },
    {
      name: "Motion Sensor Pack",
      slug: "motion-sensor-pack",
      description: "Automate your home with the Motion Sensor Pack. This set of 4 wireless sensors detects motion, temperature, and light levels for smart automations.",
      shortDescription: "Set of 4 wireless motion sensors for smart automations and alerts.",
      price: 49.99,
      compareAtPrice: 69.99,
      sku: "MSP-001",
      stock: 55,
      images: JSON.stringify(["https://placehold.co/600x600/0a0a0a/0080FF?text=Motion+Sensor+Pack"]),
      specs: JSON.stringify({ Quantity: "4 sensors per pack", Detection: "Motion, Temperature, Light", Range: "8 meters, 120° angle", Battery: "CR2450 (2 year life)" }),
      featured: false,
      categorySlug: "home-automation",
    },
  ];

  for (const product of productsData) {
    const { categorySlug, ...data } = product;
    await prisma.product.upsert({
      where: { slug: data.slug },
      update: {
        name: data.name,
        description: data.description,
        shortDescription: data.shortDescription,
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        sku: data.sku,
        stock: data.stock,
        images: data.images,
        specs: data.specs,
        featured: data.featured,
        categoryId: categories[categorySlug],
      },
      create: {
        ...data,
        categoryId: categories[categorySlug],
      },
    });
  }
  console.log("✅ Products created");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
