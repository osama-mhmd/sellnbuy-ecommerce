import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const links = {
  Shop: ["New Arrivals", "Best Sellers", "Collections", "Deals"],
  Company: ["About Us", "Careers", "Blog", "Press"],
  Support: ["Help Center", "Returns", "Shipping Info", "Contact"],
};

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-gray-900" />
              </div>
              <span className="text-lg font-bold text-white">
                Sell<span className="text-gray-500">nbuy</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              Your modern marketplace for curated products. Quality goods,
              simple discovery, effortless checkout.
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Sellnbuy. Built for the college
            project.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
