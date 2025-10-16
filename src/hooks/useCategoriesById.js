import { useState, useEffect } from "react";
import { instance } from "../api";

const cache = {};

const useCategoriesById = (token, id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const cacheKey = `${token || "anon"}:${id == null ? "root" : String(id)}`;
        if (cache[cacheKey]) {
          if (!mounted) return;
          setData(cache[cacheKey]);
          setLoading(false);
          return;
        }

        const config = {};
        if (id !== null && id !== undefined) {
          config.params = { categories_id: id };
        }
        if (token) {
          const authValue =
            typeof token === "string" && token.startsWith("Bearer ")
              ? token
              : `Bearer ${token}`;
          config.headers = { Authorization: authValue };
        }

        const response = await instance.get("/category/by_categories_id/", config);

        const payload = response && response.data;
        let list = [];
        if (Array.isArray(payload)) list = payload;
        else if (Array.isArray(payload?.data)) list = payload.data;
        else if (Array.isArray(payload?.results)) list = payload.results;
        else if (Array.isArray(payload?.categories)) list = payload.categories;
        else list = []; // fallback

        cache[cacheKey] = list;
        if (mounted) setData(list);
      } catch (err) {
        console.error("Помилка отримання списку категорій:", err);
        if (mounted) setError(err);
        if (mounted) setData([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCategories();

    return () => {
      mounted = false;
    };
  }, [token, id]);

  return { data, loading, error }; // { changed code }
};

export default useCategoriesById;
