import { Schema, model, models, Model } from "mongoose";

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
  {
    collection: "posts",
    toObject: {
      transform: (doc, ret, options): PostIF => {
        return {
          id: doc.id,
          imageURL: doc.imageURL,
          description: doc.description,
          tags: doc.tags,
          date: doc.date,
        };
      },
    },
  }
);

const Post: Model<PostIF> = models.Post || model<PostIF>("Post", postSchema);

export default Post;
