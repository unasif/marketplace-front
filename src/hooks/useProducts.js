import { useState, useEffect } from "react";
import { instance } from "../api";

const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Функція для отримання списку товарів з використанням токену
    const fetchProducts = async () => {
      try {
        const response = await instance.get("/product/");
        setProducts(response.data);
      } catch (error) {
        console.error("Помилка отримання списку товарів:", error);
      }
    };
    fetchProducts();
  }, []);

  return products;
};

export default useProducts;
