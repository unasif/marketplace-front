import React, { useEffect, useState } from "react";
import styles from "./ProductsList.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link, useParams } from "react-router-dom";
import ButtonBuy from "../../components/ButtonBuy/ButtonBuy";
import ButtonLike from "../../components/ButtonLike/ButtonLike";
import ProductMainImage from "../../components/ProductMainImage/ProductMainImage";
import ProductPrice from "../../components/ProductPrice/ProductPrice";
import ProductQuantity from "../../components/ProductQuantity/ProductQuantity";
import { instance } from "../../api";
import useProductsByManufacturer from "../../hooks/useProductsByManufacturer";

export const ProductsList = ({ token }) => {
  const { id, manufacturer } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [title, setTitle] = useState("");

  // For category filtering
  const isCategoryView = !!id;
  const decodedManufacturer = manufacturer ? decodeURIComponent(manufacturer) : null;
  const { products: manufacturerProducts, error: manufacturerError } = useProductsByManufacturer(
    decodedManufacturer
  );

  // Reset state when route params change
  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    setTotalCount(0);
    setTitle("");
  }, [id, manufacturer]);

  // Fetch category products
  useEffect(() => {
    if (!isCategoryView || !token || !id) return;

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
  }, [id, token, isCategoryView]);

  // Update products when manufacturer products change
  useEffect(() => {
    if (isCategoryView) return;

    if (decodedManufacturer && manufacturerProducts) {
      setProducts(manufacturerProducts);
      setTitle(decodedManufacturer);
      setTotalCount(manufacturerProducts.length);
    }
  }, [manufacturerProducts, decodedManufacturer, isCategoryView]);

  const handleLoadMore = () => {
    if (loading || products.length >= totalCount || !isCategoryView) return;

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
      <Sidebar 
        token={token} 
        categoryId={isCategoryView ? Number(id) : undefined}
      />
      <main>
        <div className={styles.mainContainer}>
          {!isCategoryView && title && (
            <h2 style={{ padding: '30px 0 10px', color: '#001f3d', fontSize: '24px', fontWeight: 700 }}>
              {title}
            </h2>
          )}

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

            {products.length === 0 && !loading && (
              <p style={{ color: '#708292', padding: '20px' }}>
                {isCategoryView 
                  ? "Товари не знайдено" 
                  : `Товари не знайдено для виробника: <b>${title}</b>`}
              </p>
            )}
          </div>

          {isCategoryView && products.length < totalCount && (
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
