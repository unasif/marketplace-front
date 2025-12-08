import React, { useEffect, useState } from "react";
import { use } from "react";
import { Link } from "react-router-dom";
import styles from "../CategoriesModal/CategoriesModal.module.scss";
//тимчасові іконки
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";

const catalogData = [
  {
    id: 1,
    name: "Категорія 1",
    icon: "🏠",
    items: [
      {
        title: "Підкатегорія 1 (заголовок)", // Підкатегорія (Заголовок)
        links: [ // Під-підкатегорії (Посилання)
          "Під-підкатегорія 1",
          "Під-підкатегорія 2",
          "Під-підкатегорія 3",
          "Під-підкатегорія 4",
          "Під-підкатегорія 5"
        ]
      },
      {
        title: "Під категорія 2 (заголовок)",
        links: [
          "Під-підкатегорія 1",
          "Під-підкатегорія 2",
          "Під-підкатегорія 3",
          "Під-підкатегорія 4",
          "Під-підкатегорія 5"
        ]
      },
      {
        title: "Підкатегорія 3 (заголовок)",
        links: [
          "Під-підкатегорія 1",
          "Під-підкатегорія 2",
          "Під-підкатегорія 3",
          "Під-підкатегорія 4"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Категорія 2",
    icon: "🔨",
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
    icon: "🚿",
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

const CategoriesModal = ({ isOpen, onClose }) => {
    const [activeCategories, setActiveCategory] = useState(null);

    useEffect(() => {
        if (!isOpen) {
            setActiveCategory(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.sidebar}>
                    {catalogData.map((category) => (
                        <div
                            key={category.id}
                            className={`${styles.categoryItem} ${   
                                activeCategories?.id === category.id ? styles.active : ""
                            }`}
                            onMouseEnter={() => setActiveCategory(category)}
                        >
                            <div className={styles.itemLeft}>
                                <span className={styles.icon}>{category.icon}</span>
                                {category.name}
                            </div>
                            
                            <span>▶</span> {/* Зробити через іконку стрілочку */} 
                        </div>
                    ))}
                </div>
                {activeCategories && (
                    <div className={styles.rightPanel}>
                        <button className={styles.closeButton} onClick={onClose}>
                             <FontAwesomeIcon icon={faXmark} />
                        </button>

                        <h2 className={styles.mainTitle}>{activeCategories.name}</h2>

                        {/* Сітка для груп категорій */}
                        <div className={styles.groupsGrid}>
                            {activeCategories.items.map((group, index) => (
                                <div key={index} className={styles.groupBlock}>
                                    {/* Заголовок підкатегорії */}
                                    <h3 className={styles.groupTitle}>{group.title}</h3>
                                    
                                    {/* Список під-підкатегорій */}
                                    <div className={styles.linksList}>
                                        {group.links.map((link, linkIndex) => (
                                            <Link
                                                to={`/category/${link}`}
                                                key={linkIndex}
                                                className={styles.subLink}
                                                onClick={onClose}
                                            >
                                                {link}
                                            </Link>
                                        ))}
                                    </div>
                                    
                                    {/* Посилання "Дивитися більше" (якщо треба) */}
                                    <Link to="#" className={styles.viewMore}>Дивитися більше</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default CategoriesModal;
    