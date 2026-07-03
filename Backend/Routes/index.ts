import express from "express";

import {
  AddTask,
  GetTask,
  UpdateTask,
  DeleteTask,
  completeTask,
  FavTask,
} from "../controller/notesController.js";
const router = express.Router();

router.post("/AddTask", AddTask);
router.get("/GetTask", GetTask);
router.put("/UpdateTask/:id", UpdateTask);
router.delete("/DeleteTask/:id", DeleteTask);
router.put("/completeTask/:id", completeTask);
router.put("/FavTask/:id", FavTask);
console.log("Router is working");
export default router;