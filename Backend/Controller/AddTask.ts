import type { Request, Response } from "express";
import noteSchema from "../schema/index.js";

const AddTask = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);
    const dbData = await noteSchema.create(req.body);
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

export default AddTask;