import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./CategoriesSidebar.module.scss";
import SubCategories from "../SubCategories/SubCategories";

const CategoriesSidebar = ({ token, categories = [] }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <nav className={styles.linksSidebar}>
      <p>Категорії</p>
      <SubCategories token={token} categoryId={null} />
      <div className={styles.sidebar}>
        {categories.map((cat) => {
          const path = `/category/${cat.id}`;
          return (
            <Link
              key={cat.id}
              to={path}
              className={`${styles.link} ${
                isActive(path) ? styles.active : ""
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoriesSidebar;
