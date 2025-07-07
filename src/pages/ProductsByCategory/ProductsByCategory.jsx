import React, { useEffect, useState } from "react";
import styles from "./ProductsByCategory.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import ButtonBuy from "../../components/ButtonBuy/ButtonBuy";
import ButtonLike from "../../components/ButtonLike/ButtonLike";
import { useParams } from "react-router-dom";
import ProductMainImage from "../../components/ProductMainImage/ProductMainImage";
import ProductPrice from "../../components/ProductPrice/ProductPrice";
import ProductQuantity from "../../components/ProductQuantity/ProductQuantity";
import { instance } from "../../api";

export const ProductsByCategory = ({ token }) => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    // Очищуємо `products` і встановлюємо `currentPage` у 1, а також `fetching` в `true` при зміні категорії
    setProducts([]);
    setCurrentPage(1);
    setFetching(true);
  }, [id]);

  useEffect(() => {
    if (fetching && token && id) {
      instance
        .get(`product/by_categories_id/?categories_id=${id}`, {
          headers: {
            Authorization: token,
          },
          params: {
            page: currentPage,
            limit: 8,
          },
        })
        .then((response) => {
          setProducts((prevProducts) => [
            ...prevProducts,
            ...response.data.rows,
          ]);
          setCurrentPage((prevState) => prevState + 1);
          setTotalCount(response.data.count);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching, token, id, currentPage]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      products.length < totalCount
    ) {
      setFetching(true);
    }
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.categoriesContainer}>
      <Sidebar token={token} categoryId={Number(id)} />
      <main>
        <div className={styles.mainContainer}>
          <div className={styles.productContainer}>
            {products.map((product) => (
              <div key={product.id_bas} className={styles.productCardWrapper}>
                <Link
                  to={`/product/${product.id_bas}`}
                  className={styles.productLink}
                >
                  <div className={styles.productCard}>
                    <div className={styles.picturesCard}>
                      <ProductMainImage product={product} />
                    </div>
                    <div className={styles.name}>{product.name}</div>
                    <ProductQuantity token={token} idProduct={product.id_bas} />
                  </div>
                  <ProductPrice
                    token={token}
                    idProduct={product.id_bas}
                    className={styles.priceContainer}
                  />
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
            ))}
               {fetching && (
              <div className={styles.loaderContainer}>
                <div className={styles.loader}></div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
