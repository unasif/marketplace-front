import React from "react";
import styles from "./CategoriesSidebar.module.scss";
import SubCategories from "../SubCategories/SubCategories";

const CategoriesSidebar = ({ token }) => {
  return (
    <nav className={styles.linksSidebar}>
      <p>Категорії</p>
      <SubCategories token={token} categoryId={null} />
    </nav>
  );
};

export default CategoriesSidebar;
