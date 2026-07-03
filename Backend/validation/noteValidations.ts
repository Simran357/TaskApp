import Joi from "joi";

export const createNoteValidation = Joi.object({
  task: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),

  disc: Joi.string()
    .trim()
    .allow("")
    .optional(),

  completed: Joi.boolean().default(false),

  favorite: Joi.boolean().default(false),
});