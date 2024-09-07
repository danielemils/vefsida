import { Schema, model, models, Model } from "mongoose";

export interface UserIF {
  id?: string;
  email: string;
  username: string;
  image: string;
}

const userSchema = new Schema<UserIF>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    username: { type: String, required: [true, "Username is required"] },
    image: { type: String, required: [true, "Image is required"] },
  },
  {
    collection: "users",
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

const User: Model<UserIF> = models.User || model<UserIF>("User", userSchema);

export default User;
