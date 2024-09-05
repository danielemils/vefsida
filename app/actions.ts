"use server";

import Post, { PostIF } from "@/app/models/Post";
import { connectToDb } from "@/app/utils/database";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isValidImageFile } from "@/app/utils/files";
import { createURL } from "@/app/utils/vercelBlob";
import { getServerSession } from "next-auth";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TAG_LENGTH,
  MAX_TAG_ARRAY_LENGTH,
} from "@/app/const/validationOptions";

export async function submitForm(
  prevState: any,
  formData: FormData
): Promise<{ errors?: string }> {
  const session = await getServerSession();
  if (!session?.user) {
    return { errors: "Unauthorized" };
  }

  const img: File | null = formData.get("image") as File;
  const desc: string | null = formData.get("description") as string;

  if (!img) {
    return { errors: "Invalid image" };
  }
  const { errors } = isValidImageFile(img);
  if (errors) {
    return { errors };
  } else if (!desc) {
    return { errors: "Description is required" };
  } else if (desc.length > MAX_DESCRIPTION_LENGTH) {
    return {
      errors: `Description needs to be shorter than ${MAX_DESCRIPTION_LENGTH} characters`,
    };
  }

  // TODO: more validation

  const url = await createURL(img);
  if (!url) {
    return { errors: "Failed to upload image" };
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
