import React from "react";
import styles from "./CategoriesSidebar.module.scss";
import SubCategories from "../SubCategories/SubCategories";
import useCategories from "../../hooks/useCategories";

const CategoriesSidebar = () => {
  const categories = useCategories();

  return (
    <nav className={styles.linksSidebar}>
      <p>Категорії</p>
      {/* НЕ передаємо categoryId для кореневих категорій */}
      <SubCategories categories={categories} level={0} />
    </nav>
  );
};

export default CategoriesSidebar;
