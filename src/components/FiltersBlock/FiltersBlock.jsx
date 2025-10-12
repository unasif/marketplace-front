import React from "react";

const FiltersBlock = ({ minPrice, setMinPrice, maxPrice, setMaxPrice }) => (
  <div style={{
    display: "flex",
    gap: "12px",
    margin: "16px 0",
    padding: "12px",
    border: "1px solid #eee",
    borderRadius: "8px",
    background: "#fafafa"
  }}>
    <input
      type="number"
      placeholder="Мінімальна ціна"
      value={minPrice}
      onChange={e => setMinPrice(e.target.value)}
      style={{ flex: 1 }}
      min={0}
    />
    <input
      type="number"
      placeholder="Максимальна ціна"
      value={maxPrice}
      onChange={e => setMaxPrice(e.target.value)}
      style={{ flex: 1 }}
      min={0}
    />
  </div>
);

export default FiltersBlock;