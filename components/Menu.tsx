"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { useSession, signOut } from "next-auth/react";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const links = [
    { id: 0, title: "HOME PAGE", url: "/" },
    { id: 1, title: "MENU", url: "/menu" },
    { id: 2, title: "ORDERS", url: "/orders" },
  ];

  return (
    <div>
      {!open ? (
        <Image
          src="/open.png"
          alt="MenuLogo"
          height={20}
          width={20}
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        />
      ) : (
        <Image
          src="/close.png"
          alt="CloseLogo"
          height={20}
          width={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      )}
      {open && (
        <div className="bg-red-500 text-white absolute top-12 left-0 flex flex-col w-full items-center justify-center gap-6 text-xl h-[calc(100vh-3rem)] z-10">
          {links.map((item) => (
            <Link
              href={item.url}
              key={item.id}
              onClick={() => setOpen(false)}
              className="hover:underline"
            >
              {item.title}
            </Link>
          ))}
          
          {session ? (
            <>
              <span className="text-sm">Hello, {session.user?.name}</span>
              <button
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
                className="hover:underline"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="hover:underline">
              LOGIN
            </Link>
          )}
          
          <div onClick={() => setOpen(false)}>
            <CartIcon />
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <Image src="/phone.png" alt="phoneLogo" width={20} height={20} />
            <span>0123456789</span>
          </div>
        </div>
      )}
    </div>
  );
}