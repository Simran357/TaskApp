import type { Request, Response } from "express";
import noteSchema from "../schema/index.js";
import type { CompleteTaskParams, CompleteTaskBody } from "../interfaces/index.js";

const completeTask = async (
  req: Request<CompleteTaskParams, {}, CompleteTaskBody>,
  res: Response
): Promise<void> => {
    if (!req.body || Object.keys(req.body).length === 0) {
     res.status(400).json({
      success: false,
      message: "Request body is required.",
    });
  }
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