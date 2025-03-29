import { createContext, useState, useEffect } from "react";
import { CartItem } from "../types/CartItem";


interface CartContextType {
  cart: CartItem[];
  addToCart: (book: CartItem) => void;
  updateQuantity: (bookID: number, quantity: number) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.bookID === book.bookID);
      if (exists) {
        return prev.map((item) =>
          item.bookID === book.bookID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...book, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (bookID: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.bookID === bookID ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (bookID: number) => {
    setCart((prev) => prev.filter((item) => item.bookID !== bookID));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
