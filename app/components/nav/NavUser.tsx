"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { NavbarContent, NavbarItem } from "@heroui/navbar";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  DropdownSection,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import Loading from "@/comps/Loading";
import ThemeSwitcher from "@/comps/nav/ThemeSwitcher";
import { avatarProps } from "@/app/const/nextUIProps";
import { getProfileURL } from "@/app/utils/user";

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
                  <DropdownSection
                    aria-label="Profile Information"
                    showDivider
                    title="Signed in as:"
                  >
                    <DropdownItem
                      key="profile"
                      isReadOnly
                      className="opacity-100"
                      textValue={session?.user?.name || "No username"}
                    >
                      <p className="font-semibold">{session?.user?.name}</p>
                      <p>{session?.user?.email}</p>
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection aria-label="Actions" showDivider>
                    <DropdownItem
                      key="profile-link"
                      href={getProfileURL(session?.user?.id)}
                      textValue="View profile"
                    >
                      View profile
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection aria-label="Sign out">
                    <DropdownItem
                      key="sign_out"
                      color="danger"
                      href="/api/auth/signout"
                    >
                      Sign Out
                    </DropdownItem>
                  </DropdownSection>
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
