import { imageUrlToMainPhoto } from "./cartProduct";

export const favouriteItemToProduct = (item) => ({
  id_bas: String(item.id),
  id: String(item.id),
  name: item.title,
  main_photo: item.mainPhoto || imageUrlToMainPhoto(item.imageUrl) || "",
  categories_id: item.category,
});
