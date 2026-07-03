import express from "express";
import dotenv from "dotenv";
import type { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/index.js";
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
const PORT = parseInt(process.env.PORT as string, 10);
const DATABASE_URL = process.env.DATABASE_URL;
const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(`${DATABASE_URL}`);
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(" Server is running");
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(" MongoDB connection error:", error.message);
    } else {
      console.error(" Unknown error:", error);
    }
  }
};

startServer();