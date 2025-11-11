import { useState, useEffect } from "react";
import { instance } from "../api";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Функція для отримання списку категорій з використанням токену
    const fetchCategories = async () => {
      try {
        const response = await instance.get("/category/");
        setCategories(response.data);
      } catch (error) {
        console.error("Помилка отримання списку категорій:", error);
      }
    };
    fetchCategories();
  }, []);

  return categories;
};

export default useCategories;
