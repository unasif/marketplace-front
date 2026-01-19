import React from "react";
import styles from "./LogoImage.module.scss";
import noPhotoAvailable from "../../assets/no-photo-available.svg";

const LogoImage = ({ logoIm = {}, textColor = "#001f3d" }) => {
  const { logo } = logoIm;
  const baseURL = "https://unas.if.ua/api/";
  const imageUrl = logoIm.logo
    ? `${baseURL}${logoIm.logo.replace(/\\/g, "/")}`
    : null;

  return (
    <a 
      href="/" 
      className={styles.logoLink}
      style={{ "--logo-text-color": textColor }}
    >
      {logo ? (
        <img 
          src={imageUrl} 
          className={styles.logoImage} 
          alt="Логотип компанії" 
        />
      ) : (
        <div className={styles.logoPlaceholder}>
          <img src={noPhotoAvailable} alt="Немає фото" />
          <span className={styles.logoText}>
            Логотип
          </span>
        </div>
      )}
    </a>
  );
};

export default LogoImage;
