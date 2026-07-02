import dns from "dns";
import express from "express";
import type { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";

import router from "./Routes/index.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/Api", router);

const PORT: number = 5001;

const MONGO_URI =
  "mongodb+srv://simranjs_db_user:rwyJRG5jQSkdUyZx@cluster0.gkdih35.mongodb.net/";

const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);

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