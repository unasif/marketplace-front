import React, { createContext, useContext, useState } from "react";

// Створюємо контекст
const CategoryContext = createContext();

// Компонент провайдера
export const CategoryProvider = ({ children }) => {
  const [openId, setOpenId] = useState(localStorage.getItem("openCategoryId") || null);

  // Оновлюємо openId і зберігаємо в localStorage
  const updateOpenId = (id) => {
    if (id === openId) {
      setOpenId(null);
      localStorage.removeItem("openCategoryId");
    } else {
      setOpenId(id);
      localStorage.setItem("openCategoryId", id);
    }
  };

  return (
    <CategoryContext.Provider value={{ openId, updateOpenId }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Хук для доступу до контексту
export const useCategoryContext = () => useContext(CategoryContext);
