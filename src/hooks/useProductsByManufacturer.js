import { useState, useEffect } from "react";
import { instance } from "../api";

const useProductsByManufacturer = (manufacturer) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setError(null);
      try {
        const response = await instance.get(
          `/product/by_manufacturer/?manufacturer=${encodeURIComponent(manufacturer)}`
        );
        setProducts(response.data.rows || response.data);
      } catch (error) {
        console.error("Помилка отримання товарів виробника:", error);
        setError(error);
        setProducts([]);
      }
    };

    if (manufacturer) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [manufacturer]);

  return { products, error };
};

export default useProductsByManufacturer;
