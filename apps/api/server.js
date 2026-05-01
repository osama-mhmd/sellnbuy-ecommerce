import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { authRouter, imagesRouter, productsRouter, orderRouter } from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.use("/api/auth", authRouter);
app.use("/api/images", imagesRouter);
app.use("/api/product", productsRouter);
app.use("/api/order", orderRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
