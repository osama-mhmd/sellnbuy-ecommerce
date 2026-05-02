import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const rating = product.rating ?? 4.5;
  const reviewCount = product.reviewCount ?? 0;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-gray-100 hover:-translate-y-1 transition-all duration-300">
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl opacity-20">🛍️</div>
          </div>
        )}
        {product.category && (
          <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700 border-0 text-xs font-medium backdrop-blur-sm">
            {product.category}
          </Badge>
        )}
        <Button
          size="icon"
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-gray-900 hover:bg-gray-700 rounded-xl shadow-lg"
        >
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-gray-700">
            {rating.toFixed(1)}
          </span>
          {reviewCount > 0 && (
            <span className="text-xs text-gray-400">({reviewCount})</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">
            $
            {typeof product.price === "number"
              ? product.price.toFixed(2)
              : product.price}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 rounded-xl border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
