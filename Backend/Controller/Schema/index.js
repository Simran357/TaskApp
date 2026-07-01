const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    
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
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);