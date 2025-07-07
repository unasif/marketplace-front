import React from "react";
import styles from "./ProductSlide.module.scss";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ButtonBuy from "../ButtonBuy/ButtonBuy";
import ButtonLike from "../ButtonLike/ButtonLike";
import ProductMainImage from "../../components/ProductMainImage/ProductMainImage";

function ProductSlide({ product }) {
  const { id } = useParams();

  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product.id_bas}`} key={id}>
        <div className={styles.picturesCard}>
          <ProductMainImage product={product} />
        </div>
        <div className={styles.name}>{product.name}</div>
        <p className={styles.notStock}>Немає в наявносі</p>
        <p className={styles.oldPrice}>&nbsp;</p>
        <p className={styles.price}>117.28&nbsp;₴</p>
      </Link>
      <div className={styles.buyLike}>
        <div className={styles.buy}>
          <ButtonBuy product={product} onClick={handleButtonClick} />
        </div>
        <div className={styles.blockLike}>
          <ButtonLike product={product} onClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
}

export default ProductSlide;
