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
        setCategoryName(response.data?.[0]?.name || null);
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
