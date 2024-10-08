import {
  MAX_FILE_SIZE,
  ALLOWED_MIME_TYPES,
} from "@/app/const/validationOptions";

export const isValidImageFile = (
  file: File
): { result: boolean; errors?: string } => {
  if (!(file.size <= MAX_FILE_SIZE)) {
    return {
      result: false,
      errors: `File needs to be smaller than ${MAX_FILE_SIZE / 1024 / 1024} MB`,
    };
  } else if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { result: false, errors: "Invalid image file type (jpg, png, gif)" };
  } else {
    return { result: true };
  }
};
