import React from "react";
import styles from "./LogoImage.module.scss";
import { Link } from "react-router-dom";
import noPhotoAvailable from "../../assets/no-photo-available.svg";

const LogoImage = ({ logoIm = {}, textColor = "#001f3d" }) => {
  const { logo } = logoIm;
  const baseURL = "https://unas.if.ua/marketdemo/api/";
  
  let imageUrl = null;

  if (logo) {
    if (logo.startsWith("http") || logo.startsWith("https")) {
      imageUrl = logo;
    } else {
      imageUrl = `${baseURL}${logo.replace(/\\/g, "/")}`;
    }
  }

  return (
    <Link 
      to="/"
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
    </Link>
  );
};

export default LogoImage;
