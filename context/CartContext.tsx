"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, CartItem, ProductOption } from "@/types";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, selectedOption?: ProductOption) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (product: Product, quantity: number, selectedOption?: ProductOption) => {
    const itemId = `${product.id}-${selectedOption?.title || "default"}`;
    const existingItem = items.find((item) => item.id === itemId);

    if (existingItem) {
      setItems(
        items.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: itemId,
        product,
        quantity,
        selectedOption: selectedOption?.title,
        totalPrice: (product.price + (selectedOption?.additionalPrice || 0)) * quantity,
      };
      setItems([...items, newItem]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          const optionPrice = item.selectedOption
            ? item.product.options.find((o) => o.title === item.selectedOption)?.additionalPrice || 0
            : 0;
          return {
            ...item,
            quantity,
            totalPrice: (item.product.price + optionPrice) * quantity,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}