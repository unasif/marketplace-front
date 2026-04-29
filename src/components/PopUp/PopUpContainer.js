import React from "react";
import PopUp from "./PopUp";
import { usePopUp } from "../../contexts/PopUpContext";
import styles from "./PopUpContainer.module.scss";

function PopUpContainer() {
  const { popups } = usePopUp();

  return (
    <div className={styles.popupContainer}>
      {popups.map((popup) => (
        <PopUp
          key={popup.id}
          id={popup.id}
          message={popup.message}
          type={popup.type}
        />
      ))}
    </div>
  );
}

export default PopUpContainer;
