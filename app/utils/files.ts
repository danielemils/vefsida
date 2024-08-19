import { MAX_FILE_SIZE, ALLOWED_MIME_TYPES } from "@/app/const/fileOptions";

interface isValidIF {
  result: boolean;
  errors?: string;
}

export const isValidImageFile = (file: File): isValidIF => {
  if (!(file.size <= MAX_FILE_SIZE)) {
    return {
      result: false,
      errors: `File needs to be smaller than ${MAX_FILE_SIZE / 1_000_000} MB`,
    };
  } else if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { result: false, errors: "Invalid image file type (jpg, png, gif)" };
  } else {
    return { result: true };
  }
};
