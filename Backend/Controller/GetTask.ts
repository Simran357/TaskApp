import type { Request, Response } from "express";
const noteSchema = require("./Schema/index") as {
  find: () => Promise<unknown[]>;
};

const GetTask = async (_req: Request, res: Response): Promise<void> => {
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

export default GetTask;