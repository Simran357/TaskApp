import { Request, Response } from "express";
import noteSchema from "./Schema/index";

interface FavTaskParams {
  id: string;
}

interface FavTaskBody {
  favorite: boolean;
}

const FavTask = async (
  req: Request<FavTaskParams, unknown, FavTaskBody>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    console.log("favtask id", id, "favorite:", favorite);

    const updatedTask = await noteSchema.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );

    if (!updatedTask) {
      res.status(404).json({
        message: "Task not found",
      });
      return;
    }

    res.status(200).json({
      message: "Task favorite status updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export default FavTask;