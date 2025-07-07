import { useState, useEffect } from "react";
import { instance } from "../api";

const useProductsByCategory = (token, id) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Функція для отримання списку товарів з використанням токену
    const fetchProducts = async () => {
      try {
        const response = await instance.get(
          `product/by_categories_id/?categories_id=${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Помилка отримання списку товарів:", error);
      }
    };

    if (token && id) {
      fetchProducts();
    }
  }, [token, id]);

  return products;
};

export default useProductsByCategory;
