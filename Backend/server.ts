import express from "express";
import dotenv from "dotenv";
import type { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./Routes/index.js";
dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/Api", router);

const PORT: number = parseInt(process.env.PORTNO as string) 

const MONGODB_URI = process.env.MONGO_URL

const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(`${MONGODB_URI}`);

    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ MongoDB connection error:", error.message);
    } else {
      console.error("❌ Unknown error:", error);
    }
  }
};

startServer();