import mongoose from "mongoose";

const { Schema } = mongoose;

const classSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Class || mongoose.model("Class", classSchema);
