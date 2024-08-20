"use client";

import { useSession } from "next-auth/react";
import Loading from "@/comps/Loading";

const Protected = ({ children }: { children: Readonly<React.ReactNode> }) => {
  const { status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <Loading />;
  }

  return <>{children}</>;
};

export default Protected;
