import React from "react";
import styles from "./SampleNextArrow.module.scss";

function SampleNextArrow(props) {
  const { onClick } = props;
  return <div className={styles.nextArrow} onClick={onClick} />;
}

export default SampleNextArrow;
