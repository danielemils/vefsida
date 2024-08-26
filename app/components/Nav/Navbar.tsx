import Link from "next/link";
import NavUser from "./NavUser";
import {
  Navbar as NextNavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

const Navbar = () => {
  return (
    <NextNavbar
      position="sticky"
      className="bg-gradient-to-b from-neutral-500/30 to-neutral-700/30"
    >
      <NavbarContent>
        <NavbarItem className="navbar_item">
          <Link href={"/"}>Home</Link>
        </NavbarItem>
        <NavbarItem className="navbar_item">
          <Link href={"/Create"}>
            <div>Create</div>
          </Link>
        </NavbarItem>
        <NavbarItem className="navbar_item">
          <Link href={"/About"}>About</Link>
        </NavbarItem>
        <NavUser />
      </NavbarContent>
    </NextNavbar>
  );
};

export default Navbar;
