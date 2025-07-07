import React, { createContext, useContext, useState, useEffect } from "react";

// Створення контексту
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Завантаження кошика з localStorage, якщо він існує
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Збереження кошика в localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Додавання товару до кошика
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Збільшуємо кількість, якщо товар вже є в кошику
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Додаємо новий товар
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Видалення товару з кошика
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Оновлення кількості товару
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Очистка кошика
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

// Хук для зручного доступу до контексту кошика
export const useCart = () => useContext(CartContext);
