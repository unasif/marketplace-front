import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Favourites.module.scss";
import { useFavourites } from "../../contexts/FavouritesContext";
import { fetchProductPrices } from "../../utils/fetchProductPrice";
import { instance } from "../../api";
import ButtonBuy from "../../components/ButtonBuy/ButtonBuy";
import ButtonLike from "../../components/ButtonLike/ButtonLike";
import ProductPrice from "../../components/ProductPrice/ProductPrice";
import noPhotoAvailable from "../../assets/no-photo-available.svg";

const STALE_PRICE_THRESHOLD = 0.05;

const isPriceStale = (savedPrice, livePrice) => {
  if (!savedPrice || !livePrice || savedPrice <= 0) {
    return false;
  }

  const difference = Math.abs(livePrice - savedPrice) / savedPrice;
  return difference > STALE_PRICE_THRESHOLD;
};

const checkProductAvailability = async (productId, token) => {
  if (!token) {
    return true;
  }

  try {
    await instance.get(`product/by_id_bas/?id_bas=${productId}`, {
      headers: {
        Authorization: token,
      },
    });
    return true;
  } catch {
    return false;
  }
};

const favouriteItemToProduct = (item) => ({
  id_bas: item.id,
  id: item.id,
  name: item.title,
  main_photo: item.imageUrl,
  categories_id: item.category,
});

export const Favourites = ({ token }) => {
  const { items, count } = useFavourites();
  const [livePrices, setLivePrices] = useState({});
  const [availability, setAvailability] = useState({});

  const displayItems = [...items].sort(
    (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
  );

  useEffect(() => {
    if (items.length === 0) {
      setLivePrices({});
      setAvailability({});
      return;
    }

    let cancelled = false;

    const loadMeta = async () => {
      const ids = items.map((item) => item.id);
      const [prices, availabilityEntries] = await Promise.all([
        fetchProductPrices(ids, token),
        Promise.all(
          ids.map(async (id) => [id, await checkProductAvailability(id, token)])
        ),
      ]);

      if (cancelled) {
        return;
      }

      setLivePrices(prices);
      setAvailability(Object.fromEntries(availabilityEntries));
    };

    loadMeta();

    return () => {
      cancelled = true;
    };
  }, [items, token]);

  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  if (count === 0) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
          <h3>Обране</h3>
          <p>Ще не додано жодного товару до обраного.</p>
          <Link to="/" className={styles.ctaButton}>
            Перейти до покупок
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.productContainer}>
        {displayItems.map((item) => {
          const product = favouriteItemToProduct(item);
          const livePrice = livePrices[item.id];
          const stale = isPriceStale(item.price, livePrice);
          const isAvailable = availability[item.id] !== false;

          return (
            <div
              key={item.id}
              className={`${styles.productCardWrapper} ${
                !isAvailable ? styles.unavailable : ""
              }`}
            >
              {!isAvailable && (
                <span className={styles.unavailableBadge}>
                  Товар більше недоступний
                </span>
              )}

              {isAvailable ? (
                <Link
                  to={`/product/${item.slug}`}
                  className={styles.productLink}
                >
                  <div className={styles.productCard}>
                    <div className={styles.picturesCard}>
                      <img
                        src={item.imageUrl || noPhotoAvailable}
                        alt={item.title}
                      />
                    </div>
                    <div className={styles.name}>{item.title}</div>
                  </div>
                  <div className={styles.priceContainer}>
                    <ProductPrice token={token} idProduct={item.id} />
                  </div>
                  {stale && item.price > 0 && (
                    <div className={styles.stalePriceHint}>
                      <span className={styles.staleBadge}>Ціна змінилась</span>
                    </div>
                  )}
                </Link>
              ) : (
                <div className={styles.productLink}>
                  <div className={styles.productCard}>
                    <div className={styles.picturesCard}>
                      <img
                        src={item.imageUrl || noPhotoAvailable}
                        alt={item.title}
                      />
                    </div>
                    <div className={styles.name}>{item.title}</div>
                  </div>
                  <div className={styles.priceContainer}>
                    {item.price > 0 ? `${item.price} ₴` : "Ціну уточнюйте"}
                  </div>
                </div>
              )}

              <div className={styles.buyLike}>
                {isAvailable && (
                  <div className={styles.buy}>
                    <ButtonBuy product={product} />
                  </div>
                )}
                <div className={styles.blockLike}>
                  <ButtonLike
                    product={product}
                    onClick={handleButtonClick}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
