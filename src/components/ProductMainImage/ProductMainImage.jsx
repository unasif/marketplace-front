import React from "react";
import noPhotoAvailable from "../../assets/no-photo-available.svg";

const ProductMainImage = ({ product }) => {
  const { main_photo, name } = product;
  const baseURL = "https://unas.if.ua/api/";
  const imageUrl = product.main_photo
    ? `${baseURL}${product.main_photo.replace(/\\/g, "/")}`
    : null;

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
