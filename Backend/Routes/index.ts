import express from "express";
import type { Request, Response } from "express";
import AddTask from "../Controller/AddTask.js";
import GetTask from "../Controller/GetTask.js";
import updateTask from "../Controller/UpdateTask.js";
import DeleteTask from "../Controller/DeleteTask.js";
import completeTask from "../Controller/completeTask.js";
import FavTask from "../Controller/FavTask.js";

const router = express.Router();

router.post("/AddTask", AddTask);
router.get("/GetTask", GetTask);
router.put("/UpdateTask/:id", updateTask);
router.delete("/DeleteTask/:id", DeleteTask);
router.put("/completeTask/:id", completeTask);
router.put("/FavTask/:id", FavTask);

console.log("Router is working");



export default router;