import { useEffect } from "react";
import { instance } from "../api";

const Token = ({ setToken }) => {
  useEffect(() => {
    // Функція для отримання токену
    const fetchToken = async () => {
      try {
        const response = await instance.get("/auth/token/", {
          params: {
            login: process.env.REACT_APP_LOGIN,
            password: process.env.REACT_APP_PASSWORD,
          },
        });
        setToken(response.data.token);
      } catch (error) {
        console.error("Помилка отримання токену:", error);
      }
    };

    fetchToken();
  }, [setToken]);

  return null;
};

export default Token;
