import type { Request, Response } from "express";

const noteSchema = require("./Schema/index");

interface UpdateTaskParams {
  id: string;
}

interface UpdateTaskBody {
  task?: string;
  disc?: string;
  completed?: boolean;
  favorite?: boolean;
}

const UpdateTask = async (
  req: Request<UpdateTaskParams, {}, UpdateTaskBody>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const updatedTask = await noteSchema.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        returnDocument: "after",
      }
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