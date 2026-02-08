"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Category } from "@/types";

export default function Menu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-6rem)]">
        <p className="text-red-500 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="px-8 py-4 md:px-20 flex flex-col min-h-[calc(100vh-6rem)] items-center justify-center md:flex-row md:justify-center gap-4">
      {categories.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="h-64 md:h-96 w-full md:w-1/3 p-8 bg-cover rounded-xl overflow-hidden relative group"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-30 transition-all" />
          <div className={`relative w-[70%] z-10  h-full flex flex-col justify-center`}>
            <h1 className="text-3xl font-bold uppercase drop-shadow-lg">
              {category.title}
            </h1>
            <p className="text-sm py-2 md:py-4 drop-shadow-md">
              {category.desc}
            </p>
            <button
              className="hidden md:block bg-white text-red-600 px-4 py-2 rounded-2xl hover:bg-red-500 hover:text-white transition-colors w-fit"
            >
              Explore
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
