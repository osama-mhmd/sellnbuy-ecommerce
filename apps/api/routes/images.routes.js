import express from "express";
import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { images } from "../database/schema.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const [image] = await db
    .select()
    .from(images)
    .where(eq(images.id, req.params.id));

  if (!image) return res.status(404).send("Not Found");

  res.setHeader("Content-Type", "image/jpeg");
  res.send(image.data);
});

export default router;
