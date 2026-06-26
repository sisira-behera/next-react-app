import useCartStore from "@/app/store/cartStore";

export default function OrderSummary() {
  const { items, removeFromCart, updateQty } = useCartStore((state) => state);

  const subtotal = items.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0,
  );
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm">Proceed to Checkout</button>
      </div>
    </>
  );
}
