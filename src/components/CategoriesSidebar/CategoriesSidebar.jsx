import React, { useState, useRef } from "react";
import styles from "./CategoriesSidebar.module.scss";
import { Link } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import useManufacturers from "../../hooks/useManufacturers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import useCategoriesById from "../../hooks/useCategoriesById";

const CategoriesSidebar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const categories = useCategories();
  const subcategories = useCategoriesById(activeCategory?.id);
  const listRef = useRef(null);

  const { manufacturers } = useManufacturers();

  const topLevelCategories = categories.filter(cat => !cat.categories_id || cat.categories_id === null);

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
        {/* ===== КАТЕГОРІЇ ===== */}
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

        {/* Flyout панель підкатегорій */}
        {activeCategory && (
          <Paper elevation={0} className={styles.flyoutPanel}>
            <h2 className={styles.flyoutTitle}>{activeCategory.name}</h2>
            <Grid container spacing={3}>
              {subcategories.length === 0 ? (
                <Grid item xs={12}><div>Немає підкатегорій</div></Grid>
              ) : (
                subcategories.map((subcat) => (
                  <SubCategoryItem
                    key={subcat.id}
                    subcat={subcat}
                    handleClose={handleClose}
                    styles={styles}
                  />
                ))
              )}
            </Grid>
          </Paper>
        )}

        {/* ===== ВИРОБНИКИ ===== */}
        <p className={styles.sidebarHeader} style={{ marginTop: '16px', borderTop: '1px solid #D5DADF', paddingTop: '16px' }}>
          Виробник
        </p>
        <ul className={styles.rootList} style={{ height: 'auto', maxHeight: '300px' }}>
          {manufacturers.map((m) => {
            const id = m.id ?? m.id_bas ?? m.name;
            return (
              <li key={id} className={styles.rootItem} style={{ padding: '10px 20px' }}>
                <span className={styles.rootLink} style={{ cursor: 'default' }}>
                  <span>{m.name}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </Paper>
    </>
  );
};

const SubCategoryItem = ({ subcat, handleClose, styles }) => {
  const level3Items = useCategoriesById(subcat.id);

  return (
    <Grid item xs={12} sm={6} md={3} key={subcat.id}>
      <div className={styles.groupBlock}>
        <h3 className={styles.groupTitle}>
          <Link to={`/category/${subcat.id}`} onClick={handleClose}>
            {subcat.name}
          </Link>
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0 0' }}>
          {level3Items.map((item) => (
            <li key={item.id} style={{ marginBottom: '4px' }}>
              <Link
                to={`/category/${item.id}`}
                onClick={handleClose}
                className={styles.subcategoryLink}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Grid>
  );
};

export default CategoriesSidebar;