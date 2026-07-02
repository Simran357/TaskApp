import mongoose, { Schema, Document, Model } from "mongoose";

export interface INote extends Document {
  task: string;
  disc?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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