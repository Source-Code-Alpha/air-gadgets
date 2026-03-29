const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const imageMap = {
  "smart-hub-pro": "/products/smart-hub-pro.png",
  "ai-security-camera": "/products/ai-security-camera.png",
  "smart-thermostat": "/products/smart-thermostat.png",
  "ambient-light-strip": "/products/ambient-light-strip.png",
  "voice-assistant-speaker": "/products/voice-speaker.png",
  "smart-door-lock": "/products/smart-door-lock.png",
  "smart-coffee-maker": "/products/smart-coffee-maker.png",
  "motion-sensor-pack": "/products/motion-sensor-pack.png",
};

async function main() {
  for (const [slug, image] of Object.entries(imageMap)) {
    const result = await prisma.product.updateMany({
      where: { slug },
      data: { images: JSON.stringify([image]) },
    });
    console.log(`Updated ${slug}: ${result.count} row(s)`);
  }
  console.log("Done!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
