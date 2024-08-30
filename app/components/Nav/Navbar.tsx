"use client";

import NavUser from "@/app/components/nav/NavUser";
import NavLink from "@/app/components/nav/NavLink";
import {
  Navbar as NextNavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { useState } from "react";

type MenuItems = [string, string][];
const menuItems: MenuItems = [
  ["Home", "/"],
  ["Create", "/Create"],
  ["About", "/About"],
];

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  return (
    <NextNavbar
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setMenuOpen}
      className="bg-neutral-900/50"
      classNames={{
        item: ["data-[active=true]:text-primary-500"],
      }}
    >
      <NavbarContent className="sm:hidden">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent justify="start" className="hidden sm:flex gap-4">
        {menuItems.map((item, index) => (
          <NavLink key={`${item}-${index}`} href={item[1]}>
            {item[0]}
          </NavLink>
        ))}
      </NavbarContent>
      <NavUser />

      <NavbarMenu onClick={handleMenuItemClick}>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NavLink href={item[1]}>{item[0]}</NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextNavbar>
  );
};

export default Navbar;
