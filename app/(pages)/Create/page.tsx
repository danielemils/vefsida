"use client";

import { submitForm } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import Protected from "@/comps/Protected";

const Create = () => {
  const [state, formAction] = useFormState(submitForm, {});
  const { pending } = useFormStatus();

  return (
    <Protected>
      <section>
        <form action={formAction}>
          <input type="file" accept="image/*" name="image" required />
          <input type="text" name="description" required />
          <button disabled={pending}>Create</button>
          {state?.errors && <p className="text-red-400">{state.errors}</p>}
        </form>
      </section>
    </Protected>
  );
};

export default Create;
