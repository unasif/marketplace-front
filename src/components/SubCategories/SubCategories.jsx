import React, { useState } from "react";
import { Link } from "react-router-dom";
import useCategoriesById from "../../hooks/useCategoriesById";
import AccordionArrow from "../../assets/accordionArrow.svg";
import styles from "../CategoriesSidebar/CategoriesSidebar.module.scss";

const SubCategories = ({ categories: propCategories, categoryId, level = 0 }) => {
  // Викликаємо хук тільки для підкатегорій (коли categoryId існує)
  const fetchedCategories = useCategoriesById(categoryId);
  
  // Якщо є propCategories - використовуємо їх, інакше fetchedCategories
  const categories = propCategories && propCategories.length > 0 
    ? propCategories 
    : fetchedCategories;
  
  const [openIds, setOpenIds] = useState([]);

  if (!categories || categories.length === 0) {
    return null;
  }

  const toggleOpen = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    );
  };

  return (
    <ul className={styles.subMenuList} style={{ paddingLeft: level * 16 }}>
      {categories.map((category) => (
        <li key={category.id} className={styles.menuItem}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
            <SubCategoriesArrow
              categoryId={category.id}
              open={openIds.includes(category.id)}
              onClick={() => toggleOpen(category.id)}
            />
          </div>
          {openIds.includes(category.id) && (
            <SubCategories
              categoryId={category.id}
              level={level + 1}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

const SubCategoriesArrow = ({ categoryId, open, onClick }) => {
  const subcategories = useCategoriesById(categoryId);

  if (!subcategories || subcategories.length === 0) return null;

  return (
    <button
      className={styles.menuHeader}
      onClick={onClick}
      style={{ marginLeft: 8 }}
    >
      <img
        src={AccordionArrow}
        alt="Accordion Arrow"
        className={
          open
            ? `${styles.accordionArrow} ${styles.active}`
            : styles.accordionArrow
        }
      />
    </button>
  );
};

export default SubCategories;
