import { useEffect, useState } from "react";

export default function useCategoriesTree(token) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("/api/category/tree", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => res.json())
      .then(setCategories);
  }, [token]);
  return categories;
}