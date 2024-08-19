import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 200,
    },
    picturePath: {
      type: [String],
      default: [],
    },
    userPicturePath: {
      type: String,
      default: "",
    },
    likes: {
      type: Map,
      of: Boolean,
      default: {},
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
