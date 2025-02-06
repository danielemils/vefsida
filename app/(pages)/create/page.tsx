"use client";

import { submitForm } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import Protected from "@/comps/Protected";
import { Button } from "@heroui/button";
import { useState } from "react";
import HashtagInput from "@/comps/create/HashtagInput";
import ImageFileInput from "@/comps/create/ImageFileInput";
import DescriptionInput from "@/comps/create/DescriptionInput";
import ErrorMessage from "@/app/components/ErrorMessage";

const SubmitButton = ({
  hasErrors,
  hasImage,
}: {
  hasErrors: boolean;
  hasImage: boolean;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      isDisabled={pending || hasErrors || !hasImage}
      disabled={pending || hasErrors || !hasImage}
      isLoading={pending}
      color="primary"
    >
      Create
    </Button>
  );
};

const Create = () => {
  const [state, formAction] = useFormState(submitForm, {});
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [imageSelected, setImageSelected] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const hasErrors = Object.values(errors).some((error) => error !== null);

  return (
    <Protected>
      <section className="max-w-[512px] mx-auto">
        <form action={formAction} className="w-full grid grid-cols-1 gap-5">
          <ImageFileInput
            setImageSelected={setImageSelected}
            updateError={(error) =>
              setErrors((prev) => ({ ...prev, image: error }))
            }
          />
          <DescriptionInput />
          <HashtagInput hashtags={hashtags} setHashtags={setHashtags} />
          <SubmitButton hasErrors={hasErrors} hasImage={imageSelected} />
          {state.errors && <ErrorMessage message={state.errors} />}
        </form>
      </section>
    </Protected>
  );
};

export default Create;
