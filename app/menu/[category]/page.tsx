"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Product } from "@/types";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products?cat=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-6rem)]">
        <p className="text-red-500 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:px-20 min-h-[calc(100vh-6rem)]">
      <h1 className="text-3xl font-bold uppercase text-red-500 mb-8 capitalize">
        {category} Menu
      </h1>
      
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="border border-red-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full bg-gray-100">
                {product.img ? (
                  <Image
                    src={product.img}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold uppercase text-red-500">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {product.desc}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-red-500 font-bold text-xl">
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-red-400">
                    View
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
