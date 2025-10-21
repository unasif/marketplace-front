import { useState, useEffect } from "react";
import { instance } from "../api";

const useCategoriesById = (token, id) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Функція для отримання списку категорій з використанням токену
    const fetchCategories = async () => {
      try {
        const response = await instance.get(`/category/by_categories_id/?categories_id=${id}`, {
          headers: {
            Authorization: token,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Помилка отримання списку категорій:", error);
      }
    };

    if (token) {
      fetchCategories();
    }
  }, [token]);

  return categories;
};

export default useCategoriesById;
