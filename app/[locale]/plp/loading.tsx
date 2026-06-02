import ProductCardSkeleton from "../components/product/product-list/product-card-skeleton";

export default function Loading() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8 h-8 bg-gray-200 rounded animate-pulse w-1/4" />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Render multiple skeletons to mimic a grid layout */}
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </main>
  );
}