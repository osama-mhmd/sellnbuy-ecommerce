import { ArrowRight, Sparkles, TrendingUp, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/use-products";

const PERKS = [
  { icon: Truck, label: "Free Shipping", desc: "On all orders over $50" },
  { icon: Shield, label: "Secure Payments", desc: "256-bit SSL encryption" },
  { icon: TrendingUp, label: "Best Prices", desc: "Price-match guarantee" },
];

function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/4" />
        <div className="flex justify-between items-center pt-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const { products, loading, error } = useProducts();
  const featured = products.slice(0, 8);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,0,0,0.04),transparent)]" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gray-100 blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-gray-200 blur-3xl opacity-40" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs font-medium px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            Curated products, delivered fast
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-gray-900 leading-[1.05] mb-6">
            Shop smarter,{" "}
            <span className="relative inline-block">
              <span className="relative z-10">live better</span>
              <span className="absolute bottom-1 left-0 right-0 h-4 bg-gray-200 z-0 rounded" />
            </span>
          </h1>

          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Discover thousands of quality products — from everyday essentials to
            one-of-a-kind finds. All in one clean, simple marketplace.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-700 text-white rounded-2xl px-8 h-12 font-semibold text-sm gap-2 shadow-lg shadow-gray-200"
            >
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-2xl px-8 h-12 font-semibold text-sm border-gray-200 hover:bg-gray-50"
            >
              Browse Collections
            </Button>
          </div>
        </div>
      </section>

      {/* Perks strip */}
      <section className="border-y border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {PERKS.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex items-center gap-4 px-6 py-4 sm:py-2"
            >
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Handpicked for you
            </p>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Featured Products
            </h2>
          </div>
          <Button
            variant="ghost"
            className="hidden sm:flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 text-red-600 text-sm px-6 py-5 text-center">
            Could not load products — {error}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20 text-gray-400 text-sm">
            No products found.
          </div>
        )}

        <div className="sm:hidden text-center mt-8">
          <Button
            variant="outline"
            className="rounded-2xl px-8 border-gray-200"
          >
            View all products <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-6 mb-20 rounded-3xl bg-gray-900 px-8 py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,rgba(255,255,255,0.05),transparent)]" />
        <div className="relative">
          <p className="text-gray-400 text-sm font-medium mb-3">
            Limited time offer
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
            Get 20% off your first order
          </h2>
          <p className="text-gray-400 text-sm max-w-sm mx-auto mb-8">
            Sign up and get an exclusive discount on your first purchase. No
            strings attached.
          </p>
          <Button
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100 rounded-2xl px-8 h-12 font-semibold text-sm"
          >
            Claim Your Discount
          </Button>
        </div>
      </section>
    </main>
  );
}
