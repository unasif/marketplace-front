import React from "react";
import styles from "./LogoImage.module.scss";
import noPhotoAvailable from "../../assets/no-photo-available.svg";

const LogoImage = ({ logoIm = {}, textColor = "#001f3d" }) => {
  const { logo } = logoIm;
  const baseURL = "https://unas.if.ua/marketdemo";
  let imageUrl = null;

  // Debug logs to trace logo source and computed URL
  console.log("[LogoImage] props.logoIm:", logoIm);
  console.log("[LogoImage] logo:", logo);
  console.log("[LogoImage] baseURL:", baseURL);

  if (logo) {
    if (logo.startsWith("http") || logo.startsWith("https")) {
      imageUrl = logo;
    } else {
      imageUrl = `${baseURL}${logo.replace(/\\/g, "/")}`;
    }
  }

  console.log("[LogoImage] computed imageUrl:", imageUrl);

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
