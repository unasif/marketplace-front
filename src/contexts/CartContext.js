import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getCartProductId,
  normalizeCartProduct,
} from "../utils/cartProduct";

const CartContext = createContext();

const cartItemMatchesId = (item, productId) =>
  getCartProductId(item) === String(productId);

const mergeCartItems = (items) => {
  const merged = new Map();

  items.forEach((item) => {
    const normalized = normalizeCartProduct(item);
    const id = normalized.id;

    if (!id) {
      return;
    }

    if (merged.has(id)) {
      const existing = merged.get(id);
      merged.set(id, {
        ...existing,
        quantity: existing.quantity + (item.quantity || 1),
        main_photo: existing.main_photo || normalized.main_photo,
      });
    } else {
      merged.set(id, { ...normalized, quantity: item.quantity || 1 });
    }
  });

  return Array.from(merged.values());
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) {
      return [];
    }

    try {
      return mergeCartItems(JSON.parse(savedCart));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const normalized = normalizeCartProduct(product);

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => getCartProductId(item) === normalized.id
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          cartItemMatchesId(item, normalized.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...normalized, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !cartItemMatchesId(item, productId))
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        cartItemMatchesId(item, productId) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
