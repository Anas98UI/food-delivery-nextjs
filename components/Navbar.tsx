import Link from "next/link";
import Menu from "./Menu";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";

export default function Navbar() {
  return (
    <div className="h-12 lg:h-16 flex justify-between items-center px-4 border-b-2 md:px-20 border-red-600 sticky top-0 bg-white z-50 flex-1">
      {/* LEFT LINKS */}
      <div className="hidden md:flex flex-1 md:items-center md:gap-6 text-red-600">
        <Link href="/" className="hover:text-red-600 transition-colors">HOMEPAGE</Link>
        <Link href="/menu" className="hover:text-red-600 transition-colors">MENU</Link>
      </div>

      {/* Logo */}
      <div className="uppercase font-bold md:text-xl lg:text-2xl text-red-600 mr-4">
        <Link href="/">The Big Three</Link>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <Menu />
      </div>

      {/* RIGHT LINKS */}
      <div className="hidden md:flex flex-1 md:items-center justify-end md:gap-6 text-red-600">
        <UserLinks />
        <CartIcon />
        <div className="flex items-center gap-2 text-black bg-emerald-700 py-0.5 px-6 rounded-md">
          <Image src="/phone.png" alt="phoneLogo" width={20} height={20} />
          <span>0123456789</span>
        </div>
      </div>
    </div>
  );
}