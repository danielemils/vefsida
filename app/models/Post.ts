import { Schema, model, models } from "mongoose";

export interface PostIF {
  id?: string;
  imageURL: string;
  description: string;
  tags?: string[];
  date?: Date;
}

const postSchema = new Schema<PostIF>(
  {
    imageURL: { type: String, required: [true, "URL is required"] },
    description: { type: String, required: [true, "Description is required"] },
    tags: [String],
    date: { type: Date, default: Date.now },
    // owner: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { collection: "posts" }
);

const Post = models.Post || model<PostIF>("Post", postSchema);

export default Post;
