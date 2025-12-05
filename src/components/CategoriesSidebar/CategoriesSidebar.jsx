import React from "react";
import AccordionArrow from "../../assets/accordionArrow.svg";
import SubCategories from "../SubCategories/SubCategories";
import styles from "./CategoriesSidebar.module.scss";
import useCategoriesById from "../../hooks/useCategoriesById";
import { useCategoryContext } from "../../contexts/CategoryContext";

const CategoriesSidebar = () => {
  const categories = useCategoriesById(null);
  const { openId, updateOpenId } = useCategoryContext();

  return (
    <nav className={styles.linksSidebar}>
      <p>Категорії</p>
      <ul>
        {categories.map((category) => (
          <li className={styles.menuItem} key={category.id}>
            <button
              className={styles.menuHeader}
              onClick={() => updateOpenId(category.id)}
            >
              {category.name}
              <img
                src={AccordionArrow}
                alt="Accordion Arrow"
                className={
                  category.id === openId
                    ? `${styles.accordionArrow} ${styles.active}`
                    : styles.accordionArrow
                }
              />
            </button>
            <div
              className={
                category.id === openId ? styles.subMenuOpen : styles.subMenu
              }
            >
              <SubCategories
                className={styles.subMenuList}
                categoryId={category.id}
              />
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoriesSidebar;