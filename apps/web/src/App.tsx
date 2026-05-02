import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { Products } from "./views/Products";
import { Dashboard } from "./views/Dashboard";
import { Cart } from "./views/Cart";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
