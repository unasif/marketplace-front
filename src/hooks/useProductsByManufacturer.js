import { useState, useEffect } from "react";
import { instance } from "../api";

const useProductsByManufacturer = (manufacturer) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔄 useProductsByManufacturer: Хук ініціалізований");
    console.log("🏭 useProductsByManufacturer: manufacturer =", manufacturer);

    const fetchProducts = async () => {
      console.log("⏳ useProductsByManufacturer: Починаємо завантажувати товари...");
      setError(null);
      try {
        const encodedManufacturer = encodeURIComponent(manufacturer);
        const url = `/product/by_manufacturer/?manufacturer=${encodedManufacturer}`;

        console.log("🌐 useProductsByManufacturer: Запит до URL:", url);
        console.log("🔐 useProductsByManufacturer: Кодований виробник:", encodedManufacturer);
        
        const response = await instance.get(url);
        
        console.log("✅ useProductsByManufacturer: Успішно отримано товари");
        console.log("📦 useProductsByManufacturer: Повна відповідь:", response.data);
        
        const productsData = response.data.rows || response.data;
        console.log("📊 useProductsByManufacturer: Кількість товарів:", 
          Array.isArray(productsData) ? productsData.length : 0
        );
        console.log("📋 useProductsByManufacturer: Товари:", productsData);
        
        setProducts(productsData);
      } catch (error) {
        console.error("❌ useProductsByManufacturer: Помилка отримання товарів виробника:", error);
        console.error("📝 useProductsByManufacturer: Деталі помилки:", {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
        setError(error);
        setProducts([]);
      }
    };

    if (manufacturer) {
      console.log("✔️ useProductsByManufacturer: Виробник вказан, виконуємо запит");
      fetchProducts();
    } else {
      console.log("⚠️ useProductsByManufacturer: Виробник не вказан, очищуємо товари");
      setProducts([]);
      setError(null);
    }

    return () => {
      console.log("🧹 useProductsByManufacturer: Хук очищується (cleanup)");
    };
  }, [manufacturer]);

  console.log("🔍 useProductsByManufacturer: Повертаємо стан:", {
    productsCount: products.length,
    error: error?.message || null,
  });

  return { products, error };
};

export default useProductsByManufacturer;
