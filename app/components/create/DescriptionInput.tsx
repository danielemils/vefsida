import { useState } from "react";
import { MAX_DESCRIPTION_LENGTH } from "@/app/const/validationOptions";
import { Textarea } from "@heroui/input";
import CountDisplay from "@/comps/CountDisplay";

const DescriptionInput = () => {
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharCount(e.target.value.length);
  };

  return (
    <Textarea
      label="Description"
      name="description"
      maxLength={MAX_DESCRIPTION_LENGTH}
      onChange={handleChange}
      endContent={
        <CountDisplay count={charCount} maxCount={MAX_DESCRIPTION_LENGTH} />
      }
    />
  );
};

export default DescriptionInput;
