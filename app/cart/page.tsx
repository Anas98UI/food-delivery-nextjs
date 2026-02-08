"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice,totalItems, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: totalPrice,
          products: items,
        }),
      });

      if (res.ok) {
        clearCart();
        router.push("/orders");
      } else {
        alert("Failed to place order");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)] text-red-500">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button
          onClick={() => router.push("/menu")}
          className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-400"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 min-h-[calc(100vh-6rem)] text-red-500 md:flex-row">
      {/* PRODUCT CONTAINER */}
      <div className="flex flex-col p-4 md:w-2/3 md:px-20 lg:w-1/2">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-4 border-b border-red-100 pb-4">
            <div>
              <Image
                src={item.product.img || "/temporary/p1.png"}
                alt={item.product.title}
                width={90}
                height={90}
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1 px-4">
              <h1 className="uppercase text-lg font-bold">{item.product.title}</h1>
              {item.selectedOption && (
                <span className="text-sm text-gray-500">{item.selectedOption}</span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-red-300 rounded-lg">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 hover:bg-red-100"
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 hover:bg-red-100"
                >
                  +
                </button>
              </div>
              <h2 className="font-bold min-w-[80px] text-right">
                ${item.totalPrice.toFixed(2)}
              </h2>
              <button
                onClick={() => removeFromCart(item.id)}
                className="cursor-pointer text-2xl hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAYMENT CONTAINER */}
      <div className="p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center md:w-1/3 md:px-10 lg:w-1/2 h-fit md:sticky md:top-24">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        
        <div className="flex justify-between items-center">
          <span>Subtotal ({totalItems} items)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Service Cost</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between items-center">
          <span className="font-bold">TOTAL (INCL. VAT)</span>
          <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
        </div>
        
        <button
          onClick={handleCheckout}
          disabled={isCheckingOut}
          className="text-white bg-red-500 px-4 py-3 rounded-xl w-full mt-4 hover:bg-red-400 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isCheckingOut ? "Processing..." : session ? "CHECKOUT" : "LOGIN TO CHECKOUT"}
        </button>
        
        <button
          onClick={() => router.push("/menu")}
          className="text-red-500 border border-red-500 px-4 py-2 rounded-xl w-full hover:bg-red-50"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
