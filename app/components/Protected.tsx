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
    return (
      <div className="mt-12 text-center">
        <Link href={"/api/auth/signin"} className="text-primary-500">
          Sign in
        </Link>
        {" to create posts."}
      </div>
    );
  }

  return <>{children}</>;
};

export default Protected;
