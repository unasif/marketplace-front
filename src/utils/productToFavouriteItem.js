import { resolveProductImageUrl } from "./resolveProductImageUrl";

export const productToFavouriteItem = (product, price = 0) => ({
  id: String(product.id_bas),
  slug: String(product.id_bas),
  title: product.name || "",
  price: Number(price) || 0,
  currency: "UAH",
  mainPhoto: product.main_photo || "",
  imageUrl: resolveProductImageUrl(product.main_photo),
  category: String(product.categories_id || ""),
  savedAt: new Date().toISOString(),
});
