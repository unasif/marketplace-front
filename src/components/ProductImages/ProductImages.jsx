import React, { useState } from "react";
import noPhotoAvailable from "../../assets/no-photo-available.svg";
import ModalImage from "../../components/ModalImage/ModalImage";

const ProductImages = ({ productPhotoInfo }) => {
  const { photo, name } = productPhotoInfo;
  const baseURL = "https://unas.if.ua/api/";

  let imageUrl = null;

  if (photo) {
    if (photo.startsWith("http") || photo.startsWith("https")) {
      imageUrl = photo;
    } else {
      imageUrl = `${baseURL}${photo.replace(/\\/g, "/")}`;
    }
  }

  const [open, setOpen] = useState(false);

  const handleCartClick = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const closeModalImage = () => {
    setOpen(false);
  };

  return (
    <div>
      {photo ? (
        <img src={imageUrl} alt={name} onClick={handleCartClick} />
      ) : (
        <img src={noPhotoAvailable} alt="No pictures" />
      )}
      <ModalImage
        open={open}
        onClose={closeModalImage}
        productPhotoInfo={productPhotoInfo}
      />
    </div>
  );
};

export default ProductImages;