import mongoose, { Schema, Document, Model } from "mongoose";
import type { INote } from "../interfaces/index.js";


const noteSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  disc: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});
const Note: Model<INote> = mongoose.model<INote>("Note", noteSchema);

export default Note;