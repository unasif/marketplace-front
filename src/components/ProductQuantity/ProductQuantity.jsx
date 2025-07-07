import React, { useState, useEffect } from "react";
import { instance } from "../../api";
import styles from "./ProductQuantity.module.scss";

const ProductQuantity = ({ token, idProduct }) => {
  const [productQuantity, setProductQuantity] = useState([]);

  useEffect(() => {
    const fetchProductQuantity = async () => {
      try {
        const response = await instance.get(
          `/products_quantity/?id_bas_product=${idProduct}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setProductQuantity(response.data);
      } catch (error) {
        console.error("Помилка отримання кількості товару:", error);
      }
    };

    if (token && idProduct) {
      fetchProductQuantity();
    }
  }, [token, idProduct]);

  return (
    <div>
      {productQuantity.length > 0 && productQuantity[0].quantity > 0 ? (
        <div className={styles.inStock}>Готово до відправки</div>
      ) : (
        <div className={styles.notStock}>Немає в наявності</div>
      )}
    </div>
  );
};

export default ProductQuantity;