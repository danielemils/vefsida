"use client";

import { useSession } from "next-auth/react";
import Loading from "@/comps/Loading";
import Link from "next/link";

const Protected = ({ children }: { children: Readonly<React.ReactNode> }) => {
  const { status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (status == "unauthenticated") {
    return <Link href={"/api/auth/signin"}>Sign In</Link>;
  }

  return <>{children}</>;
};

export default Protected;
