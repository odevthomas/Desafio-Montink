import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartIconProps {
  onClick: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  const { totalItems } = useCart();

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
    >
      <ShoppingBag className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
