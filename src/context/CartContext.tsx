import React, { createContext, useState, useContext, ReactNode } from "react";

interface CartItem {
  id: string;
  title: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (
    id: string,
    size: string,
    color: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          return parsedCart;
        }
      } catch (e) {
        console.error("Erro ao carregar carrinho:", e);
      }
    }
    return [];
  });

  const saveCart = (cartItems: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      // Verificar se o item já existe com o mesmo tamanho e cor
      const existingItemIndex = prevItems.findIndex(
        (i) =>
          i.id === item.id && i.size === item.size && i.color === item.color,
      );

      let newItems;
      if (existingItemIndex >= 0) {
        // Atualizar quantidade se o item já existir
        newItems = [...prevItems];
        newItems[existingItemIndex].quantity += item.quantity;
      } else {
        // Adicionar novo item
        newItems = [...prevItems, item];
      }

      saveCart(newItems);
      return newItems;
    });
  };

  const removeItem = (id: string, size: string, color: string) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color),
      );
      saveCart(newItems);
      return newItems;
    });
  };

  const updateQuantity = (
    id: string,
    size: string,
    color: string,
    quantity: number,
  ) => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) => {
        if (item.id === id && item.size === size && item.color === color) {
          return { ...item, quantity };
        }
        return item;
      });
      saveCart(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
