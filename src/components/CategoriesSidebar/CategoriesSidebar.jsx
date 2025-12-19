import React, { useState } from "react";
import styles from "./CategoriesSidebar.module.scss";
import { Link } from "react-router-dom";
import SubCategories from "../SubCategories/SubCategories";
import useCategories from "../../hooks/useCategories";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const catalogData = [
  {
    id: 1,
    name: "Категорія 1 тест дуже довгої назви підкатегорії",
    items: [
      {
        title: "Під категорія тест довгої назви 1",
        links: ["Під-підкатегорія 1", "Під-підкатегорія 2 Тест дуже довгої назви під-підкатегорії", "Під-підкатегорія 3", "Під-підкатегорія 4", "Під-підкатегорія 5",  "Під-підкатегорія 6"]
      },
      {
        title: "Під категорія тест дуже довгої назви ну типу 2",
        links: ["Під-підкатегорія 1", "Під-підкатегорія 2", "Під-підкатегорія 3", "Під-підкатегорія 4", "Під-підкатегорія 5"]
      },
      {
        title: "Під категорія 3",
        links: ["Під-підкатегорія 1", "Під-підкатегорія 2", "Під-підкатегорія 3", "Під-підкатегорія 4"]
      },
      {
        title: "Під категорія 4",
        links: ["Під-підкатегорія 1", "Під-підкатегорія 2", "Під-підкатегорія 3", "Під-підкатегорія 4", "Під-підкатегорія 5", "Під-підкатегорія 6"]
      },
      {
        title: "Під категорія 5",
        links: ["Під-підкатегорія 1", "Під-підкатегорія 2", "Під-підкатегорія 3", "Під-підкатегорія 4", "Під-підкатегорія 5", "Під-підкатегорія 6"]
      },
      {
        title: "Під категорія 6",
        links: ["Під-підкатегорія 1", "Під-підкатегорія 2", "Під-підкатегорія 3", "Під-підкатегорія 4", "Під-підкатегорія 5", "Під-підкатегорія 6"]
      },
      {
        title: "Під категорія 7",
        links: ["Під-підкатегорія 1", "Під-підкатегорія 2", "Під-підкатегорія 3", "Під-підкатегорія 4"]
      },
      {
        title: "Під категорія 8",
        links: ["Під-підкатегорія 1", "Під-підкатегорія 2", "Під-підкатегорія 3", "Під-підкатегорія 4"]
      },
      {
        title: "Під категорія 9",
        links: ["Під-підкатегорія 1", "Під-підкатегорія 2", "Під-підкатегорія 3", "Під-підкатегорія 4"]
      }
    ]
  },
  {
    id: 2,
    name: "Категорія 2",
    items: [
      {
        title: "Підкатегорія 2.1",
        links: ["Під-підкатегоря 1", "Під-підкатегоря 2", "Під-підкатегоря 3", "Під-підкатегоря 4"]
      },
      {
        title: "Підкатегорія 2.2",
        links: ["Під-підкатегоря 1", "Під-підкатегоря 2", "Під-підкатегоря 3"]
      }
    ]
  },
  {
    id: 3,
    name: "Категорія 3",
    items: [
      {
        title: "Підкатегорія 3.1",
        links: ["Під-підкатегоря 1", "Під-підкатегоря 2", "Під-підкатегоря 3"]
      },
      {
        title: "Підкатегорія 3.2",
        links: ["Під-підкатегоря 1", "Під-підкатегоря 2", "Під-підкатегоря 3"]
      }
    ]
  }
];

const CategoriesSidebar = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleClose = () => {
    setActiveCategory(null);
  };
  
  const LINKS_LIMIT = 5;

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
          {catalogData.map((category) => (
            <li 
              key={category.id} 
              className={`${styles.rootItem} ${activeCategory?.id === category.id ? styles.active : ''}`}
              onMouseEnter={() => setActiveCategory(category)}
            >
              <Link to={`/category/${category.id}`} className={styles.rootLink}>
                <span>{category.name}</span>
                {/* Стрілочка */}
                <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
              </Link>
            </li>
          ))}
        </ul>

        {/* Права панель (Mega Menu) */}
        {activeCategory && (
          <Paper 
          elevation={4} 
          className={styles.flyoutPanel}
          >
            <h2 className={styles.flyoutTitle}>{activeCategory.name}</h2>
            
            <Grid container spacing={3}>
              {activeCategory.items.map((group, index) => {
                const visibleLinks = group.links.slice(0, LINKS_LIMIT);
                const hasMore = group.links.length > LINKS_LIMIT;
                return (
                  <Grid item xs={12} sm={6} md={3} key={index} style={{ minWidth: '250px' }}>
                    <div className={styles.groupBlock}>
                      
                      <h3 className={styles.groupTitle}>
                        <Link 
                            to={`/category/${group.title}`} 
                            onClick={handleClose}
                          >
                            {group.title}
                          </Link>
                      </h3>
                      
                      <div className={styles.linksList}>
                        {visibleLinks.map((link, linkIndex) => (
                          <Link
                            to={`/category/${link}`} 
                            key={linkIndex}
                            className={styles.subLink}
                            onClick={handleClose}
                            title={link}
                          >
                            {link}
                          </Link>
                        ))}

                        {/* Посилання "Переглянути всі" */}
                        {hasMore && (
                          <Link
                            to={`/category/${group.title}`}
                            className={styles.viewMoreLink}
                            onClick={handleClose}
                          >
                            Переглянути всі...
                          </Link>
                        )}
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        )}
      </Paper>
    </>
  );
};

export default CategoriesSidebar;

// const CategoriesSidebar = ({ onOpenCatalog }) => {
//   const categories = useCategories();

//   return (
//     <nav className={styles.linksSidebar}>
//       <p>Категорії</p>
//       {/* НЕ передаємо categoryId для кореневих категорій */}
//       <SubCategories categories={categories} level={0} />
      
//       <button 
//         style={{
//           backgroundColor: '#136aba', 
//           border: '1px solid transparent',
//           borderRadius: '228px',     
//           color: '#fff',
//           fontSize: '16px',           
//           height: '40px',
//           textAlign: 'center',        
//           width: '150px',
//           cursor: 'pointer'
//         }}
//         onClick={onOpenCatalog}
//       >
//         КАТЕГОРІЇ
//       </button>
//     </nav>
    
//   );
// };

// export default CategoriesSidebar;
