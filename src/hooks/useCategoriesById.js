import { useState, useEffect } from "react";
import { instance } from "../api";

const useCategoriesById = (id) => {
  const [categories, setCategories] = useState([]);
// Функція для отримання списку категорій з використанням токену
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await instance.get(`/category/by_categories_id/?categories_id=${id}`);
        setCategories(response.data);
      } catch (error) {
        console.error("Помилка отримання списку категорій:", error);
      }
    };

    if (id) {
      fetchCategories();
    }
  }, [id]);

  return categories;
};

export default useCategoriesById;