"use server";

import Post, { PostIF } from "@/app/models/Post";
import { connectToDb } from "@/app/utils/database";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isValidImageFile } from "@/app/utils/files";
import { createURL } from "@/app/utils/vercelBlob";

export async function submitForm(prevState: any, formData: FormData) {
  const img: File | null = formData.get("image") as File;
  const desc: string | null = formData.get("description") as string;

  const { errors } = isValidImageFile(img);
  if (errors) {
    return { errors };
  } else if (!desc) {
    return { errors: "Description is required" };
  }

  const url = await createURL(img);
  if (!url) {
    return { errors: "Failed to upload image." };
  }

  const postObj: PostIF = {
    imageURL: url,
    description: formData.get("description") as string,
  };

  try {
    await connectToDb();
    await Post.create(postObj);
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/");
  redirect("/");
}
