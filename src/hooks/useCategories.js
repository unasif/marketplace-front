import { useState, useEffect } from "react";
import { instance } from "../api";

const useCategories = (token) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Функція для отримання списку категорій з використанням токену
    const fetchCategories = async () => {
      try {
        const response = await instance.get("/category/", {
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

export default useCategories;
