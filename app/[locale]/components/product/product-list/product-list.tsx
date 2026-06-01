import React from "react";
import Image from 'next/image';
import file from '@/assets/file.svg'; // Static image in the assets folder
import { products } from "@/lib/db";
import AddToCartButton from "../../share/addtocart/addtocart";
import { Link } from "@/i18n/navigation";




// Simulated async data fetch (could be from DB or API)
async function getProducts() {
  // In real apps, replace with DB query or API call
  return products; // This is our mock data from lib/db.ts
}

export default async function ProductList() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid Container */}
        {/* Mobile: 1 col | Tablet: 2 cols | Small Desktop: 3 cols | Large Desktop: 4 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group relative flex flex-col justify-between bg-white rounded-2xl border border-gray-100 p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              
              {/* Image Box */}
              <div className="relative w-full h-64 overflow-hidden rounded-xl bg-gray-100">
                <Image 
                  src={file.src}
                  alt={product.name}
                  width={200} height={200}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Optional "New" Badge overlay */}
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    New
                  </span>
                )}
              </div>

              {/* Product Info Content Box */}
              <div className="flex-1 flex flex-col pt-4 pb-2 px-1">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                  {product.category}
                </p>
                
                {/* line-clamp-2 fixes container breaking if name stretches across multiple lines */}
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 transition-colors">
                  <Link href={`/products/${product.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                
                {/* Price and Action Section */}
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-50">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price}
                  </span>
                  
                  {/* Add add to cart Button */}
                  <AddToCartButton productId={product.id} />
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}