import React from "react";
import noPhotoAvailable from "../../assets/no-photo-available.svg";

const ProductMainImage = ({ product }) => {
  const { main_photo, name } = product;
  const baseURL = "https://unas.if.ua/api/";

  let imageUrl = null;

  if (main_photo) {
    if (main_photo.startsWith("http") || main_photo.startsWith("https")) {
      imageUrl = main_photo;
    } else {
      imageUrl = `${baseURL}${main_photo.replace(/\\/g, "/")}`;
    }
  }

  return (
    <div>
      {main_photo ? (
        <img src={imageUrl} alt={name} />
      ) : (
        <img src={noPhotoAvailable} alt='No pictures' />
      )}
    </div>
  );
};

export default ProductMainImage;