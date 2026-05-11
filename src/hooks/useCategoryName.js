import { useMemo } from "react";
import useCategories from "./useCategories";

const useCategoryName = (categoryId) => {
  const categories = useCategories();

  const categoryName = useMemo(() => {
    if (!categoryId) return null;
    
    const category = categories.find(cat => String(cat.id) === String(categoryId));
    return category?.name || null;
  }, [categoryId, categories]);

  return { categoryName, loading: false, error: null };
};

export default useCategoryName;
