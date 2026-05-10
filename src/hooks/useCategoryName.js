import { useState, useEffect } from "react";
import { instance } from "../api";

const useCategoryName = (categoryId) => {
  const [categoryName, setCategoryName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) {
      setCategoryName(null);
      return;
    }

    const fetchCategoryName = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await instance.get(`/category/?id=${categoryId}`);
        
        // Обробляємо обидва випадки: масив або об'єкт
        let categoryData = null;
        if (Array.isArray(response.data) && response.data.length > 0) {
          categoryData = response.data[0];
        } else if (response.data && typeof response.data === 'object') {
          categoryData = response.data;
        }
        
        setCategoryName(categoryData?.name || null);
      } catch (err) {
        console.error("Помилка отримання назви категорії:", err);
        setError(err);
        setCategoryName(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryName();
  }, [categoryId]);

  return { categoryName, loading, error };
};

export default useCategoryName;
