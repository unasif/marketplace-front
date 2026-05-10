import { useState, useEffect } from "react";
import { instance } from "../api";

const useProductsByManufacturer = (manufacturers) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔄 useProductsByManufacturer: Хук ініціалізований");
    console.log("🏭 useProductsByManufacturer: manufacturers =", manufacturers);

    const fetchProducts = async () => {
      console.log("⏳ useProductsByManufacturer: Починаємо завантажувати товари...");
      setLoading(true);
      setError(null);
      try {
        // Перетворюємо виробників на масив для єдиної обробки
        const manufacturerList = Array.isArray(manufacturers) 
          ? manufacturers 
          : (manufacturers ? [manufacturers] : []);

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
        const seenIds = new Set();
        responses.forEach((response, index) => {
          const productsData = response.data.rows || response.data;
          console.log(`✅ useProductsByManufacturer: Успішно отримано товари від виробника "${manufacturerList[index]}"`);
          console.log(`📊 Кількість товарів:`, 
            Array.isArray(productsData) ? productsData.length : 0
          );
          
          if (Array.isArray(productsData)) {
            productsData.forEach(product => {
              // Уникаємо дублікатів товарів
              if (!seenIds.has(product.id_bas)) {
                seenIds.add(product.id_bas);
                allProducts.push(product);
              }
            });
          }
        });

        console.log("📦 useProductsByManufacturer: Усього унікальних товарів з усіх виробників:", allProducts.length);
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

    if (manufacturers && (Array.isArray(manufacturers) ? manufacturers.length > 0 : true)) {
      console.log("✔️ useProductsByManufacturer: Виробник(и) вказан(i), виконуємо запит");
      fetchProducts();
    } else {
      console.log("⚠️ useProductsByManufacturer: Виробники не вказані, очищуємо товари");
      setProducts([]);
      setError(null);
      setLoading(false);
    }

    return () => {
      console.log("🧹 useProductsByManufacturer: Хук очищується (cleanup)");
    };
  }, [manufacturers]);

  console.log("🔍 useProductsByManufacturer: Повертаємо стан:", {
    productsCount: products.length,
    loading,
    error: error?.message || null,
  });

  return { products, loading, error };
};

export default useProductsByManufacturer;
