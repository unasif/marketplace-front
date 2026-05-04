import React, { useState } from "react";
import styles from "./ManufacturerFilter.module.scss";
import useManufacturers from "../../hooks/useManufacturers";

const VISIBLE_COUNT = 5;

const ManufacturerFilter = ({ categoriesId, onFilterChange }) => {
  const { manufacturers, loading } = useManufacturers(categoriesId);
  const [selected, setSelected] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? manufacturers : manufacturers.slice(0, VISIBLE_COUNT);

  const handleChange = (id) => {
    const updated = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];
    setSelected(updated);
    if (onFilterChange) onFilterChange(updated);
  };

  if (loading) return <p className={styles.loading}>Завантаження...</p>;
  if (manufacturers.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Виробник</p>
      <ul className={styles.list}>
        {visible.map((m) => (
          <li key={m.id} className={styles.item}>
            <label className={styles.label}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selected.includes(m.id)}
                onChange={() => handleChange(m.id)}
              />
              <span className={styles.name}>{m.name}</span>
            </label>
          </li>
        ))}
      </ul>
      {manufacturers.length > VISIBLE_COUNT && (
        <button
          className={styles.toggleBtn}
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll
            ? "− Згорнути"
            : `+ Показати ще (${manufacturers.length - VISIBLE_COUNT})`}
        </button>
      )}
    </div>
  );
};

export default ManufacturerFilter;