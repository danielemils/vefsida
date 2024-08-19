"use client";

import SubmitButton from "@/comps/form/SubmitButton";
import { submitForm } from "@/app/actions";
import { useFormState } from "react-dom";

const Create = () => {
  const [state, formAction] = useFormState(submitForm, { errors: "" });
  return (
    <form action={formAction}>
      <input type="file" accept="image/*" name="image" required />
      <input type="text" name="description" required />
      <SubmitButton text="Create" />
      <p className="text-red-400">{state?.errors}</p>
    </form>
  );
};

export default Create;
