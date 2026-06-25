'use client';

import { Product } from '@/app/models/Product';
import useCartStore from '@/app/store/cartStore';


export default function AddToCartButton( { product }: { product: Product } ) {

    const addToCart = useCartStore((state) => state.addToCart);

  return (
    <>
      <button
        onClick={() => addToCart(product)}
        className="px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </>
  );
}