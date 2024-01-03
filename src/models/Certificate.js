import mongoose from "mongoose";

const { Schema } = mongoose;

const certifcateSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    classID: {
      type: String,
      required: true,
    },
    course_name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.Certifcate || mongoose.model("Certifcate", certifcateSchema);