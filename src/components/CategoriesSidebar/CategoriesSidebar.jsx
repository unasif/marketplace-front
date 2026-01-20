
import React, { useState } from "react";
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
  const [subcategories, setSubcategories] = useState([]);
  const [loadingSub, setLoadingSub] = useState(false);
  const LINKS_LIMIT = 5;

  const handleCategoryHover = (category) => {
    setActiveCategory(category);
    setLoadingSub(true);
    import("../../hooks/useCategoriesById").then(({ default: useCategoriesById }) => {
      fetchSubcategories(category.id);
    });
  };

  const fetchSubcategories = async (id) => {
    try {
      const response = await fetch(`/api/category/by_categories_id/?categories_id=${id}`, {
        headers: {
          'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
        }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setSubcategories(data);
    } catch (error) {
      setSubcategories([]);
    } finally {
      setLoadingSub(false);
    }
  };

  const handleClose = () => {
    setActiveCategory(null);
    setSubcategories([]);
  };

  return (
    <>
      <Paper
        component="nav"
        elevation={0}
        className={styles.linksSidebar}
        onMouseLeave={handleClose}
        square
      >
        <p className={styles.sidebarHeader}>Категорії</p>
        <ul className={styles.rootList}>
          {categories.map((category) => (
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
              {loadingSub ? (
                <Grid item xs={12}><div>Завантаження...</div></Grid>
              ) : (
                subcategories.length === 0 ? (
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
              )}
            </Grid>
          </Paper>
        )}
      </Paper>
    </>
  );
};

export default CategoriesSidebar;
