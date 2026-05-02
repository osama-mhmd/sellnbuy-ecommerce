import { useState, useEffect } from "react";
import type { Product } from "@/components/ProductCard";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const res = await fetch("/api/product", { signal: controller.signal });
        if (!res.ok)
          throw new Error(`Failed to fetch products (${res.status})`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : (data.products ?? []));
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError((err as Error).message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
    return () => controller.abort();
  }, []);

  return { products, loading, error };
}
