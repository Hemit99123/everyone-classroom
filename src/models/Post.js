import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  classID: {
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
  video_conferencing: {
    type: String,
    required: false
  },
  realworldApplication: {
    type: String,
    required: false
  },
  githubURL: {
    type: String,
    required: false
  },
  githubName: {
    type: String,
    required: false
  },
  githubLanguage: {
    type: String,
    required: false
  },
  githubCloneURL: {
    type: String,
    required: false
  },
  youtubeID: {
    type: String,
    required: false
  },
  sketchfabHTML: {
    type: String,
    required: false
  },
  sketchfabTitle: {
    type: String,
    required: false
  }
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model("Post", postSchema);
