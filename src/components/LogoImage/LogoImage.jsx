import React from "react";
import noPhotoAvailable from "../../assets/no-photo-available.svg";

const LogoImage = ({ logoIm = {}, textColor = "#001f3d" }) => {
  const { logo } = logoIm;
  const baseURL = "https://unas.if.ua/api/";
  const imageUrl = logoIm.logo
    ? `${baseURL}${logoIm.logo.replace(/\\/g, "/")}`
    : null;

  return (
    <a href="/" style={{ textDecoration: 'none' }}>
      {logo ? (
        <img src={imageUrl} alt={"Поки в базі alt немає"} />
      ) : (
        <div 
          style={{
            display: 'flex', 
            alignItems: 'center'
          }}
          >
          <img src={noPhotoAvailable} alt='No pictures' />
          <span style={{ color: textColor, marginLeft: '10px', fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }}>
            Логотип
          </span>
        </div>
      )}
    </a>
  );
};

export default LogoImage;
