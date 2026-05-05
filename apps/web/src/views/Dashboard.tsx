import { useState, useEffect } from "react";
import "./dashbord.css";

const API = "http://localhost:3000";

export function Dashboard() {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [view, setView] = useState<"products" | "orders">("products");

  function handleLogin() {
    if (username === "admin" && password === "1234") {
      setIsLogged(true);
    } else {
      alert("Wrong credentials");
    }
  }

  async function getProducts() {
    const res = await fetch(API + "/products");
    const data = await res.json();
    setProducts(data);
  }

  async function getOrders() {
    const res = await fetch(API + "/orders");
    const data = await res.json();
    setOrders(data);
  }

  useEffect(() => {
    if (isLogged) {
      getProducts();
      getOrders();
    }
  }, [isLogged]);

  async function addProduct() {
    await fetch(API + "/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });

    setName("");
    setPrice("");
    getProducts();
  }

  async function deleteProduct(id: number) {
    await fetch(API + "/products/" + id, {
      method: "DELETE",
    });

    getProducts();
  }

  if (!isLogged) {
    return (
      <div className="container">
        <h2>Admin Login</h2>

        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <button onClick={() => setView("products")}>Products</button>
      <button onClick={() => setView("orders")}>Orders</button>

      {view === "products" && (
        <div>
          <h2>Products</h2>

          <input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button onClick={addProduct}>Add</button>

          {products.map((p) => (
            <div key={p.id} className="card">
              {p.name} - {p.price}
              <button onClick={() => deleteProduct(p.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {view === "orders" && (
        <div>
          <h2>Orders</h2>

          {orders.map((o) => (
            <div key={o.id} className="card">
              <p><b>{o.customer_name}</b></p>
              <p>{o.phone}</p>
              <p>{o.location}</p>

              <h4>Items:</h4>

              {o.orderItems?.map((item: any, index: number) => (
                <p key={index}>
                  {item.product_name} × {item.quantity}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}