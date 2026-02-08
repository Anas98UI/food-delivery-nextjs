"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Order } from "@/types";

export default function Orders() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetch("/api/orders")
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.orders || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch orders:", err);
          setLoading(false);
        });
    }
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-6rem)]">
        <p className="text-red-500 text-xl">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="p-4 md:px-20 min-h-[calc(100vh-6rem)]">
      <h1 className="text-2xl font-bold text-red-500 mb-6">Your Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">You haven&apos;t placed any orders yet.</p>
          <button
            onClick={() => router.push("/menu")}
            className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-400"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr className="text-left text-red-500">
              <th className="hidden sm:block">Order ID</th>
              <th>Date</th>
              <th>Price</th>
              <th className="hidden sm:block">Products</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="text-sm sm:text-base odd:bg-gray-100 hover:bg-gray-200"
              >
                <td className="hidden sm:block py-3">{order.id.slice(0, 8)}...</td>
                <td className="py-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3">${order.price.toFixed(2)}</td>
                <td className="hidden sm:block py-3">
                  {order.products?.length || 0} items
                </td>
                <td className="py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs capitalize ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
