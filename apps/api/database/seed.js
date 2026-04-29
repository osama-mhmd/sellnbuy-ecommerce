import { db } from "../config/db.js";
import { products, images } from "./schema.js";
import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";

async function main() {
  console.log("🚀 Starting Seed with Linked Images...");

  // 1. Helper to turn a local file into a Buffer
  const getImageData = async (fileName) => {
    try {
      const filePath = path.join(
        process.cwd(),
        "database/seed-images",
        fileName,
      );
      const buffer = await fs.readFile(filePath);
      // Using the hex prefix to ensure Postgres handles it as binary
      return `\\x${buffer.toString("hex")}`;
    } catch {
      console.error(`❌ Could not find image: ${fileName}. Skipping.`);
      return null;
    }
  };

  const seedItems = [
    {
      title: "Mechanical Keyboard",
      discount: 0,
      price: 12000,
      description: "Tactile and clicky.",
      fileName: "keyboard.jpeg",
    },
    {
      title: "Gaming Mouse",
      discount: 0,
      price: 6500,
      description: "High DPI gaming mouse.",
      fileName: "mouse.jpg",
    },
  ];

  for (const item of seedItems) {
    const binaryData = await getImageData(item.fileName);

    if (binaryData) {
      console.log(`📦 Processing: ${item.title}`);

      // 2. Insert into the images table first
      const [insertedImage] = await db
        .insert(images)
        .values({
          name: item.fileName,
          data: binaryData,
        })
        .returning({ id: images.id });

      // 3. Construct the URL (e.g., /api/images/5) and insert the product
      await db.insert(products).values({
        title: item.title,
        price: item.price,
        description: item.description,
        discount: item.discount,
        image: `/api/images/${insertedImage.id}`, // Store the reference URL
      });

      console.log(`✅ Linked ${item.title} to Image ID: ${insertedImage.id}`);
    }
  }

  console.log("⭐ Seeding Complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
