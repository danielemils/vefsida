"use client";

import { submitForm } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import Protected from "@/comps/Protected";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useEffect, useState } from "react";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      isDisabled={pending}
      disabled={pending}
      isLoading={pending}
    >
      Create
    </Button>
  );
};

const Create = () => {
  const [state, formAction] = useFormState(submitForm, {});
  const [imagePath, setImagePath] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const newPath = URL.createObjectURL(e.target.files[0]);
      setImagePath(newPath);
    } else {
      setImagePath("");
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
    <Protected>
      <section className="max-w-[512px] mx-auto">
        <form action={formAction} className="w-full grid grid-cols-1 gap-5">
          <Input
            type="file"
            name="image"
            accept="image/*"
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
          />
          <Textarea label="Description" name="description" />
          <Input type="text" label="Tags" name="tags" />
          <SubmitButton />
          {state?.errors && (
            <p className="text-red-400 text-center">{state.errors}</p>
          )}
        </form>
      </section>
    </Protected>
  );
};

export default Create;
