import React from "react";
import { Link } from "react-router-dom";
import styles from "./OrderSuccess.module.scss";

const OrderSuccess = () => {
  return (
    <div className={styles.successPage}>
      <h2>Замовлення успішно оформлене!</h2>
      <p>Дякуємо за ваше замовлення.</p>
      <Link to="/" className={styles.link}>
        На головну
      </Link>
    </div>
  );
};

export default OrderSuccess;
