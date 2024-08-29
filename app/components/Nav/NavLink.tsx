"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarItem } from "@nextui-org/navbar";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <NavbarItem isActive={pathname === href}>
      <Link href={href}>{children}</Link>
    </NavbarItem>
  );
};

export default NavLink;
