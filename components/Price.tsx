"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Product, ProductOption } from "@/types"; 

type Props = {
  price: number;
  id: string;
  options: ProductOption[]; 
  product: Product;       
};

const Price = ({ price, id, options, product }: Props) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const [showAdded, setShowAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setTotal(
      quantity * (options ? price + options[selected].additionalPrice : price),
    );
  }, [quantity, selected, options, price]);

  const handleAddToCart = () => {
    if (product) {
      console.log("added button")
      const selectedOption = options?.[selected];
      addToCart(product, quantity, selectedOption);
      setShowAdded(true);
      setTimeout(() => setShowAdded(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold text-xl">${total.toFixed(2)}</h2>

      {/* OPTIONS CONTAINER */}
      {options && options.length > 0 && (
        <div className="flex gap-4 flex-wrap">
          {options.map((option, index) => (
            <button
              key={option.title}
              className="min-w-24 px-4 py-2 rounded-xl border border-red-400 transition-all"
              style={{
                background: selected === index ? "rgb(248 113 113)" : "white",
                color: selected === index ? "white" : "red",
              }}
              onClick={() => setSelected(index)}
            >
              {option.title}
            </button>
          ))}
        </div>
      )}

      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between gap-4">
        {/* QUANTITY */}
        <div className="px-2 py-2 flex items-center border border-red-500 rounded-lg">
          <span className="flex flex-1 text-l pr-4">Quantity</span>
          <button
            onClick={() =>
              setQuantity((prev) => (prev === 1 ? prev : prev - 1))
            }
            className="px-3 hover:bg-red-100 rounded"
          >
            {"<"}
          </button>
          <span className="mx-2 min-w-5 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="px-3 hover:bg-red-100 rounded"
          >
            {">"}
          </button>
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={handleAddToCart}
          className="bg-red-600 text-white px-6 py-2 uppercase rounded-xl hover:bg-red-400 transition-colors"
        >
          {showAdded ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default Price;
