import mongoose from "mongoose";

const { Schema } = mongoose;

const enrollSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    classID: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Enroll || mongoose.model("Enroll", enrollSchema);