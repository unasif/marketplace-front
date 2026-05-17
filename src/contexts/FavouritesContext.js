import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import favouritesService from "../services/favouritesService";
import { productToFavouriteItem } from "../utils/productToFavouriteItem";
import { fetchProductPrice } from "../utils/fetchProductPrice";

const FavouritesContext = createContext(null);

export const FavouritesProvider = ({ children, token }) => {
  const [items, setItems] = useState([]);

  const refresh = useCallback(() => {
    setItems(favouritesService.getAll());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const handleChange = () => refresh();
    window.addEventListener("favourites:changed", handleChange);
    return () => window.removeEventListener("favourites:changed", handleChange);
  }, [refresh]);

  const isFavourited = useCallback(
    (productId) => favouritesService.isFavourited(productId),
    [items]
  );

  const toggle = useCallback(
    (product) => {
      if (!product?.id_bas) {
        return false;
      }

      const productId = String(product.id_bas);

      if (favouritesService.isFavourited(productId)) {
        favouritesService.remove(productId);
        refresh();
        return false;
      }

      const favouriteItem = productToFavouriteItem(product, 0);
      favouritesService.add(favouriteItem);
      refresh();

      if (token) {
        fetchProductPrice(productId, token).then((price) => {
          if (price > 0 && favouritesService.isFavourited(productId)) {
            favouritesService.updateItem(productId, { price });
            refresh();
          }
        });
      }

      return true;
    },
    [refresh, token]
  );

  const remove = useCallback(
    (productId) => {
      favouritesService.remove(productId);
      refresh();
    },
    [refresh]
  );

  const value = useMemo(
    () => ({
      items,
      toggle,
      remove,
      isFavourited,
      count: items.length,
    }),
    [items, toggle, remove, isFavourited]
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within FavouritesProvider");
  }
  return context;
};
