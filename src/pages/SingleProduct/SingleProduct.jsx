import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { useParams } from "react-router-dom";
import { instance } from "../../api";
import styles from "./SingleProduct.module.scss";
import ProductMainImage from "../../components/ProductMainImage/ProductMainImage";
import ProductImages from "../../components/ProductImages/ProductImages";
import ButtonBuy from "../../components/ButtonBuy/ButtonBuy";
import ButtonLike from "../../components/ButtonLike/ButtonLike";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import ProductPrice from "../../components/ProductPrice/ProductPrice";
import ProductQuantity from "../../components/ProductQuantity/ProductQuantity";
import useProductsByCategory from "../../hooks/useProductsByCategory";

export const SingleProduct = ({ token }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const ProductsByCategory = useProductsByCategory(
    token,
    product.categories_id
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await instance.get(`product/by_id_bas/?id_bas=${id}`, {
          headers: {
            Authorization: token,
          },
        });
        setProduct(response.data);
      } catch (error) {
        console.error("Помилка отримання відомостей товару:", error);
      }
    };

    if (token && id) {
      fetchProduct();
    }
  }, [token, id]);

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await instance.get(
          `products_photos/?id_bas_product=${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setPhotos(response.data);
      } catch (error) {
        console.error("Помилка отримання фото товару:", error);
      }
    };

    if (token && id) {
      fetchPhoto();
    }
  }, [token, id]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.category}>
          <BreadCrumbs token={token} categoryId={product.categories_id} />
          {product.name && (
            <span className={styles.productName}>
              &nbsp;&#62;&nbsp;{product.name}
            </span>
          )}
        </div>
        <div className={styles.productDescription}>
          <div className={styles.smallPhoto}>
            {photos.length > 5 ? (
              <div className={styles.scrollablePhotos}>
                {photos.map((productPhotoInfo, index) => (
                  <div key={index} className={styles.containerPhoto}>
                    <ProductImages productPhotoInfo={productPhotoInfo} />
                  </div>
                ))}
              </div>
            ) : (
              photos.map((productPhotoInfo, index) => (
                <div key={index} className={styles.containerPhoto}>
                  <ProductImages productPhotoInfo={productPhotoInfo} />
                </div>
              ))
            )}
          </div>
          <div className={styles.mainPhoto}>
            <ProductMainImage product={product} />
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.titleProduct}>
              <h3>{product.name}</h3>
              <div className={styles.containerLike}>
                <div className={styles.blockLike}>
                  <ButtonLike />
                </div>
              </div>
            </div>
            <div className={styles.textCode}>Код: 2-100112 nw</div>
            {/* <p className={styles.mainText}>
              Існує багато варіацій уривків з Lorem Ipsum, але більшість з них
              зазнала певних змін на кшталт жартівливих вставок або змішування
              слів, які навіть не виглядають правдоподібно. Якщо ви збираєтесь
              використовувати Lorem Ipsum, ви маєте упевнитись в тому, що
              всередині тексту не приховано нічого, що могло б викликати у
              читача конфуз. Більшість відомих генераторів Lorem Ipsum в Мережі
              генерують текст шляхом повторення наперед заданих послідовностей
              Lorem Ipsum. Принципова відмінність цього генератора робить його
              першим справжнім генератором Lorem Ipsum.
            </p> */}
            <p className={styles.mainText}>{product.description}</p>
            <ProductQuantity token={token} idProduct={product.id_bas} />
            <ProductPrice token={token} idProduct={id} />
            <div className={styles.buy}>
              <ButtonBuy product={product} />
            </div>
          </div>
        </div>
      </div>
      {ProductsByCategory.length > 5 && (
        <div className={styles.containerSlider}>
          <h4>Тебе може зацікавити</h4>
          <SliderComponent
            className={styles.sliderBox}
            token={token}
            idCategories={product.categories_id}
            idProduct={id}
          />
        </div>
      )}
    </div>
  );
};
