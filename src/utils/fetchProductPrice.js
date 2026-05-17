import { instance } from "../api";

export const fetchProductPrice = async (idProduct, token) => {
  if (!token || !idProduct) {
    return 0;
  }

  try {
    const response = await instance.get(
      `/products_price/?id_bas_product=${idProduct}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const priceData = response.data?.[0];
    if (!priceData) {
      return 0;
    }

    if (priceData.action_price && priceData.action_price !== 0) {
      return Number(priceData.action_price);
    }

    return Number(priceData.price) || 0;
  } catch {
    return 0;
  }
};

export const fetchProductPrices = async (ids, token) => {
  const uniqueIds = [...new Set(ids.map((id) => String(id)))];
  const entries = await Promise.all(
    uniqueIds.map(async (id) => [id, await fetchProductPrice(id, token)])
  );
  return Object.fromEntries(entries);
};
