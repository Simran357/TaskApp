import type { Request, Response } from "express";
import noteSchema from "./Schema/index.js";

interface DeleteTaskParams {
  id: string;
}

const DeleteTask = async (
  req: Request<DeleteTaskParams>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    console.log("Delete task id:", id);

    const deletedTask = await noteSchema.findByIdAndDelete(id);

    if (!deletedTask) {
      res.status(404).json({
        message: "Task not found",
      });
      return;
    }

    res.status(200).json({
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export default DeleteTask;