import React, { useState, useEffect } from "react";
import { instance } from "../../api";
import styles from "./ProductPriceCartShopping.module.scss";

const ProductPriceCartShopping = ({ token, idProduct }) => {
  const [priceData, setPriceData] = useState(null); // Початковий стан - null

  useEffect(() => {
    const fetchProductPrice = async () => {
      try {
        const response = await instance.get(
          `/products_price/?id_bas_product=${idProduct}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setPriceData(response.data[0] || null); // Беремо перший елемент або null
      } catch (error) {
        console.error("Помилка отримання ціни продукту:", error);
      }
    };

    if (token && idProduct) {
      fetchProductPrice();
    }
  }, [token, idProduct]);

  if (!priceData) {
    return <span className={styles.price}>&nbsp;0&nbsp;</span>;
  }

  return (
    <span className={styles.price}>
      {priceData.price === 0 ? (
        <span>0</span>
      ) : priceData.action_price === 0 ? (
        <span>&nbsp;{priceData.price}&nbsp;</span>
      ) : (
        <span>
          <span className={styles.price}>&nbsp;{priceData.action_price}&nbsp;</span>
        </span>
      )}
    </span>
  );
};

export default ProductPriceCartShopping;
