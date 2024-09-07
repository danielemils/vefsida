import { Schema, model, models, Model, Types } from "mongoose";
import User, { UserIF } from "@/app/models/User";

export interface PostIF {
  id?: string;
  imageURL: string;
  description: string;
  tags?: string[];
  date?: Date;
  owner: UserIF;
}

export type PostSchemaType = Omit<PostIF, "owner"> & {
  owner: Types.ObjectId;
}

const postSchema = new Schema<PostSchemaType>(
  {
    imageURL: { type: String, required: [true, "URL is required"] },
    description: { type: String, required: [true, "Description is required"] },
    tags: [String],
    date: { type: Date, default: Date.now },
    owner: { type: Schema.Types.ObjectId, ref: User, required: true }
  },
  {
    collection: "posts",
    toObject: {
      transform: (doc, ret, options) => {
        ret.id = doc.id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toJSON: {
      transform: (doc, ret, options) => {
        ret.id = doc.id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Post: Model<PostSchemaType> = models.Post || model<PostSchemaType>("Post", postSchema);

export default Post;
