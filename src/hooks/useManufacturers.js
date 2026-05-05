import { useState, useEffect } from "react";
import { instance } from "../api";

const useManufacturers = (categoriesId = null) => {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔄 useManufacturers: Хук ініціалізований");
    console.log("📋 useManufacturers: categoriesId =", categoriesId);

    const fetchManufacturers = async () => {
      console.log("⏳ useManufacturers: Починаємо завантажувати виробників...");
      setLoading(true);
      setError(null);
      try {
        let url = "/product/manufacturers/";
        if (categoriesId) {
          url += `?categories_id=${categoriesId}`;
        }

        console.log("🌐 useManufacturers: Запит до URL:", url);
        const response = await instance.get(url);
        
        console.log("✅ useManufacturers: Успішно отримано виробників");
        console.log("📊 useManufacturers: Кількість виробників:", response.data?.length || 0);
        console.log("📦 useManufacturers: Дані відповіді:", response.data);
        
        setManufacturers(response.data);
      } catch (error) {
        console.error("❌ useManufacturers: Помилка отримання списку виробників:", error);
        console.error("📝 useManufacturers: Деталі помилки:", {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
        setError(error);
      } finally {
        console.log("🏁 useManufacturers: Завершено завантаження");
        setLoading(false);
      }
    };

    fetchManufacturers();

    return () => {
      console.log("🧹 useManufacturers: Хук очищується (cleanup)");
    };
  }, [categoriesId]);

  console.log("🔍 useManufacturers: Повертаємо стан:", {
    manufacturersCount: manufacturers.length,
    loading,
    error: error?.message || null,
  });

  return { manufacturers, loading, error };
};

export default useManufacturers;
