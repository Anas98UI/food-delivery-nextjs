"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function UserLinks() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="text-red-400">...</span>;
  }

  return (
    <div>
      {status === "authenticated" ? (
        <div className="flex gap-4 items-center">
          <Link href="/orders" className="hover:text-red-600 transition-colors">
            ORDERS
          </Link>
          <span
            className="cursor-pointer text-red-400 hover:text-red-600 transition-colors"
            onClick={() => signOut()}
          >
            LOGOUT
          </span>
        </div>
      ) : (
        <Link href="/login" className="hover:text-red-600 transition-colors">
          LOGIN
        </Link>
      )}
    </div>
  );
}