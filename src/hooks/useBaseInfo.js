import { useState, useEffect } from "react";
import { instance } from "../api";

const useBaseInfo = () => {
  const [baseInfo, setBaseInfo] = useState({});

  useEffect(() => {
    // Функція для отримання даних з base_info з використанням токену
    const fetchBaseInfo = async () => {
      try {
        const response = await instance.get("/base_info/");
        setBaseInfo(response.data);
      } catch (error) {
        console.error("Помилка отримання даних з base_info:", error);
      }
    };
    fetchBaseInfo();
  }, []);

  return baseInfo;
};

export default useBaseInfo;