import type { Request, Response } from "express";
import noteSchema from "../schema/index.js";
import { createNoteValidation } from "../validation/noteValidations.js";
import type { CompleteTaskParams, CompleteTaskBody } from "../interfaces/index.js";
import type { DeleteTaskParams } from "../interfaces/index.js";
import type { FavTaskParams, FavTaskBody } from "../interfaces/index.js";


export const AddTask = async (req: Request, res: Response): Promise<void> => {
    if (!req.body || Object.keys(req.body).length === 0) {
     res.status(400).json({
      success: false,
      message: "Request body is required.",
    });
  }
  try {
    console.log(req.body);
    const { error, value } = createNoteValidation.validate(req.body, {
  abortEarly: false,
});
    if (error) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((e) => e.message),
      });
      return;
    }
    const dbData = await noteSchema.create(value);
    res.status(201).json({
      message: "Task added successfully",
      data: dbData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};


export const completeTask = async (
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


export const DeleteTask = async (
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

export const FavTask = async (
  req: Request<FavTaskParams, {}, FavTaskBody>,
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
    const { favorite } = req.body;

    console.log("favTask id:", id, "favorite:", favorite);

    const updatedTask = await noteSchema.findByIdAndUpdate(
  id,
  { favorite },
 
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
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

export const GetTask = async (_req: Request, res: Response): Promise<void> => {
  try {
    const dbData = await noteSchema.find();
    res.status(200).json({
      message: "Task fetched successfully",
      tasks: dbData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: (error as Error).message,
    });
  }
};

import type { UpdateTaskParams, UpdateTaskBody } from "../interfaces/index.js";

export const UpdateTask = async (
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

