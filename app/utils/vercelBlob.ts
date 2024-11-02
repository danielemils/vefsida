import { put, BlobRequestAbortedError, del } from "@vercel/blob";
import { isValidImageFile } from "@/app/utils/files";

export const createURL = async (file: File): Promise<string | void> => {
  const { result } = isValidImageFile(file);
  if (!result) {
    return;
  }

  const abortController = new AbortController();

  try {
    const blobPromise = put(`images/${file.name}`, file, {
      access: "public",
      abortSignal: abortController.signal,
    });

    const timeout = setTimeout(() => {
      // Abort the request after 5 seconds
      abortController.abort();
    }, 5000);

    const blob = await blobPromise;
    clearTimeout(timeout);

    return blob.url;
  } catch (error) {
    if (error instanceof BlobRequestAbortedError) {
      // Handle the abort
      console.info("Vercel blob put request timed out.");
    }
    console.info(error);
  }
};

export const deleteURL = async (url: string): Promise<boolean> => {
  const abortController = new AbortController();

  try {
    const blobPromise = del(url);

    const timeout = setTimeout(() => {
      // Abort the request after 5 seconds
      abortController.abort();
    }, 5000);

    await blobPromise;
    clearTimeout(timeout);

    return true;
  } catch (error) {
    if (error instanceof BlobRequestAbortedError) {
      // Handle the abort
      console.info("Vercel blob put request timed out.");
    }
    console.info(error);
  }

  return false;
};
