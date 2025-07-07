import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchProduct.module.scss";
import useProducts from "../../hooks/useProducts";

const SearchProduct = ({ token }) => {
  const [input, setInput] = useState("");
  const [renderProducts, setRenderProduct] = useState([]);
  const products = useProducts(token);
  const navigate = useNavigate(); // Hook for navigation

  const onChangeHandler = (event) => {
    const searchValue = event.target.value;
    setInput(searchValue);

    const newProduct = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setRenderProduct(newProduct);
  };

  const onProductSelect = (productId) => {
    setInput("");
    setRenderProduct([]);
    navigate(`/product/${productId}`);
  };

  return (
    <div className={styles.searchContainer}>
      <FontAwesomeIcon className={styles.iconSeach} icon={faMagnifyingGlass} />
      <input
        type="text"
        placeholder="Search"
        onChange={onChangeHandler}
        value={input}
      />
      {input && (
        <div className={styles.resultsContainer}>
          {renderProducts.map((product) => (
            <div
              className={styles.nomenclaturaLink}
              key={product.id_bas}
              onClick={() => onProductSelect(product.id_bas)}
            >
              {product.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
