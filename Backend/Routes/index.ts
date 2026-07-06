import express from "express";

import {
  AddTask,
  GetTask,
  UpdateTask,
  DeleteTask,
  completeTask,
  FavTask,
} from "../controller/notesController.js";
import { validateRequestBody } from "../middleware/validatedRequestBody.js";
const router = express.Router();

router.post("/AddTask",validateRequestBody, AddTask);
router.get("/GetTask", GetTask);
router.put("/UpdateTask/:id", validateRequestBody, UpdateTask);
router.delete("/DeleteTask/:id", DeleteTask);
router.put("/completeTask/:id", validateRequestBody, completeTask);
router.put("/FavTask/:id", validateRequestBody, FavTask);
console.log("Router is working");
export default router;