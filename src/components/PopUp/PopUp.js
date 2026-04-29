import React, { useEffect } from "react";
import styles from "./PopUp.module.scss";
import { usePopUp } from "../../contexts/PopUpContext";

function PopUp({ id, message, type }) {
  const { removePopUp } = usePopUp();

  useEffect(() => {
    const timer = setTimeout(() => {
      removePopUp(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, removePopUp]);

  return (
    <div className={`${styles.popup} ${styles[type]}`}>
      <div className={styles.content}>
        {type === "success" && (
          <span className={styles.icon}>✓</span>
        )}
        {type === "error" && (
          <span className={styles.icon}>✕</span>
        )}
        <p className={styles.message}>{message}</p>
      </div>
      <button
        className={styles.close}
        onClick={() => removePopUp(id)}
        aria-label="Закрити"
      >
        ✕
      </button>
    </div>
  );
}

export default PopUp;
