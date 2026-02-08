"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Price from "@/components/Price";
import { Product } from "@/types";

export default function SingleProduct() {
  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState(false);

useEffect(() => {
  if (!productId) return;

  fetch(`/api/products/${productId}`)
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(setProduct)
    .catch(() => setError(true));
}, [productId]);

  if (error) {
    return <div className="p-10 text-center text-red-500">Produkt nicht gefunden.</div>;
  }

  if (!product) {
    return <div className="p-10 text-center animate-pulse">Lade Produkt...</div>;
  }

  return (
    <div className="p-4 lg:px-20 xl:px-40 min-h-[calc(100vh-6rem)] flex flex-col sm:flex-row gap-8 items-center">
      {product.img && (
        <div className="relative w-full sm:w-1/2 min-h-[300px]">
          <Image
            src={product.img}
            alt={product.title}
            fill
            
            className="object-contain"
            priority
          />
        </div>
      )}

      <div className="flex flex-col gap-4 sm:w-1/2">
        <h1 className="text-3xl font-bold uppercase">{product.title}</h1>
        <p className="text-gray-700">{product.desc}</p>
        <Price price={product.price}  id={product.id} options={product.options} product={product} />
      </div>
    </div>
  );
}

