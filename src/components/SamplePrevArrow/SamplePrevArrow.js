import React from "react";
import styles from "./SamplePrevArrow.module.scss";

function SamplePrevArrow(props) {
  const { onClick } = props;
  return <div className={styles.prevArrow} onClick={onClick} />;
}

export default SamplePrevArrow;
