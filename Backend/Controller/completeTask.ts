import express from "express";
import type { Request, Response } from "express";

import AddTask from "./AddTask.js";
import GetTask from "./GetTask.js";
import UpdateTask from "./UpdateTask.js";
import DeleteTask from "./DeleteTask.js";
import CompleteTask from "./completeTask.js";

const router = express.Router();

router.post("/AddTask", AddTask);
router.get("/GetTask", GetTask);
router.put("/UpdateTask/:id", UpdateTask);
router.delete("/DeleteTask/:id", DeleteTask);
router.put("/completeTask/:id", CompleteTask);

console.log("Router is working");

router.get("/test", (req: Request, res: Response): void => {
  res.send("Router is working");
});

export default router;