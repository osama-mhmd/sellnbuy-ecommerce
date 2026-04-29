import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authRouter, imagesRouter } from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.use("/auth", authRouter);
app.use("/images", imagesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
