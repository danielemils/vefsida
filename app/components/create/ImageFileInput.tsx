import { Input } from "@heroui/input";
import { useEffect, useState } from "react";
import {
  MAX_FILE_SIZE,
  ALLOWED_MIME_TYPES,
} from "@/app/const/validationOptions";

interface ImageFileInputProps {
  setImageSelected: React.Dispatch<React.SetStateAction<boolean>>;
  updateError: (error: string | null) => void;
}

const ImageFileInput: React.FC<ImageFileInputProps> = ({
  setImageSelected,
  updateError,
}) => {
  const [imagePath, setImagePath] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError(
          `Image size must be less than ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(
            1
          )}MB`
        );
      } else if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        setError(
          `Invalid image file type. Allowed types are: ${ALLOWED_MIME_TYPES.join(
            ", "
          )}`
        );
      } else {
        setError(null);
        const newPath = URL.createObjectURL(file);
        setImagePath(newPath);
        setImageSelected(true);
      }
    } else {
      setError(null);
      setImagePath("");
      setImageSelected(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePath) {
        URL.revokeObjectURL(imagePath);
      }
    };
  }, [imagePath]);

  return (
    <Input
      type="file"
      name="image"
      accept={ALLOWED_MIME_TYPES.join(",")}
      isRequired
      required
      classNames={{
        input: "file:sr-only cursor-pointer !text-foreground-500",
        inputWrapper: "!cursor-default h-14 py-2 transition-background",
      }}
      onChange={handleFileChange}
      startContent={
        imagePath && (
          <div className="max-h-full max-w-10 content-center rounded-full overflow-hidden">
            <img src={imagePath} className="h-full" />
          </div>
        )
      }
      isInvalid={error !== null}
      errorMessage={error}
    />
  );
};

export default ImageFileInput;
