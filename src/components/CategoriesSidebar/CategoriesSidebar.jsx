import React, { useState, useRef } from "react";
import styles from "./CategoriesSidebar.module.scss";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import useManufacturers from "../../hooks/useManufacturers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import useCategoriesById from "../../hooks/useCategoriesById";

const CategoriesSidebar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchParams] = useSearchParams();
  const categories = useCategories();
  const subcategories = useCategoriesById(activeCategory?.id);
  const listRef = useRef(null);

  const { manufacturers } = useManufacturers();
  const navigate = useNavigate();
  
  const currentCategory = searchParams.get("category");
  const currentManufacturer = searchParams.get("manufacturer");
  const selectedManufacturers = currentManufacturer 
    ? decodeURIComponent(currentManufacturer).split(',').map(m => m.trim())
    : [];

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

  const handleToggleManufacturer = (name) => {
    let newSelected;
    if (selectedManufacturers.includes(name)) {
      newSelected = selectedManufacturers.filter(m => m !== name);
    } else {
      newSelected = [...selectedManufacturers, name];
    }

    // Будуємо URL з обома параметрами
    const params = new URLSearchParams();
    if (currentCategory) {
      params.set("category", currentCategory);
    }
    if (newSelected.length > 0) {
      params.set("manufacturer", encodeURIComponent(newSelected.join(',')));
    }

    if (params.toString()) {
      navigate(`/products?${params.toString()}`);
    } else {
      navigate('/');
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
        <div className={styles.sidebarScrollArea}>
        {/* ===== КАТЕГОРІЇ ===== */}
        <p className={styles.sidebarHeader}>Категорії</p>
        <ul className={styles.rootList} ref={listRef}>
          {topLevelCategories.map((category) => (
            <li
              key={category.id}
              className={`${styles.rootItem} ${activeCategory?.id === category.id ? styles.active : ''}`}
              onMouseEnter={() => handleCategoryHover(category)}
            >
              <Link to={`/products?category=${category.id}${currentManufacturer ? `&manufacturer=${currentManufacturer}` : ''}`} className={styles.rootLink}>
                <span>{category.name}</span>
                <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
              </Link>
            </li>
          ))}
        </ul>

        {/* ===== ВИРОБНИКИ ===== */}
        {manufacturers.length > 0 && (
          <>
            <p className={styles.sidebarHeader} style={{ marginTop: '16px', borderTop: '1px solid #D5DADF', paddingTop: '16px' }}>
              Виробники
            </p>
            <ul className={styles.manufacturersList}>
              {manufacturers.map((m, index) => {
                const manufacturerName = typeof m === 'string' ? m : m.name;
              
                if (!manufacturerName) return null;
                const id = m.id ?? m.id_bas ?? index; 

                return (
                  <li 
                    key={id} 
                    className={styles.rootItem}
                  >
                    <div className={styles.rootLink}>
                      {/* Тег label обгортає input та текст, тому клік по тексту автоматично перемикає input */}
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', width: '100%', margin: 0 }}>
                        <input
                          type="checkbox"
                          className={styles.customCheckbox}
                          checked={selectedManufacturers.includes(manufacturerName)}
                          onChange={() => handleToggleManufacturer(manufacturerName)}
                        />
                        <span>{manufacturerName}</span>
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        </div>
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
                    currentManufacturer={currentManufacturer}
                  />
                ))
              )}
            </Grid>
          </Paper>
        )}

      </Paper>
    </>
  );
};

const SubCategoryItem = ({ subcat, handleClose, styles, currentManufacturer }) => {
  const level3Items = useCategoriesById(subcat.id);

  return (
    <Grid item xs={12} sm={6} md={3} key={subcat.id}>
      <div className={styles.groupBlock}>
        <h3 className={styles.groupTitle}>
          <Link to={`/products?category=${subcat.id}${currentManufacturer ? `&manufacturer=${currentManufacturer}` : ''}`} onClick={handleClose}>
            {subcat.name}
          </Link>
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0 0' }}>
          {level3Items.map((item) => (
            <li key={item.id} style={{ marginBottom: '4px' }}>
              <Link
                to={`/products?category=${item.id}${currentManufacturer ? `&manufacturer=${currentManufacturer}` : ''}`}
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