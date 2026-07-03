import express from "express";
import AddTask from "../controller/addTask.js";
import GetTask from "../controller/getTask.js";
import updateTask from "../controller/updateTask.js";
import DeleteTask from "../controller/deleteTask.js";
import completeTask from "../controller/completeTask.js";
import FavTask from "../controller/favTask.js";
const router = express.Router();

router.post("/AddTask", AddTask);
router.get("/GetTask", GetTask);
router.put("/UpdateTask/:id", updateTask);
router.delete("/DeleteTask/:id", DeleteTask);
router.put("/completeTask/:id", completeTask);
router.put("/FavTask/:id", FavTask);

console.log("Router is working");



export default router;