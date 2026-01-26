
import React, { useState, useRef } from "react";
import styles from "./CategoriesSidebar.module.scss";
import { Link } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import useCategoriesById from "../../hooks/useCategoriesById";


const CategoriesSidebar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const categories = useCategories();
  const subcategories = useCategoriesById(activeCategory?.id);
  const LINKS_LIMIT = 5;
  const listRef = useRef(null);

  // Фільтруємо тільки топ-рівневі категорії (без батьківської категорії)
  const topLevelCategories = categories.filter(cat => !cat.parent_id || cat.parent_id === null);

  const handleCategoryHover = (category) => {
    setActiveCategory(category);
  };

  const handleClose = () => {
    setActiveCategory(null);

    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  };

  return (
    <>
      <Paper
        component="nav"
        elevation={0}
        className={`${styles.linksSidebar} ${activeCategory ? styles.hasShadow : ''}`}
        onMouseLeave={handleClose}
        square
      >
        <p className={styles.sidebarHeader}>Категорії</p>
        <ul className={styles.rootList} ref={listRef}>
          {topLevelCategories.map((category) => (
            <li
              key={category.id}
              className={`${styles.rootItem} ${activeCategory?.id === category.id ? styles.active : ''}`}
              onMouseEnter={() => handleCategoryHover(category)}
            >
              <Link to={`/category/${category.id}`} className={styles.rootLink}>
                <span>{category.name}</span>
                <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
              </Link>
            </li>
          ))}
        </ul>

        {/* Права панель (Mega Menu) */}
        {activeCategory && (
            <Paper
              elevation={0}
              className={styles.flyoutPanel}
            >
              <h2 className={styles.flyoutTitle}>{activeCategory.name}</h2>
              <Grid container spacing={3}>
                {subcategories.length === 0 ? (
                    <Grid item xs={12}><div>Немає підкатегорій</div></Grid>
                  ) : (
                    subcategories.map((subcat, index) => {
                      return (
                        <Grid item xs={12} sm={6} md={3} key={subcat.id || index}>
                          <div className={styles.groupBlock}>
                            <h3 className={styles.groupTitle}>
                              <Link
                                to={`/category/${subcat.id_bas}`}
                                onClick={handleClose}
                              >
                                {subcat.name}
                              </Link>
                            </h3>
                          </div>
                        </Grid>
                      );
                    })
                  )
                }
              </Grid>
            </Paper>
        )}
      </Paper>
    </>
  );
};

export default CategoriesSidebar;
