import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Favourites.module.scss";
import { useFavourites } from "../../contexts/FavouritesContext";
import { fetchProductPrices } from "../../utils/fetchProductPrice";
import { instance } from "../../api";
import noPhotoAvailable from "../../assets/no-photo-available.svg";

const NUDGE_DISMISS_KEY = "favourites_signup_nudge_dismissed";
const NUDGE_MIN_ITEMS = 3;
const STALE_PRICE_THRESHOLD = 0.05;

const SORT_OPTIONS = {
  newest: "newest",
  priceAsc: "price-asc",
  priceDesc: "price-desc",
};

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

export const Favourites = ({ token }) => {
  const { items, remove, count } = useFavourites();
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.newest);
  const [livePrices, setLivePrices] = useState({});
  const [availability, setAvailability] = useState({});
  const [showNudge, setShowNudge] = useState(false);

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

  useEffect(() => {
    if (count < NUDGE_MIN_ITEMS) {
      setShowNudge(false);
      return;
    }

    const dismissed = sessionStorage.getItem(NUDGE_DISMISS_KEY) === "1";
    setShowNudge(!dismissed);
  }, [count]);

  const sortedItems = useMemo(() => {
    const nextItems = [...items];

    if (sortBy === SORT_OPTIONS.priceAsc) {
      return nextItems.sort(
        (a, b) =>
          (livePrices[a.id] ?? a.price) - (livePrices[b.id] ?? b.price)
      );
    }

    if (sortBy === SORT_OPTIONS.priceDesc) {
      return nextItems.sort(
        (a, b) =>
          (livePrices[b.id] ?? b.price) - (livePrices[a.id] ?? a.price)
      );
    }

    return nextItems.sort(
      (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
    );
  }, [items, sortBy, livePrices]);

  const dismissNudge = () => {
    sessionStorage.setItem(NUDGE_DISMISS_KEY, "1");
    setShowNudge(false);
  };

  if (count === 0) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.emptyState}>
          <FontAwesomeIcon icon={faHeart} className={styles.emptyIcon} />
          <h1 className={styles.emptyTitle}>Поки що немає обраного</h1>
          <p className={styles.emptyText}>
            Додавайте товари в обране натисканням на сердечко — вони зʼявляться
            тут, і ви зможете повернутися до них у будь-який час.
          </p>
          <Link to="/" className={styles.ctaButton}>
            Перейти до покупок
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Моє обране</h1>
        <span className={styles.countBadge}>{count}</span>
      </div>

      {showNudge && (
        <div className={styles.nudge} role="status">
          <p className={styles.nudgeText}>
            Зберігайте обране на всіх пристроях. Створіть безкоштовний
            обліковий запис.
          </p>
          <button
            type="button"
            className={styles.nudgeDismiss}
            onClick={dismissNudge}
            aria-label="Закрити підказку"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      )}

      <div className={styles.toolbar}>
        <label>
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Сортування"
          >
            <option value={SORT_OPTIONS.newest}>Спочатку нові</option>
            <option value={SORT_OPTIONS.priceAsc}>Ціна: від низької</option>
            <option value={SORT_OPTIONS.priceDesc}>Ціна: від високої</option>
          </select>
        </label>
      </div>

      <div className={styles.productContainer}>
        {sortedItems.map((item) => {
          const livePrice = livePrices[item.id];
          const displayPrice =
            livePrice && livePrice > 0 ? livePrice : item.price;
          const stale = isPriceStale(item.price, livePrice);
          const isAvailable = availability[item.id] !== false;

          return (
            <article
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
                </div>
              )}

              <div className={styles.priceRow}>
                <div className={styles.price}>
                  {displayPrice > 0 ? `${displayPrice} ₴` : "Ціну уточнюйте"}
                </div>
                {stale && item.price > 0 && (
                  <>
                    <span className={styles.savedPrice}>{item.price} ₴</span>
                    <span className={styles.staleBadge}>Ціна змінилась</span>
                  </>
                )}
              </div>

              <div className={styles.cardActions}>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => remove(item.id)}
                  aria-label={`Видалити ${item.title} з обраного`}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
