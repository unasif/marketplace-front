import { useState, useEffect } from "react";
import { instance } from "../api";

const useProducts = (token) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Функція для отримання списку товарів з використанням токену
    const fetchProducts = async () => {
      try {
        const response = await instance.get("/product/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Помилка отримання списку товарів:", error);
      }
    };
    fetchProducts();
  }, [token]);

  return products;
};

export default useProducts;
