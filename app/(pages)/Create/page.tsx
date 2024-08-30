"use client";

import { submitForm } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import Protected from "@/comps/Protected";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Loading from "@/comps/Loading";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isDisabled={pending} disabled={pending}>
      {pending ? <Loading /> : "Create"}
    </Button>
  );
};

const Create = () => {
  const [state, formAction] = useFormState(submitForm, {});

  return (
    <Protected>
      <section className="flex justify-center mt-12">
        <form action={formAction} className="flex flex-col gap-5">
          <Input
            type="file"
            name="image"
            accept="image/*"
            isRequired
            required
          />
          <Input
            type="text"
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
