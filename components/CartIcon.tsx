"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="flex flex-nowrap justify-center gap-2 hover:opacity-80 transition-opacity">
      <div className="relative flex-none">
        <Image src="/cart.png" alt="cartLogo" height={20} width={20} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </div>
      <div className="flex-none">
        <span>Cart ({totalItems})</span>
      </div>
    </Link>
  );
}

