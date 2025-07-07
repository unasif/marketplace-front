import React, { useState, useEffect } from "react";
import { instance } from "../../api";
import styles from "./ProductPrice.module.scss";

const ProductPrice = ({ token, idProduct }) => {
  const [priceData, setPriceData] = useState([]);

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
        setPriceData(response.data);
      } catch (error) {
        console.error("Помилка отримання ціни продукту:", error);
      }
    };

    if (token && idProduct) {
      fetchProductPrice();
    }
  }, [token, idProduct]);

  return (
    <div>
      {priceData.length > 0 ? (
        <div>
          {priceData[0].price === 0 ? (
            <div className={styles.oldPrice}>Ціну уточнюйте</div>
          ) : (
            <div
              className={
                priceData[0].action_price === 0
                  ? styles.hiddenPrice
                  : styles.oldPrice
              }
            >
              <s>{priceData[0].price} ₴</s>
            </div>
          )}

          <div
            className={
              priceData[0].action_price === 0
                ? styles.price
                : styles.actionPrice
            }
          >
            {priceData[0].action_price === 0 ? 
            (<span>{priceData[0].price} ₴</span>)
            : (<span>{priceData[0].action_price} ₴</span>)}
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.notPrice}>Ціну уточнюйте</div>
        </div>
      )}
    </div>
  );
};

export default ProductPrice;
