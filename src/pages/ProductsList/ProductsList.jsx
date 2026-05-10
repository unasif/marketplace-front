import React, { useEffect, useState } from "react";
import styles from "./ProductsList.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ButtonBuy from "../../components/ButtonBuy/ButtonBuy";
import ButtonLike from "../../components/ButtonLike/ButtonLike";
import ProductMainImage from "../../components/ProductMainImage/ProductMainImage";
import ProductPrice from "../../components/ProductPrice/ProductPrice";
import ProductQuantity from "../../components/ProductQuantity/ProductQuantity";
import { instance } from "../../api";
import useProductsByManufacturer from "../../hooks/useProductsByManufacturer";

export const ProductsList = ({ token }) => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const manufacturerParam = searchParams.get("manufacturer");
  
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [title, setTitle] = useState("");
  const [filterTitle, setFilterTitle] = useState("");

  // Логіка визначення активних фільтрів
  const hasCategory = !!categoryId;
  const hasManufacturer = !!manufacturerParam;
  const decodedManufacturer = manufacturerParam ? decodeURIComponent(manufacturerParam) : null;
  
  // Отримуємо товари виробника (якщо виробник вибраний)
  const { products: manufacturerProducts } = useProductsByManufacturer(
    hasManufacturer ? decodedManufacturer : null
  );

  // Reset state when filters change
  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    setTotalCount(0);
    setTitle("");
    setFilterTitle("");
  }, [categoryId, manufacturerParam]);

  // Fetch products based on filters
  useEffect(() => {
    if (!token) return;
    
    let titleParts = [];
    if (hasCategory) titleParts.push(`Категорія`);
    if (hasManufacturer) titleParts.push(decodedManufacturer);
    setFilterTitle(titleParts.join(" • "));

    // Якщо обидва фільтри активні - комбінуємо результати
    if (hasCategory && hasManufacturer) {
      setLoading(true);
      instance
        .get(`product/by_categories_id/?categories_id=${categoryId}`, {
          headers: { Authorization: token },
          params: { page: 1, limit: 100 },
        })
        .then((response) => {
          const categoryProducts = response.data.rows || [];
          // Фільтруємо товари категорії за виробником
          const filtered = categoryProducts.filter(
            (p) => p.manufacturer && p.manufacturer.toLowerCase() === decodedManufacturer.toLowerCase()
          );
          setProducts(filtered);
          setTotalCount(filtered.length);
          setCurrentPage(2);
        })
        .finally(() => setLoading(false));
    }
    // Тільки категорія
    else if (hasCategory) {
      setLoading(true);
      instance
        .get(`product/by_categories_id/?categories_id=${categoryId}`, {
          headers: { Authorization: token },
          params: { page: 1, limit: 8 },
        })
        .then((response) => {
          setProducts(response.data.rows);
          setCurrentPage(2);
          setTotalCount(response.data.count);
        })
        .finally(() => setLoading(false));
    }
    // Тільки виробник
    else if (hasManufacturer && manufacturerProducts) {
      setProducts(manufacturerProducts);
      setTotalCount(manufacturerProducts.length);
    }
  }, [categoryId, manufacturerParam, token, hasCategory, hasManufacturer, decodedManufacturer, manufacturerProducts]);

  const handleLoadMore = () => {
    if (loading || products.length >= totalCount || !hasCategory) return;

    setLoading(true);
    instance
      .get(`product/by_categories_id/?categories_id=${categoryId}`, {
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
        categoryId={hasCategory ? Number(categoryId) : undefined}
      />
      <main>
        <div className={styles.mainContainer}>
          {filterTitle && (
            <h2 style={{ padding: '30px 0 10px', color: '#001f3d', fontSize: '24px', fontWeight: 700 }}>
              {filterTitle}
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
                {hasCategory && hasManufacturer
                  ? `Товари не знайдено для цієї категорії та виробника`
                  : hasCategory
                  ? "Товари не знайдено"
                  : `Товари не знайдено для виробника: ${decodedManufacturer}`}
              </p>
            )}
          </div>

          {hasCategory && !hasManufacturer && products.length < totalCount && (
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
