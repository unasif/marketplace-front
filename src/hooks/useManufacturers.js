import { useState, useEffect } from "react";
import { instance } from "../api";

const useManufacturers = (categoriesId = null) => {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManufacturers = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = "/product/manufacturers/";
        if (categoriesId) {
          url += `?categories_id=${categoriesId}`;
        }

        const response = await instance.get(url);
        setManufacturers(response.data);
      } catch (error) {
        console.error("Помилка отримання списку виробників:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchManufacturers();
  }, [categoriesId]);

  return { manufacturers, loading, error };
};

export default useManufacturers;
