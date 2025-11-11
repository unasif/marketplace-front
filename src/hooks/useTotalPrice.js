import { useState, useEffect } from "react";
import { instance } from "../api";

const useTotalPrice = (cart) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = async () => {
      let sum = 0;

      for (const item of cart) {
        try {
          // Запит для отримання ціни
          const response = await instance.get(
            `/products_price/?id_bas_product=${item.id_bas}`
          );
          const priceData = response.data[0];
          const price = priceData?.action_price || priceData?.price || 0;

          sum += price * item.quantity;
        } catch (error) {
          console.error(
            `Помилка отримання ціни для продукту ${item.id_bas}:`,
            error
          );
        }
      }

      setTotal(sum);
    };

    if (cart.length > 0) {
      calculateTotal();
    } else {
      setTotal(0);
    }
  }, [cart]);

  return total;
};

export default useTotalPrice;
