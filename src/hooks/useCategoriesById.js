import { useState, useEffect } from "react";
import { instance } from "../api";

const useCategoriesById = (id) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (id === undefined || id === null || id === "") return; // <- мінімальний guard

    const fetchCategories = async () => {
      try {
        const response = await instance.get(`/category/by_categories_id/`, {
          params: id !== null ? { categories_id: id } : {}
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Помилка отримання списку категорій:", error);
      }
    };
    fetchCategories();
  }, [id]);

  return categories;
};

export default useCategoriesById;
