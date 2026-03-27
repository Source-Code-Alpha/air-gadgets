export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  shortDescription: string;
  description?: string;
  image: string;
  images?: string[];
  categoryId: string;
  featured: boolean;
  specs?: Record<string, string>;
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Smart Lighting",
    slug: "smart-lighting",
    description: "Intelligent lighting solutions for every room",
    productCount: 12,
  },
  {
    id: "cat-2",
    name: "Security Systems",
    slug: "security-systems",
    description: "Advanced home security and surveillance",
    productCount: 8,
  },
  {
    id: "cat-3",
    name: "Climate Control",
    slug: "climate-control",
    description: "Smart thermostats and air quality monitors",
    productCount: 6,
  },
  {
    id: "cat-4",
    name: "Smart Speakers",
    slug: "smart-speakers",
    description: "Voice-controlled speakers and assistants",
    productCount: 10,
  },
  {
    id: "cat-5",
    name: "Home Automation",
    slug: "home-automation",
    description: "Hubs, controllers, and automation kits",
    productCount: 15,
  },
  {
    id: "cat-6",
    name: "Smart Kitchen",
    slug: "smart-kitchen",
    description: "Connected kitchen appliances and gadgets",
    productCount: 9,
  },
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Smart Hub Pro",
    slug: "smart-hub-pro",
    price: 149.99,
    compareAtPrice: 199.99,
    shortDescription:
      "Central command center for all your smart home devices with Matter support.",
    description:
      "The Smart Hub Pro is the ultimate central command center for your entire smart home ecosystem. With Matter, Zigbee, Z-Wave, and Wi-Fi support, it seamlessly connects and controls all your devices from a single interface. The built-in 4-inch touchscreen provides quick access to scenes, automations, and device controls. Advanced AI learns your routines and suggests automations to save energy and enhance comfort.",
    image:
      "https://placehold.co/400x400/0a0a0a/0080FF?text=Smart+Hub+Pro",
    images: [
      "https://placehold.co/600x600/0a0a0a/0080FF?text=Smart+Hub+Pro+1",
      "https://placehold.co/600x600/111827/0080FF?text=Smart+Hub+Pro+2",
      "https://placehold.co/600x600/1f2937/0080FF?text=Smart+Hub+Pro+3",
      "https://placehold.co/600x600/0a0a0a/00B4D8?text=Smart+Hub+Pro+4",
    ],
    specs: { "Connectivity": "Matter, Zigbee 3.0, Z-Wave, Wi-Fi 6, Bluetooth 5.2", "Display": "4-inch IPS Touchscreen", "Processor": "Quad-core ARM Cortex-A55", "Memory": "2GB RAM, 16GB Storage", "Power": "USB-C, 5V/2A", "Dimensions": "120 × 120 × 35 mm", "Weight": "280g" },
    categoryId: "cat-5",
    featured: true,
    createdAt: "2026-01-15",
  },
  {
    id: "prod-2",
    name: "AI Security Camera",
    slug: "ai-security-camera",
    price: 89.99,
    compareAtPrice: 119.99,
    shortDescription:
      "4K AI-powered camera with person detection and night vision.",
    description:
      "Experience next-generation home security with the AI Security Camera. Featuring 4K Ultra HD resolution, advanced AI-powered person and package detection, and enhanced color night vision, this camera delivers crystal-clear footage 24/7. Two-way audio lets you communicate with visitors, while local storage ensures your data stays private. Weatherproof design makes it perfect for both indoor and outdoor use.",
    image:
      "https://placehold.co/400x400/0a0a0a/0080FF?text=AI+Security+Camera",
    images: [
      "https://placehold.co/600x600/0a0a0a/0080FF?text=AI+Camera+1",
      "https://placehold.co/600x600/111827/0080FF?text=AI+Camera+2",
      "https://placehold.co/600x600/1f2937/0080FF?text=AI+Camera+3",
    ],
    specs: { "Resolution": "4K Ultra HD (3840×2160)", "Field of View": "160° Wide Angle", "Night Vision": "Color Night Vision up to 30ft", "Storage": "microSD (up to 256GB) + Cloud", "Connectivity": "Wi-Fi 6, Ethernet", "Weather Rating": "IP67", "Audio": "Two-way with noise cancellation" },
    categoryId: "cat-2",
    featured: true,
    createdAt: "2026-02-01",
  },
  {
    id: "prod-3",
    name: "Smart Thermostat",
    slug: "smart-thermostat",
    price: 129.99,
    shortDescription:
      "Energy-saving thermostat that learns your schedule and preferences.",
    description:
      "The Smart Thermostat uses machine learning to understand your comfort preferences and daily schedule, automatically adjusting temperatures to maximize comfort while minimizing energy consumption. The sleek OLED display shows real-time temperature, humidity, and air quality data. Compatible with all major HVAC systems and voice assistants.",
    image:
      "https://placehold.co/400x400/0a0a0a/0080FF?text=Smart+Thermostat",
    images: [
      "https://placehold.co/600x600/0a0a0a/0080FF?text=Thermostat+1",
      "https://placehold.co/600x600/111827/0080FF?text=Thermostat+2",
      "https://placehold.co/600x600/1f2937/0080FF?text=Thermostat+3",
    ],
    specs: { "Display": "3.5-inch OLED Touch", "Sensors": "Temperature, Humidity, Occupancy, Air Quality", "Compatibility": "All 24V HVAC systems", "Connectivity": "Wi-Fi 6, Bluetooth 5.0", "Voice Assistants": "Alexa, Google, Siri", "Power": "24V C-wire or Battery backup", "Energy Savings": "Up to 26% on heating/cooling" },
    categoryId: "cat-3",
    featured: true,
    createdAt: "2026-01-20",
  },
  {
    id: "prod-4",
    name: "Ambient Light Strip",
    slug: "ambient-light-strip",
    price: 39.99,
    compareAtPrice: 54.99,
    shortDescription:
      "RGBW LED strip with 16 million colors and music sync mode.",
    description:
      "Transform any room with the Ambient Light Strip. Featuring RGBW LEDs with 16 million colors, music sync mode, and scene presets, this 5-meter strip brings life to your living space. Easy adhesive backing and flexible design lets you install it anywhere—behind TVs, under cabinets, along stairs. Control with the app, voice, or included remote.",
    image:
      "https://placehold.co/400x400/0a0a0a/0080FF?text=Ambient+Light+Strip",
    images: [
      "https://placehold.co/600x600/0a0a0a/0080FF?text=Light+Strip+1",
      "https://placehold.co/600x600/111827/0080FF?text=Light+Strip+2",
      "https://placehold.co/600x600/1f2937/0080FF?text=Light+Strip+3",
    ],
    specs: { "Length": "5 meters (extendable)", "LED Type": "RGBW SMD 5050", "Colors": "16 million + Warm White", "Brightness": "1200 lumens", "Control": "App, Voice, Remote, Touch", "Lifespan": "50,000 hours", "Power": "12V DC Adapter included" },
    categoryId: "cat-1",
    featured: true,
    createdAt: "2026-02-10",
  },
  {
    id: "prod-5",
    name: "Voice Assistant Speaker",
    slug: "voice-assistant-speaker",
    price: 79.99,
    shortDescription:
      "Premium sound quality with built-in voice assistant and multi-room audio.",
    description:
      "The Voice Assistant Speaker delivers room-filling 360° sound with deep bass and crystal-clear highs. Built-in voice assistant support for Alexa and Google means hands-free control of your music, smart home, and more. Group multiple speakers for synchronized multi-room audio throughout your home.",
    image:
      "https://placehold.co/400x400/0a0a0a/0080FF?text=Voice+Speaker",
    images: [
      "https://placehold.co/600x600/0a0a0a/0080FF?text=Speaker+1",
      "https://placehold.co/600x600/111827/0080FF?text=Speaker+2",
      "https://placehold.co/600x600/1f2937/0080FF?text=Speaker+3",
    ],
    specs: { "Speaker": "40W Full-range + 20W Subwoofer", "Audio": "360° Omnidirectional", "Connectivity": "Wi-Fi, Bluetooth 5.2, AirPlay 2", "Voice Assistants": "Alexa, Google Assistant", "Multi-room": "Yes, up to 32 speakers", "Dimensions": "150 × 150 × 200 mm", "Weight": "1.2 kg" },
    categoryId: "cat-4",
    featured: true,
    createdAt: "2026-02-15",
  },
  {
    id: "prod-6",
    name: "Smart Door Lock",
    slug: "smart-door-lock",
    price: 199.99,
    compareAtPrice: 249.99,
    shortDescription:
      "Keyless entry with fingerprint, code, and app control.",
    description:
      "Never fumble with keys again. The Smart Door Lock offers five ways to unlock: fingerprint, PIN code, app, voice, or traditional key backup. The semiconductor fingerprint sensor recognizes your print in under 0.3 seconds. Grant temporary access codes to guests, track entry logs, and receive alerts when the door is opened. Works with all standard deadbolt preparations.",
    image:
      "https://placehold.co/400x400/0a0a0a/0080FF?text=Smart+Door+Lock",
    images: [
      "https://placehold.co/600x600/0a0a0a/0080FF?text=Door+Lock+1",
      "https://placehold.co/600x600/111827/0080FF?text=Door+Lock+2",
      "https://placehold.co/600x600/1f2937/0080FF?text=Door+Lock+3",
    ],
    specs: { "Unlock Methods": "Fingerprint, PIN, App, Voice, Key", "Fingerprint Capacity": "100 fingerprints", "PIN Codes": "Up to 250", "Battery": "4× AA (12 months)", "Connectivity": "Wi-Fi + Bluetooth", "Material": "Zinc Alloy, Grade 3 Security", "Compatibility": "Standard US deadbolt" },
    categoryId: "cat-2",
    featured: true,
    createdAt: "2026-03-01",
  },
  {
    id: "prod-7",
    name: "Smart Coffee Maker",
    slug: "smart-coffee-maker",
    price: 159.99,
    shortDescription:
      "Schedule your brew from bed. Supports 12 drink types with app control.",
    description:
      "Wake up to the perfect cup every morning. The Smart Coffee Maker lets you schedule brews, customize strength, and choose from 12 drink types—all from your phone. The built-in grinder ensures freshly ground beans for every cup. Water level and bean alerts keep you stocked, and the self-cleaning cycle makes maintenance effortless.",
    image:
      "https://placehold.co/400x400/0a0a0a/0080FF?text=Smart+Coffee+Maker",
    images: [
      "https://placehold.co/600x600/0a0a0a/0080FF?text=Coffee+Maker+1",
      "https://placehold.co/600x600/111827/0080FF?text=Coffee+Maker+2",
      "https://placehold.co/600x600/1f2937/0080FF?text=Coffee+Maker+3",
    ],
    specs: { "Drink Types": "12 (Espresso, Latte, Cappuccino, etc.)", "Capacity": "1.8L Water Tank", "Grinder": "Built-in Ceramic Burr", "Pressure": "19 bar", "Control": "App, Touch Panel, Voice", "Self-Clean": "Yes, automatic", "Dimensions": "280 × 220 × 380 mm" },
    categoryId: "cat-6",
    featured: true,
    createdAt: "2026-03-10",
  },
  {
    id: "prod-8",
    name: "Motion Sensor Pack",
    slug: "motion-sensor-pack",
    price: 49.99,
    compareAtPrice: 69.99,
    shortDescription:
      "Set of 4 wireless motion sensors for smart automations and alerts.",
    description:
      "Automate your home with the Motion Sensor Pack. This set of 4 wireless sensors detects motion, temperature, and light levels. Use them to trigger automations—turn on lights when you enter a room, receive alerts when motion is detected while away, or adjust thermostats based on room occupancy. Easy magnetic mounting, no wiring required.",
    image:
      "https://placehold.co/400x400/0a0a0a/0080FF?text=Motion+Sensor+Pack",
    images: [
      "https://placehold.co/600x600/0a0a0a/0080FF?text=Motion+Sensor+1",
      "https://placehold.co/600x600/111827/0080FF?text=Motion+Sensor+2",
      "https://placehold.co/600x600/1f2937/0080FF?text=Motion+Sensor+3",
    ],
    specs: { "Quantity": "4 sensors per pack", "Detection": "Motion, Temperature, Light", "Range": "8 meters, 120° angle", "Battery": "CR2450 (2 year life)", "Connectivity": "Zigbee 3.0", "Mounting": "Magnetic + Adhesive", "Dimensions": "45 × 45 × 18 mm each" },
    categoryId: "cat-5",
    featured: false,
    createdAt: "2026-03-15",
  },
];
