import React, { useState } from "react";
import AccordionArrow from "../../assets/accordionArrow.svg";
import styles from "./CategoriesSidebar.module.scss";
import useCategoriesTree from "../../hooks/useCategoriesTree";

function CategoryItem({ category, openIds, toggleOpen }) {
  const hasChildren = category.children && category.children.length > 0;
  const isOpen = openIds.includes(category.id_bas);

  return (
    <li className={styles.menuItem} key={category.id_bas}>
      <div className={styles.menuHeader}>
        <span>{category.name}</span>
        {hasChildren && (
          <button
            className={styles.accordionBtn}
            onClick={() => toggleOpen(category.id_bas)}
            aria-label="Розгорнути"
          >
            <img
              src={AccordionArrow}
              alt="Accordion Arrow"
              className={
                isOpen
                  ? `${styles.accordionArrow} ${styles.active}`
                  : styles.accordionArrow
              }
            />
          </button>
        )}
      </div>
      {hasChildren && isOpen && (
        <ul className={styles.subMenuList}>
          {category.children.map((child) => (
            <CategoryItem
              key={child.id_bas}
              category={child}
              openIds={openIds}
              toggleOpen={toggleOpen}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

const CategoriesSidebar = ({ token }) => {
  const categories = useCategoriesTree(token);
  const [openIds, setOpenIds] = useState([]);

  const toggleOpen = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <nav className={styles.linksSidebar}>
      <p>Категорії</p>
      <ul>
        {categories.map((category) => (
          <CategoryItem
            key={category.id_bas}
            category={category}
            openIds={openIds}
            toggleOpen={toggleOpen}
          />
        ))}
      </ul>
    </nav>
  );
};

export default CategoriesSidebar;
