import express from "express";
import { db } from "../config/db.js";
import { sql } from "drizzle-orm";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { phone_number, location, items } = req.body;
    if (!phone_number || !location || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Phone number, location, and items are required" });
    }
    await db.transaction(async (tx) => {
      let totalAmount = 0;
      for (const item of items) {
        const productQuery = sql`
          SELECT price 
          FROM products
          WHERE id = ${item.product_id} LIMIT 1
        `;
        const result = await tx.execute(productQuery);
        const rows = result.rows || result;
        if (rows.length === 0) {
          throw new Error(`Product with ID ${item.product_id} not found`);
        }
        const productPrice = rows[0].price;
        totalAmount += productPrice * item.quantity;
      }
      const orderQuery = sql`
        INSERT INTO orders (phone_number, location, total, status)
        VALUES (${phone_number}, ${location}, ${totalAmount}, 1)
        RETURNING id
      `;
      const orderResult = await tx.execute(orderQuery);
      const orderRows = orderResult.rows || orderResult;
      const newOrderId = orderRows[0].id;

      for (const item of items) {
        const itemQuery = sql`
          INSERT INTO order_items (order_id, product_id, quantity)
          VALUES (${newOrderId}, ${item.product_id}, ${item.quantity})
        `;
        await tx.execute(itemQuery);
      }
      res.status(201).json({
        message: "Order placed successfully",
        order_id: newOrderId,
        total: totalAmount,
      });
    });
  } catch (error) {
    console.error("Error placing order:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error while placing order" });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const ordersQuery = sql`SELECT * FROM orders ORDER BY id DESC`;
    const result = await db.execute(ordersQuery);
    const rows = result.rows || result;

    res.json(rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
});

export default router;
