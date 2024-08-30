"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { NavbarContent, NavbarItem } from "@nextui-org/navbar";

const NavUser = () => {
  const { data: session } = useSession();

  return (
    <NavbarContent justify="end">
      <NavbarItem className="hidden md:flex">
        {session?.user?.name && <p>{session.user.name}</p>}
      </NavbarItem>
      <NavbarItem>
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
      </NavbarItem>
      <NavbarItem>
        <Button>
          {session?.user ? (
            <Link href={"/api/auth/signout"}>Sign Out</Link>
          ) : (
            <Link href={"/api/auth/signin"}>Sign In</Link>
          )}
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
};

export default NavUser;
