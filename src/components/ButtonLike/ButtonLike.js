import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import styles from "./ButtonLike.module.scss";

const likeNomenclature = () => {
  console.log("test");
};

function ButtonLike() {
  return (
    <div className={styles.icon} onClick={likeNomenclature}>
      <FontAwesomeIcon icon={faHeart} />
    </div>
  );
}

export default ButtonLike;
