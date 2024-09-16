"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import {
  MAX_TAG_ARRAY_LENGTH,
  MAX_TAG_LENGTH,
} from "@/app/const/validationOptions";
import CountDisplay from "@/comps/CountDisplay";

interface HashtagInputProps {
  hashtags: string[];
  setHashtags: React.Dispatch<React.SetStateAction<string[]>>;
}

const HashtagInput: React.FC<HashtagInputProps> = ({
  hashtags,
  setHashtags,
}) => {
  const [inputValue, setInputValue] = useState("");

  const cleanInput = (input: string) => input.replace(/[^a-zA-Z0-9]/g, "");

  const addHashtag = () => {
    const cleanedInput = cleanInput(inputValue);
    if (cleanedInput && !hashtags.includes(cleanedInput)) {
      if (hashtags.length < MAX_TAG_ARRAY_LENGTH) {
        setHashtags([...hashtags, cleanedInput]);
        setInputValue("");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        {hashtags.length > 0 && (
          <div className="flex flex-wrap gap-5">
            {hashtags.map((tag, index) => (
              <Chip
                key={`${tag}-${index}`}
                onClose={() => setHashtags(hashtags.filter((t) => t !== tag))}
                className="max-w-full !whitespace-normal h-fit py-2 px-3"
                classNames={{
                  base: "bg-foreground-100 cursor-default gap-2",
                  content: "break-all p-0",
                }}
              >
                #{tag}
              </Chip>
            ))}
          </div>
        )}
        <div className="flex gap-5">
          <Input
            type="text"
            placeholder="Add a hashtag"
            value={inputValue}
            onChange={(e) => setInputValue(cleanInput(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addHashtag();
              }
            }}
            maxLength={MAX_TAG_LENGTH}
            endContent={
              <CountDisplay
                count={hashtags.length}
                maxCount={MAX_TAG_ARRAY_LENGTH}
              />
            }
            isDisabled={hashtags.length >= MAX_TAG_ARRAY_LENGTH}
          />
          <Button
            onClick={addHashtag}
            isDisabled={
              inputValue === "" || hashtags.length >= MAX_TAG_ARRAY_LENGTH
            }
          >
            Add
          </Button>
        </div>
      </div>
      <input type="hidden" name="hashtags" value={JSON.stringify(hashtags)} />
    </>
  );
};

export default HashtagInput;
