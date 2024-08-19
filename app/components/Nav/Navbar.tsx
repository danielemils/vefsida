import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav className="p-5 w-full flex gap-5 bg-slate-700">
        <Link href={"/"}>Home</Link>
        <Link href={"/Create"}>Create</Link>
        <Link href={"/About"}>About</Link>
      </nav>
    </header>
  );
};

export default Navbar;
