import React, { useState, useEffect } from "react";
import styles from "../ProductsByCategory/ProductsByCategory.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link, useParams } from "react-router-dom";
import ButtonBuy from "../../components/ButtonBuy/ButtonBuy";
import ButtonLike from "../../components/ButtonLike/ButtonLike";
import ProductMainImage from "../../components/ProductMainImage/ProductMainImage";
import ProductPrice from "../../components/ProductPrice/ProductPrice";
import ProductQuantity from "../../components/ProductQuantity/ProductQuantity";
import useProductsByManufacturer from "../../hooks/useProductsByManufacturer";

export const ProductsByManufacturer = ({ token }) => {
  const { manufacturer } = useParams();
  const decodedManufacturer = decodeURIComponent(manufacturer);
  const { products } = useProductsByManufacturer(decodedManufacturer);

  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.categoriesContainer}>
      <Sidebar token={token} />
      <main>
        <div className={styles.mainContainer}>
          <h2 style={{ padding: '30px 0 10px', color: '#001f3d', fontSize: '24px', fontWeight: 700 }}>
            {decodedManufacturer}
          </h2>
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
                  <ProductPrice token={token} idProduct={product.id_bas} />
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

            {products.length === 0 && (
              <p style={{ color: '#708292', padding: '20px' }}>Товари не знайдено</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};