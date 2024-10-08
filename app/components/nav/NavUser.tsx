"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { NavbarContent, NavbarItem } from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import Loading from "@/comps/Loading";
import ThemeSwitcher from "@/comps/nav/ThemeSwitcher";
import { avatarProps } from "@/app/const/nextUIProps";

const NavUser = () => {
  const { data: session, status } = useSession();

  return (
    <NavbarContent justify="end">
      <NavbarItem>
        <ThemeSwitcher />
      </NavbarItem>
      {status === "loading" ? (
        <NavbarItem>
          <Loading />
        </NavbarItem>
      ) : (
        <>
          {!session?.user ? (
            <NavbarItem>
              <Button color="primary">
                <Link href={"/api/auth/signin"}>Sign In</Link>
              </Button>
            </NavbarItem>
          ) : (
            <>
              <NavbarItem className="hidden sm:flex">
                {session?.user?.name && (
                  <p className="text-foreground-500">{session.user.name}</p>
                )}
              </NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    {...avatarProps}
                    as="button"
                    name={session?.user?.name || undefined}
                    src={session?.user?.image || undefined}
                  />
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Profile Actions"
                  variant="flat"
                  disabledKeys={["profile"]}
                >
                  <DropdownSection aria-label="Profile" showDivider>
                    <DropdownItem
                      key="profile"
                      isReadOnly
                      className="flex-col opacity-100"
                    >
                      <p>Signed in as</p>
                      <p className="font-semibold">
                        {session?.user?.email || "?"}
                      </p>
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownItem
                    key="sign_out"
                    color="danger"
                    href="/api/auth/signout"
                  >
                    Sign Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          )}
        </>
      )}
    </NavbarContent>
  );
};

export default NavUser;
