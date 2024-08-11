import mongoose from "mongoose";

const { Schema } = mongoose;

const sessionSchema = new Schema(
  {
    _id: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

export default mongoose.models.Session || mongoose.model("Session", sessionSchema);
