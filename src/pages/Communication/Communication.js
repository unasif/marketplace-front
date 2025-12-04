import React, { useEffect, useState } from "react";
import styles from "./Communication.module.scss";
import { instance } from "../../api";

export const Communication = () => {
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    instance.get("base_info/contact")
      .then(res => {
        setContact(res.data.contact || "");
        setLoading(false);
      })
      .catch(() => {
        setError("Не вдалося завантажити інформацію.");
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <h3>Контакти</h3>
        {loading ? (
          <p>Завантаження...</p>
        ) : error ? (
          <p style={{color: 'red'}}>{error}</p>
        ) : (
          <p>{contact || "Інформація відсутня."}</p>
        )}
      </div>
    </div>
  );
};
