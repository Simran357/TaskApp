import express from "express";
import type { Request, Response } from "express";
import AddTask from "../controller/AddTask.js";
import GetTask from "../controller/GetTask.js";
import updateTask from "../controller/UpdateTask.js";
import DeleteTask from "../controller/DeleteTask.js";
import completeTask from "../controller/completeTask.js";
import FavTask from "../controller/FavTask.js";

const router = express.Router();

router.post("/AddTask", AddTask);
router.get("/GetTask", GetTask);
router.put("/UpdateTask/:id", updateTask);
router.delete("/DeleteTask/:id", DeleteTask);
router.put("/completeTask/:id", completeTask);
router.put("/FavTask/:id", FavTask);

console.log("Router is working");



export default router;