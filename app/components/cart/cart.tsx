import { ShoppingCartItem } from "@/app/models/Cart";
import useCartStore from "@/app/store/cartStore";
import { Link } from "@/i18n/navigation";
import { TrashIcon } from "lucide-react";

export default function CartShopping() {
  const { items, removeFromCart, updateQty } = useCartStore((state) => state);

  return (
    <>
      {items.map((item: ShoppingCartItem) => (
        <div
          key={item.id}
          className="flex items-center bg-white p-4 mb-4 rounded-lg shadow"
        >
          <img
            src={item.image}
            alt={item.title}
            width={80}
            height={80}
            className="rounded-md mr-4"
          />
          <div className="flex-grow">
            <h2 className="text-lg font-semibold text-gray-800">
              <Link
                key={item.id}
                href={{ pathname: "/products/[id]", params: { id: item.id } }}
                className="relative inline-block text-indigo-600"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                {item.title}
              </Link>
            </h2>
            <p className="text-gray-600">${Number(item.price).toFixed(2)}</p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Quantity Adjustment Counter */}
              <div className="flex items-center border border-gray-300 rounded-lg bg-white h-12 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50 font-bold transition-colors h-full rounded-l-lg"
                  onClick={() => updateQty("decrement", item.id)}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50 font-bold transition-colors h-full rounded-l-lg"
                  onClick={() => updateQty("increment", item.id)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            title="Remove Item"
            aria-label={`Remove ${item.title} from cart`}
          >
            <TrashIcon className="h-5 w-5 text-white" />{" "}
            <span className="readonly hidden">Remove</span>
          </button>
        </div>
      ))}
    </>
  );
}
