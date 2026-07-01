import dns from "dns";
import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";

import router from "./Routes";

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

const PORT = 5001;

mongoose
  .connect(
    "mongodb+srv://simranjs_db_user:rwyJRG5jQSkdUyZx@cluster0.gkdih35.mongodb.net/"
  )
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("MongoDB connection error:", error.message);
  });