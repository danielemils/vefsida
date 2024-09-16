"use server";

import Post, { PostSchemaType } from "@/app/models/Post";
import { connectToDb } from "@/app/utils/database";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isValidImageFile } from "@/app/utils/files";
import { createURL } from "@/app/utils/vercelBlob";
import { auth } from "@/app/utils/auth";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TAG_LENGTH,
  MAX_TAG_ARRAY_LENGTH,
} from "@/app/const/validationOptions";
import { Types } from "mongoose";

export async function submitForm(
  prevState: any,
  formData: FormData
): Promise<{ errors?: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { errors: "Unauthorized" };
  }

  const img: File | null = formData.get("image") as File;
  const desc: string | null = formData.get("description") as string;
  const hashtagsJSON: string | null = formData.get("hashtags") as string;

  let hashtags: string[] = [];
  try {
    hashtags = hashtagsJSON ? JSON.parse(hashtagsJSON) : [];
  } catch (error) {
    return { errors: "Invalid hashtags" };
  }

  if (!img) {
    return { errors: "Invalid image" };
  }
  const { errors } = isValidImageFile(img);
  if (errors) {
    return { errors };
  } else if (desc && desc.length > MAX_DESCRIPTION_LENGTH) {
    return {
      errors: `Description needs to be shorter than ${MAX_DESCRIPTION_LENGTH} characters`,
    };
  } else if (hashtags && hashtags.length > MAX_TAG_ARRAY_LENGTH) {
    return {
      errors: `You can only add ${MAX_TAG_ARRAY_LENGTH} hashtags`,
    };
  } else if (hashtags && hashtags.some((tag) => tag.length > MAX_TAG_LENGTH)) {
    return {
      errors: `Hashtags need to be shorter than ${MAX_TAG_LENGTH} characters`,
    };
  }

  // TODO: more validation

  const url = await createURL(img);
  if (!url) {
    return { errors: "Failed to upload image" };
  }

  const postObj: PostSchemaType = {
    imageURL: url,
    description: formData.get("description") as string,
    owner: new Types.ObjectId(session.user.id),
    tags: hashtags,
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
