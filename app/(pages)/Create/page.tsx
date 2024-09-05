"use client";

import { submitForm } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import Protected from "@/comps/Protected";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import Loading from "@/comps/Loading";

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
          />
          <Textarea
            label="Description"
            name="description"
            isRequired
            required
          />
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
