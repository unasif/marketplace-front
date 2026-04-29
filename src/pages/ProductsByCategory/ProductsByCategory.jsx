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
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    setTotalCount(0);
  }, [id]);

  useEffect(() => {
    if (!token || !id) return;
    setLoading(true);
    instance
      .get(`product/by_categories_id/?categories_id=${id}`, {
        headers: { Authorization: token },
        params: { page: 1, limit: 8 },
      })
      .then((response) => {
        setProducts(response.data.rows);
        setCurrentPage(2);
        setTotalCount(response.data.count);
      })
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleLoadMore = () => {
    if (loading || products.length >= totalCount) return;
    setLoading(true);
    instance
      .get(`product/by_categories_id/?categories_id=${id}`, {
        headers: { Authorization: token },
        params: { page: currentPage, limit: 8 },
      })
      .then((response) => {
        setProducts((prev) => [...prev, ...response.data.rows]);
        setCurrentPage((prev) => prev + 1);
      })
      .finally(() => setLoading(false));
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
                <Link to={`/product/${product.id_bas}`} className={styles.productLink}>
                  <div className={styles.productCard}>
                    <div className={styles.picturesCard}>
                      <ProductMainImage product={product} />
                    </div>
                    <div className={styles.name}>{product.name}</div>
                    <ProductQuantity token={token} idProduct={product.id_bas} />
                  </div>
                  <ProductPrice token={token} idProduct={product.id_bas} className={styles.priceContainer} />
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
          </div>

          {products.length < totalCount && (
            <div className={styles.loadMoreContainer}>
              <button
                className={styles.loadMoreButton}
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? "Завантаження..." : "Показати ще"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};