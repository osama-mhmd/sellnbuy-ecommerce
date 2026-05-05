import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductSkeleton } from "./Home";
import { useProducts } from "@/hooks/use-products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Products() {
  const { products, loading, error } = useProducts();

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              All Products
            </h1>
            <p className="text-gray-500 mt-2">
              Explore our full collection of curated goods.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10 rounded-2xl border-gray-200 bg-white"
              />
            </div>
            <Button
              variant="outline"
              className="rounded-2xl border-gray-200 gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filter
            </Button>
          </div>
        </div>

        {/* Results Grid */}
        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 text-red-600 p-6 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        {!loading && products.length === 0 && (
          <div className="text-center py-32">
            <p className="text-gray-400">
              We couldn't find any products matching your criteria.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
