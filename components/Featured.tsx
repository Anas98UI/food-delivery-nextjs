"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/types";

export default function Featured() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error("Failed to fetch featured products:", err));
  }, []);

  if (products.length === 0) {
    return (
      <div className="w-screen py-10 text-center text-red-400">
        <p>Loading featured products...</p>
      </div>
    );
  }

  return (
    <div className="w-screen overflow-x-scroll no-scrollbar text-red-400 py-8">
      <h2 className="text-2xl font-bold text-center mb-6 uppercase">Featured Items</h2>
      {/* WRAPPER */}
      <div className="w-max flex px-4">
        {/* SINGLE ITEM */}
        {products.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-end h-[60vh] w-[80vw] md:w-[40vw] lg:w-[30vw] hover:bg-red-50 p-4 rounded-xl transition-colors"
          >
            {/* IMAGE CONTAINER */}
            {item.img && (
              <Link href={`/product/${item.id}`} className="relative flex-1 w-full">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-300"
                />
              </Link>
            )}

            {/* TEXT CONTAINER */}
            <div className="flex flex-col items-center justify-start gap-3 flex-1 pt-4">
              <h1 className="text-xl font-bold uppercase">{item.title}</h1>
              <p className="text-center text-gray-600 line-clamp-2 px-4">{item.desc}</p>
              <span className="font-bold text-rose-500 text-lg">
                ${item.price.toFixed(2)}
              </span>
              <Link
                href={`/product/${item.id}`}
                className="px-6 py-2 bg-red-600 rounded-xl hover:bg-red-400 text-white transition-colors"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
