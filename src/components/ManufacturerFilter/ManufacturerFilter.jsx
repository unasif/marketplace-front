import React, { useState } from "react";
import useManufacturers from "../../hooks/useManufacturers";
import styles from "./ManufacturerFilter.module.scss";

const ManufacturerFilter = ({ selectedManufacturers = [], onChange }) => {
  const manufacturers = useManufacturers();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = (id) => {
    if (!onChange) return;
    const updated = selectedManufacturers.includes(id)
      ? selectedManufacturers.filter((m) => m !== id)
      : [...selectedManufacturers, id];
    onChange(updated);
  };

  if (!manufacturers || manufacturers.length === 0) return null;

  return (
    <div className={styles.filterBlock}>
      <button
        className={styles.filterHeader}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <span>Виробник</span>
        <span className={`${styles.arrow} ${isExpanded ? styles.arrowOpen : ""}`}>
          &#x276F;
        </span>
      </button>

      {isExpanded && (
        <ul className={styles.manufacturerList}>
          {manufacturers.map((manufacturer) => {
            const id = manufacturer.id ?? manufacturer.id_bas ?? manufacturer.name;
            const name = manufacturer.name;
            const checked = selectedManufacturers.includes(id);

            return (
              <li key={id} className={styles.manufacturerItem}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={checked}
                    onChange={() => handleToggle(id)}
                  />
                  <span className={styles.customCheckbox} />
                  <span className={styles.manufacturerName}>{name}</span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ManufacturerFilter;