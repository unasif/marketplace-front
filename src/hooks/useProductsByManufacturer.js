import { useState, useEffect } from "react";
import { instance } from "../api";

const useProductsByManufacturer = (manufacturer) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔄 useProductsByManufacturer: Хук ініціалізований");
    console.log("🏭 useProductsByManufacturer: manufacturer =", manufacturer);

    const fetchProducts = async () => {
      console.log("⏳ useProductsByManufacturer: Починаємо завантажувати товари...");
      setLoading(true);
      setError(null);
      try {
        // Перетворюємо виробника на масив для єдиної обробки
        const manufacturerList = Array.isArray(manufacturer) 
          ? manufacturer 
          : (manufacturer ? [manufacturer] : []);

        if (manufacturerList.length === 0) {
          console.log("⚠️ useProductsByManufacturer: Список виробників порожній");
          setProducts([]);
          setLoading(false);
          return;
        }

        console.log("📋 useProductsByManufacturer: Кількість виробників:", manufacturerList.length);

        // Отримуємо товари для кожного виробника
        const requests = manufacturerList.map(mfg => {
          const encodedManufacturer = encodeURIComponent(mfg);
          const url = `/product/by_manufacturer/?manufacturer=${encodedManufacturer}`;
          console.log("🌐 useProductsByManufacturer: Запит до URL:", url);
          return instance.get(url);
        });

        const responses = await Promise.all(requests);
        
        // Комбінуємо результати з усіх запитів
        const allProducts = [];
        responses.forEach((response, index) => {
          const productsData = response.data.rows || response.data;
          console.log(`✅ useProductsByManufacturer: Успішно отримано товари від виробника "${manufacturerList[index]}"`);
          console.log(`📊 Кількість товарів:`, 
            Array.isArray(productsData) ? productsData.length : 0
          );
          
          if (Array.isArray(productsData)) {
            allProducts.push(...productsData);
          }
        });

        console.log("📦 useProductsByManufacturer: Усього товарів з усіх виробників:", allProducts.length);
        setProducts(allProducts);
      } catch (error) {
        console.error("❌ useProductsByManufacturer: Помилка отримання товарів:", error);
        console.error("📝 useProductsByManufacturer: Деталі помилки:", {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
        setError(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (manufacturer) {
      console.log("✔️ useProductsByManufacturer: Виробник(и) вказан(i), виконуємо запит");
      fetchProducts();
    } else {
      console.log("⚠️ useProductsByManufacturer: Виробник не вказан, очищуємо товари");
      setProducts([]);
      setError(null);
      setLoading(false);
    }

    return () => {
      console.log("🧹 useProductsByManufacturer: Хук очищується (cleanup)");
    };
  }, [manufacturer]);

  console.log("🔍 useProductsByManufacturer: Повертаємо стан:", {
    productsCount: products.length,
    loading,
    error: error?.message || null,
  });

  return { products, loading, error };
};

export default useProductsByManufacturer;
