export const getCartProductId = (product) =>
  String(product?.id_bas ?? product?.id ?? "");

export const imageUrlToMainPhoto = (imageUrl) => {
  if (!imageUrl) {
    return "";
  }

  const apiBases = ["/testdevelopment/api/", "/marketdemo/api/", "/api/"];

  for (const base of apiBases) {
    if (imageUrl.startsWith(base)) {
      return imageUrl.slice(base.length);
    }
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    for (const base of apiBases) {
      const index = imageUrl.indexOf(base);
      if (index !== -1) {
        return imageUrl.slice(index + base.length);
      }
    }
  }

  return imageUrl;
};

export const normalizeCartProduct = (product) => {
  const id = getCartProductId(product);
  const main_photo =
    product.main_photo ||
    product.mainPhoto ||
    imageUrlToMainPhoto(product.imageUrl) ||
    "";

  return {
    ...product,
    id,
    id_bas: id,
    name: product.name || product.title || "",
    main_photo,
  };
};
