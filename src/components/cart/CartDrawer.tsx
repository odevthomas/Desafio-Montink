import React from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Trash2, X, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  const formatPrice = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl animate-in slide-in-from-right">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="text-lg font-medium">Carrinho</h2>
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">
                {totalItems} itens
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-gray-300" />
                <p className="mt-2 text-center text-gray-500">
                  Seu carrinho está vazio
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}-${index}`}
                    className="rounded-lg border p-3"
                  >
                    <div className="flex gap-3">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">{item.title}</h3>
                          <p className="text-sm font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          Tamanho: {item.size} | Cor: {item.color}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            <button
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.size,
                                  item.color,
                                  Math.max(1, item.quantity - 1),
                                )
                              }
                            >
                              -
                            </button>
                            <span className="px-2 py-1">{item.quantity}</span>
                            <button
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.size,
                                  item.color,
                                  item.quantity + 1,
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              removeItem(item.id, item.size, item.color)
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm">Subtotal</p>
                  <p className="text-sm font-medium">
                    {formatPrice(totalPrice)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Frete</p>
                  <p className="text-sm font-medium text-green-600">Grátis</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p className="font-medium">Total</p>
                  <p className="font-medium">{formatPrice(totalPrice)}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={clearCart}
                  >
                    Limpar
                  </Button>
                  <Button className="flex-1">Finalizar Compra</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
