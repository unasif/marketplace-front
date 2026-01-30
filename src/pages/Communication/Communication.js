import React from "react";
import styles from "./Communication.module.scss";
import useBaseInfo from "../../hooks/useBaseInfo";

export const Communication = () => {
  const baseInfo = useBaseInfo();
  const info = Array.isArray(baseInfo) ? baseInfo[0] || {} : baseInfo || {};
  const contact = info.contact || "";

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <h3>Контакти</h3>
        <p>{contact ? contact : "Інформація відсутня."}</p>
      </div>
    </div>
  );
};
