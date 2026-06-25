"use client";

import useCartStore from "@/app/store/cartStore";
import CartShopping from "@/app/components/cart/cart";
import OrderSummary from "@/app/components/order/order-summary";



export default function CartPage() {
  const { items, removeFromCart, updateQty } = useCartStore((state) => state);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-20 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Your Cart({items.reduce((sum, i) => sum + i.quantity, 0)})
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <CartShopping />
          </div>
          <div className="md:col-span-1">
            <OrderSummary />
          </div>
          </div>
      </main>
    </div>
  );
}