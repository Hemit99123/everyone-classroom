import mongoose from "mongoose";

const { Schema } = mongoose;

const classSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    genre: {
        type: String,
        required: true
    },
    instructor: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

export default mongoose.models.Class || mongoose.model("Class", classSchema);
