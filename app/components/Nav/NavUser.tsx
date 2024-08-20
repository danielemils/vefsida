"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const NavUser = () => {
  const { data: session } = useSession();

  return (
    <div className="flex w-full justify-end gap-5">
      {session?.user ? (
        <>
          {session.user.name && <p>Hello, {session.user.name}</p>}
          <Link href={"/api/auth/signout"}>Sign Out</Link>
        </>
      ) : (
        <Link href={"/api/auth/signin"}>Sign In</Link>
      )}
      <div className="relative w-10 h-10">
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="User profile"
            fill
            className="object-cover rounded-full"
            sizes="40px"
          />
        )}
      </div>
    </div>
  );
};

export default NavUser;
