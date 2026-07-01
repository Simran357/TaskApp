import express, { Request, Response } from "express";

import AddTask from "../Controller/AddTask";
import GetTask from "../Controller/GetTask";
import updateTask from "../Controller/UpdateTask";
import DeleteTask from "../Controller/DeleteTask";
import completeTask from "../Controller/completeTask";
import FavTask from "../Controller/FavTask";

const router = express.Router();

router.post("/AddTask", AddTask);
router.get("/GetTask", GetTask);
router.put("/UpdateTask/:id", updateTask);
router.delete("/DeleteTask/:id", DeleteTask);
router.put("/completeTask/:id", completeTask);
router.put("/FavTask/:id", FavTask);

console.log("Router is working");

router.get("/test", (req: Request, res: Response) => {
  res.send("Router is working");
});

export default router;