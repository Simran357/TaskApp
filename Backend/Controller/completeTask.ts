import type { Request, Response } from "express";
import noteSchema from "../Schema/index.js";

interface CompleteTaskParams {
  id: string;
}

interface CompleteTaskBody {
  completed: boolean;
}

const completeTask = async (
  req: Request<CompleteTaskParams, {}, CompleteTaskBody>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const updatedTask = await noteSchema.findByIdAndUpdate(
      id,
      { completed },
    );

    if (!updatedTask) {
      res.status(404).json({
        success: false,
        message: "Task not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export default completeTask;