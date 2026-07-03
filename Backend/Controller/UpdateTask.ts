import type { Request, Response } from "express";
import type { UpdateTaskParams, UpdateTaskBody } from "../interfaces/index.js";
import noteSchema from "../schema/index.js";

const UpdateTask = async (
  req: Request<UpdateTaskParams, {}, UpdateTaskBody>,
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
    const updatedTask = await noteSchema.findOneAndUpdate(
      { _id: id },
      req.body,
    );
    if (!updatedTask) {
      res.status(404).json({
        message: "Task not found",
      });
      return;
    }
    res.status(200).json({
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export default UpdateTask;