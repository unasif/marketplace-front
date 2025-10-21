import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useCategoriesById from "../../hooks/useCategoriesById";
import AccordionArrow from "../../assets/accordionArrow.svg";
import styles from "../CategoriesSidebar/CategoriesSidebar.module.scss";

import FiltersBlock from "./FiltersBlock";

const SubCategories = ({ token, categoryId, level = 0 }) => {
  const categories = useCategoriesById(token, categoryId);
  const [openIds, setOpenIds] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  if (!categories || categories.length === 0) {
    return null;
  }

  const toggleOpen = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    );
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <>
      <ul className={styles.subMenuList} style={{ paddingLeft: level * 16 }}>
        {categories.map((category) => (
          <li key={category.id} className={styles.menuItem}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link
                to={`/category/${category.id}`}
                className={`${styles.link} ${
                  isActive(`/category/${category.id}`) ? styles.active : ""
                }`}
              >
                {category.name}
              </Link>
              <SubCategoriesArrow
                token={token}
                categoryId={category.id}
                open={openIds.includes(category.id)}
                onClick={() => toggleOpen(category.id)}
              />
            </div>
            {openIds.includes(category.id) && (
              <SubCategories
                token={token}
                categoryId={category.id}
                level={level + 1}
              />
            )}
          </li>
        ))}
      </ul>
      <FiltersBlock />
    </>
  );
};

// Окремий компонент для стрілки, який сам визначає наявність підкатегорій
const SubCategoriesArrow = ({ token, categoryId, open, onClick }) => {
  const subcategories = useCategoriesById(token, categoryId);

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
