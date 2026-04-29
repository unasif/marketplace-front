import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import ButtonBuy from "../../components/ButtonBuy/ButtonBuy";
import ButtonLike from "../../components/ButtonLike/ButtonLike";
import { instance } from "../../api";
import ProductMainImage from "../../components/ProductMainImage/ProductMainImage";
import ProductPrice from "../../components/ProductPrice/ProductPrice";
import ProductQuantity from "../../components/ProductQuantity/ProductQuantity";
import CategoriesModal from "../../components/CategoriesModal/CategoriesModal";

export const Home = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  useEffect(() => {
    if (initialLoad && token) {
      setLoading(true);
      instance
        .get(`/product/`, {
          headers: { Authorization: token },
          params: { page: currentPage, limit: 8 },
        })
        .then((response) => {
          setProducts(response.data.rows);
          setCurrentPage(2);
          setTotalCount(response.data.count);
        })
        .finally(() => {
          setLoading(false);
          setInitialLoad(false);
        });
    }
  }, [initialLoad, token]);

  const handleLoadMore = () => {
    if (loading || products.length >= totalCount) return;
    setLoading(true);
    instance
      .get(`/product/`, {
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
    <div className={styles.homeContainer}>
      <Sidebar token={token} onOpenCatalog={() => setIsCatalogOpen(true)} />
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

      <CategoriesModal isOpen={isCatalogOpen} onClose={() => setIsCatalogOpen(false)} />
    </div>
  );
};