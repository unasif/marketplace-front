import React from "react";
import styles from "./About.module.scss";
import useBaseInfo from "../../hooks/useBaseInfo";

export const About = () => {
  const baseInfo = useBaseInfo();
  const info = Array.isArray(baseInfo) ? baseInfo[0] || {} : baseInfo || {};
  const about = info.About;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <h3>Про нас</h3>
        <p>{about ? about : "Інформація відсутня."}</p>
      </div>
    </div>
  );
};
