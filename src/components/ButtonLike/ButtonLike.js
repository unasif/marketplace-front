import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import styles from "./ButtonLike.module.scss";
import { useFavourites } from "../../contexts/FavouritesContext";

function ButtonLike({ product, onClick }) {
  const { isFavourited, toggle } = useFavourites();

  if (!product?.id_bas) {
    return null;
  }

  const liked = isFavourited(product.id_bas);

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (onClick) {
      onClick(event);
    }
    toggle(product);
  };

  return (
    <button
      type="button"
      className={`${styles.icon} ${liked ? styles.active : ""}`}
      onClick={handleClick}
      aria-label={liked ? "Видалити з обраного" : "Додати в обране"}
      aria-pressed={liked}
    >
      <FontAwesomeIcon icon={liked ? faHeartSolid : faHeartRegular} />
    </button>
  );
}

export default ButtonLike;
