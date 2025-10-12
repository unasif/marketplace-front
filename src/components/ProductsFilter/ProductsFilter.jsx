import React, { useState } from "react";
import FiltersBlock from "../FiltersBlock/FiltersBlock";

const ProductsFilter = ({ products = [] }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const parse = (v) => {
    if (v === "" || v === null || v === undefined) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  const min = parse(minPrice);
  const max = parse(maxPrice);

  const filteredProducts = products.filter((product) => {
    const price = Number(product.price);
    if (!Number.isFinite(price)) return false;
    if (min !== null && price < min) return false;
    if (max !== null && price > max) return false;
    return true;
  });

  return (
    <div>
      <FiltersBlock
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
      <div>
        {filteredProducts.length === 0 ? (
          <div>Немає товарів за заданими фільтрами</div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} style={{ marginBottom: "8px" }}>
              <span>{product.name}</span> — <span>{product.price} грн</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsFilter;