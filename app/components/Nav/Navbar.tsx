import NavUser from "@/comps/Nav/NavUser";
import NavLink from "@/comps/Nav/NavLink";
import { Navbar as NextNavbar, NavbarContent } from "@nextui-org/navbar";

const Navbar = () => {
  return (
    <NextNavbar
      position="sticky"
      className="bg-neutral-900/50"
      classNames={{
        item: ["data-[active=true]:text-primary-500"],
      }}
    >
      <NavbarContent>
        <NavLink href={"/"}>Home</NavLink>
        <NavLink href={"/Create"}>Create</NavLink>
        <NavLink href={"/About"}>About</NavLink>
        <NavUser />
      </NavbarContent>
    </NextNavbar>
  );
};

export default Navbar;
