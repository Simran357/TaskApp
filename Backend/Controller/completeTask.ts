import express from "express";

import AddTask from "./AddTask";
import GetTask from "./GetTask";
import updateTask from "./UpdateTask";
import DeleteTask from "./DeleteTask";
import completeTask from "./completeTask";

const router = express.Router();

router.post("/AddTask", AddTask);
router.get("/GetTask", GetTask);
router.put("/UpdateTask/:id", updateTask);
router.delete("/DeleteTask/:id", DeleteTask);
router.put("/completeTask/:id", completeTask);

console.log("Router is working");

router.get("/test", (req: express.Request, res: express.Response): void => {
  res.send("Router is working");
});

export default router;