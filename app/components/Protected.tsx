"use client";

import { useSession } from "next-auth/react";
import Loading from "@/comps/Loading";
import Link from "next/link";

const Protected = ({ children }: { children: Readonly<React.ReactNode> }) => {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return (
      <div className="text-center">
        <Link href={"/api/auth/signin"} className="text-primary-500">
          Sign in
        </Link>
        {" to access this page."}
      </div>
    );
  }

  if (status === "authenticated") {
    return children;
  }

  return <Loading />;
};

export default Protected;
