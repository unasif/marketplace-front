import React from "react";
import { ButtonClose } from "../ButtonClose/ButtonClose";
import close from "../../assets/close.svg";
import noPhotoAvailable from "../../assets/no-photo-available.svg";
import styles from "./ModalImage.module.scss";

const ModalImage = ({ open, onClose, productPhotoInfo }) => {
  const { name } = productPhotoInfo;
  const baseURL = "https://unas.if.ua/api/";
  const imageUrl = productPhotoInfo.photo
    ? `${baseURL}${productPhotoInfo.photo.replace(/\\/g, "/")}`
    : null;

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
