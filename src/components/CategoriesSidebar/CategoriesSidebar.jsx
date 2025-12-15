import React, { useState } from "react";
import styles from "./CategoriesSidebar.module.scss";
import { Link } from "react-router-dom";
import SubCategories from "../SubCategories/SubCategories";
import useCategories from "../../hooks/useCategories";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import Paper from '@mui/material/Paper';

const catalogData = [
  {
    id: 1,
    name: "Категорія 1",
    items: [
      {
        title: "Підкатегорія 1 (заголовок)",
        links: ["Під-підкатегорія 1", "Під-підкатегорія 2", "Під-підкатегорія 3", "Під-підкатегорія 4", "Під-підкатегорія 5"]
      },
      {
        title: "Під категорія 2 (заголовок)",
        links: ["Під-підкатегорія 1", "Під-підкатегорія 2", "Під-підкатегорія 3", "Під-підкатегорія 4", "Під-підкатегорія 5"]
      },
      {
        title: "Підкатегорія 3 (заголовок)",
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
          <div className={styles.flyoutPanel}>
            <h2 className={styles.flyoutTitle}>{activeCategory.name}</h2>
            
            <div className={styles.groupsGrid}>
              {activeCategory.items.map((group, index) => (
                <div key={index} className={styles.groupBlock}>

                  <h3 className={styles.groupTitle}>
                    <Link 
                      to={`/category/${group.title}`} 
                      onClick={handleClose}
                    >
                      {group.title}
                    </Link>
                  </h3>

                  <div className={styles.linksList}>
                    {group.links.map((link, linkIndex) => (
                      <Link
                        to={`/category/${link}`} 
                        key={linkIndex}
                        className={styles.subLink}
                        onClick={handleClose}
                      >
                        {link}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
