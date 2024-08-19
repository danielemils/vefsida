import { Schema, model, models } from "mongoose";

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
  { collection: "users" }
);

const User = models.User || model<UserIF>("User", userSchema);

export default User;
