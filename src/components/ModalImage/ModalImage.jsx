import React from "react";
import { ButtonClose } from "../ButtonClose/ButtonClose";
import close from "../../assets/close.svg";
import noPhotoAvailable from "../../assets/no-photo-available.svg";
import styles from "./ModalImage.module.scss";

const ModalImage = ({ open, onClose, productPhotoInfo }) => {
  const { name, photo } = productPhotoInfo;
  const baseURL = "https://unas.if.ua/marketdemo/api/";

  let imageUrl = null;

  if (photo) {
    if (photo.startsWith("http") || photo.startsWith("https")) {
      imageUrl = photo;
    } else {
      imageUrl = `${baseURL}${photo.replace(/\\/g, "/")}`;
    }
  }

  if (!open) return null;

  return (
    <div className={styles.modalWindows} onClick={onClose}>
      <div className={styles.modalBox}>
        <div className={styles.modalContent}>
          <ButtonClose onClickProp={onClose} className={styles.closeIcon}>
            <img src={close} alt="close" />
          </ButtonClose>
          <div>
            {imageUrl ? (
              <img src={imageUrl} alt={name} />
            ) : (
              <img src={noPhotoAvailable} alt="No pictures" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalImage;