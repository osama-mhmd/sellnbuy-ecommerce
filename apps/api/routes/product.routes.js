import express from "express";
import { db } from "../config/db.js";
import { sql } from "drizzle-orm";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const productsQuery = sql`
      SELECT * FROM products 
      ORDER BY id DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;
    const result = await db.execute(productsQuery);
    const products = result.rows || result;

    const countQuery = sql`
      SELECT COUNT(*) 
      FROM products
    `;
    const countResult = await db.execute(countQuery);
    const countRows = countResult.rows || countResult;
    const totalProducts = parseInt(countRows[0].count);

    res.json({
      products: products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalItems: totalProducts,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const query = sql`
      SELECT * 
      FROM products 
      WHERE id = ${id} LIMIT 1
    `;
    const result = await db.execute(query);
    const rows = result.rows || result;

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching single product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const body = req.body || {};
    const { title, description, price, image } = body;

    if (!title || !price || !description || !image ) {
      return res.status(400).json({ message: "Title, price, description and image are required" });
    }
    const insertQuery = sql`
      INSERT INTO products (title, description, price, image)
      VALUES (${title}, ${description}, ${price}, ${image})
      RETURNING *
    `;
    const result = await db.execute(insertQuery);
    const rows = result.rows || result;
    const newProduct = rows[0];

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error while creating product" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deleteQuery = sql`
      DELETE FROM products 
      WHERE id = ${id} RETURNING id
    `;
    const result = await db.execute(deleteQuery);
    const rows = result.rows || result;

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Product not found or already deleted" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error while deleting product" });
  }
});

export default router;
