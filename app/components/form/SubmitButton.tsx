"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {text || "Submit"}
    </button>
  );
};

export default SubmitButton;
