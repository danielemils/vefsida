import Link from "next/link";
import NavUser from "./NavUser";
import {
  Navbar as NextNavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

const Navbar = () => {
  return (
    <NextNavbar position="sticky">
      <NavbarContent>
        <NavbarItem>
          <Link href={"/"}>Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={"/Create"}>Create</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={"/About"}>About</Link>
        </NavbarItem>
        <NavUser />
      </NavbarContent>
    </NextNavbar>
  );
};

export default Navbar;
