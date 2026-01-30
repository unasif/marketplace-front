import React from "react";
import styles from "./LogoImage.module.scss";
import noPhotoAvailable from "../../assets/no-photo-available.svg";

const LogoImage = ({ logoIm = {}, textColor = "#001f3d" }) => {
  // Accept either an object { logo: 'path' } or a string path
  const logoVal = typeof logoIm === 'string' ? logoIm : logoIm?.logo;
  const baseURL = "https://unas.if.ua/marketdemo/api/";
  let imageUrl = null;

  // Debug logs to trace logo source and computed URL
  console.log("[LogoImage] props.logoIm:", logoIm);
  console.log("[LogoImage] logoVal:", logoVal);
  console.log("[LogoImage] baseURL:", baseURL);

  if (logoVal) {
    if (logoVal.startsWith("http") || logoVal.startsWith("https")) {
      imageUrl = logoVal;
    } else {
      imageUrl = `${baseURL}${logoVal.replace(/\\/g, "/")}`;
    }
  }

  console.log("[LogoImage] computed imageUrl:", imageUrl);

  return (
    <a 
      href="/" 
      className={styles.logoLink}
      style={{ "--logo-text-color": textColor }}
    >
      {imageUrl ? (
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
