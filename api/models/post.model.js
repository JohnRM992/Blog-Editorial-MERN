import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://imgs.search.brave.com/zxVjAIAO2sJDu-arJCH9frqLP_ZMLk7qmXOWZuqDdW8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/b3ktYnJpY2tzLXRh/YmxlLXdpdGgtd29y/ZC1ibG9nXzE0NDYy/Ny00NzQ2NS5qcGc_/c2l6ZT02MjYmZXh0/PWpwZw",
    },
    category: {
      type: String,
      default: "Sin categoria",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;