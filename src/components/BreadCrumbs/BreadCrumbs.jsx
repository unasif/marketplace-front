import React from "react";
import styles from "./BreadCrumbs.module.scss";
import { Link } from "react-router-dom";
import useCategories from "../../hooks/useCategories";

function BreadCrumbs({ token, categoryId }) {
  const categories = useCategories(token);

  const filteredCategories = categories.filter(
    (category) => category.id === categoryId
  );

  return (
    <span className={styles.breadCrumbs}>
      <Link to="/" className={styles.home}>
        Головна
      </Link>
      {categoryId && (
        <span>
          <Link
            to={`/category/${categoryId}`}
            className={styles.categoryName}
            key={categoryId}
          >
            {filteredCategories.length === 1 && (
              <span>{filteredCategories[0].name}</span>
            )}
          </Link>
        </span>
      )}
    </span>
  );
}

export default BreadCrumbs;
