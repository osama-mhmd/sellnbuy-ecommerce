import express from "express";
import { sql } from "drizzle-orm";
import { db } from "../config/db.js";
import { images } from "../database/schema.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const imageQuery = sql`
      SELECT * 
      FROM images 
      WHERE id = ${id} LIMIT 1
    `;
    const result = await db.execute(imageQuery);
    const rows = result.rows || result;

    if (rows.length === 0) {
      return res.status(404).send("Not Found");
    }
    const image = rows[0];

    let imageBuffer = image.data;
    if (!Buffer.isBuffer(imageBuffer)) {
      imageBuffer = Buffer.from(imageBuffer?.data || imageBuffer);
    }
    res.setHeader("Content-Type", "image/jpeg");
    res.send(imageBuffer);

  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: "Server error while fetching image" });
  }
});

export default router;
