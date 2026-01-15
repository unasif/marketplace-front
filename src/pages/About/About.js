import React, { useEffect, useState } from "react";
import styles from "./About.module.scss";
import { instance } from "../../api";

export const About = () => {
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    instance.get("base_info/about")
      .then(res => {
        setAbout(res.data.about || "");
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
        <h3>Про нас</h3>
        {loading ? (
          <p>Завантаження...</p>
        ) : error ? (
          <p >{error}</p>
        ) : (
          <p>{about || "Інформація відсутня."}</p>
        )}
      </div>
    </div>
  );
};
