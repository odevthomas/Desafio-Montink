import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartIcon from "@/components/cart/CartIcon";
import CartDrawer from "@/components/cart/CartDrawer";

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold text-blue-600"></span>
        </Link>
        <div className="flex items-center gap-4">
          <CartIcon onClick={() => setIsCartOpen(true)} />
        </div>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
