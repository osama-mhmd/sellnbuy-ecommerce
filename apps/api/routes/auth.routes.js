import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js"
import { sql } from "drizzle-orm";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }
    const adminQuery = sql`
      SELECT *
      FROM admins 
      WHERE email = ${email} LIMIT 1
    `;
    const result = await db.execute(adminQuery);
    const rows = result.rows || result;

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({
      message: "Login successful",
      admin: { id: admin.id, name: admin.name, email: admin.email }
    });

  } catch (error) {
    console.error("Error in login :", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

router.get("/me", protect, async (req, res) => {
  try {
    const adminQuery = sql`
      SELECT id, name, email 
      FROM admins 
      WHERE id = ${req.admin.id} LIMIT 1
    `;
    const result = await db.execute(adminQuery);
    const rows = result.rows || result;

    if (rows.length === 0) {
      return res.status(401).json({ message: "Unauthorized - Admin not found" });
    }
    res.json({ admin: rows[0] });
  } catch (error) {
    console.error("Error in /me route :", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout :", error);
    res.status(500).json({ message: "Server error during logout" });
  }
});

export default router;
