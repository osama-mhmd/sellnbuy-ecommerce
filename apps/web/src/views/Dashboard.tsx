import React, { useState, useEffect } from "react";
import {
  Package,
  ShoppingBag,
  User,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ products: [], orders: [] });

  console.log(data);

  // 1. Handle Login
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setIsLoggedIn(true);
    // const formData = new FormData(e.currentTarget);
    // const email = formData.get("email");
    // const password = formData.get("password");

    try {
      // const res = await fetch("/api/auth/login", {
      //   method: "POST",
      //   body: JSON.stringify({ email, password }),
      // });
      // if (res.ok) setIsLoggedIn(true);
    } catch {
      console.error("Login failed");
    } finally {
      setLoading(false);
    }
  }

  // 2. Fetch Dashboard Data
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        fetch("/api/product")
          .then((res) => res.json())
          .then((r) => r.products.products),
        fetch("/api/order").then((res) => res.json()),
      ]).then(([products, orders]) => setData({ products, orders }));
    }
  }, [isLoggedIn]);

  // Login View
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-2">
              Log in to manage your store
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Email Address
              </label>
              <Input
                name="email"
                type="email"
                placeholder="admin@store.com"
                className="rounded-xl border-gray-200 h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Password
              </label>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                className="rounded-xl border-gray-200 h-12"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gray-900 rounded-xl font-bold mt-2"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen py-24 bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col p-6">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold tracking-tight">Admin Console</span>
        </div>
        <nav className="space-y-1 flex-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-xl bg-gray-50 text-gray-900"
          >
            <ShoppingBag className="w-4 h-4" /> Orders
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-xl text-gray-500"
          >
            <Package className="w-4 h-4" /> Inventory
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-xl text-gray-500"
          >
            <User className="w-4 h-4" /> Customers
          </Button>
        </nav>
        <Button
          variant="ghost"
          onClick={() => setIsLoggedIn(false)}
          className="justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl"
        >
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              Dashboard Overview
            </h1>
            <div className="text-sm font-medium text-gray-500">May 5, 2026</div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Orders Table */}
            <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-50 px-6 py-5">
                <CardTitle className="text-lg font-bold">
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b border-gray-50">
                    <tr className="text-[10px] uppercase tracking-widest text-gray-400">
                      <th className="px-6 py-3">Order ID</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {data.orders.map((order) => (
                      <tr key={order.id} className="text-sm">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          #{order.id.slice(0, 8)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-green-50 text-green-600 rounded-md text-xs font-bold">
                            Paid
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          ${order.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Inventory Quick View */}
            <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-50 px-6 py-5">
                <CardTitle className="text-lg font-bold">
                  Active Inventory
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-50">
                  {data.products &&
                    data.products.slice(0, 6).map((product) => (
                      <div
                        key={product.id}
                        className="px-6 py-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                            <img
                              src={product.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900 truncate max-w-37.5">
                            {product.name}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-gray-400">
                          {product.stock} in stock
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
