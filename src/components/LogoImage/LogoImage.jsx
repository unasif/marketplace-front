import React from "react";
import noPhotoAvailable from "../../assets/no-photo-available.svg";

const LogoImage = ({ logoim = {} }) => { 
  const { logo } = logoim;
  const baseURL = "https://unas.if.ua/api/";
  const imageUrl = logoim.logo
    ? `${baseURL}${logoim.logo.replace(/\\/g, "/")}`
    : null;

  return (
    <a href="/"
       style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
       }}
    >
      {logo ? (
        <img src={imageUrl} alt={"Поки в базі alt немає"} />
      ) : (
        <>
          <img src={noPhotoAvailable} alt='No pictures' />
          <p>Логотип відсутній</p>
        </>
      )}
    </a>
  );
};

export default LogoImage;
