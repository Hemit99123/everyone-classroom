import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  topicId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  realworldApplication: {
    type: String,
    required: false
  },
  youtubeID: {
    type: String,
    required: false
  },
  github: {
    type: Object,
    required: false
  },
  sketchfab: {
    type: Object,
    required: false
  }
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model("Post", postSchema);
