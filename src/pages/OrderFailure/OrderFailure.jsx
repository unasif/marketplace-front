import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./OrderFailure.module.scss";

const OrderFailure = () => {
  const location = useLocation();
  const message = location.state?.message || "Сталася невідома помилка.";

  return (
    <div className={styles.failurePage}>
      <h2>Помилка при оформленні замовлення</h2>
      <p>{message}</p>
      <p>
        Будь ласка, зверніться до технічної підтримки:{" "}
        <a href="mailto:support@example.com" className={styles.emailLink}>
          support@example.com
        </a>
      </p>
      <Link to="/" className={styles.link}>
        На головну
      </Link>
    </div>
  );
};

export default OrderFailure;
