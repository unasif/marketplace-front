import React, { useEffect, useState } from "react";
import { use } from "react";
import { Link } from "react-router-dom";

const catalogData = [
  {
    id: 1,
    name: "Категорія 1.1",
    icon: "📁",
    items: [
      "Підкатегорія 1.2 (Варіант А)",
      "Підкатегорія 1.2 (Варіант Б)",
      "Підкатегорія 1.2 (Варіант В)"
    ]
  },
  {
    id: 2,
    name: "Категорія 2.1",
    icon: "📂",
    items: [
      "Підкатегорія 2.2 (Елемент 1)",
      "Підкатегорія 2.2 (Елемент 2)"
    ]
  },
  {
    id: 3,
    name: "Категорія 3.1",
    icon: "📦",
    items: [
      "Підкатегорія 3.2 (Тест)",
      "Підкатегорія 3.2 (Тест 2)",
      "Підкатегорія 3.2 (Тест 3)",
      "Підкатегорія 3.2 (Тест 4)"
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
                                activeCategories === category.id ? styles.active : ""
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
                            ×
                        </button> {/* Зробити через іконку Close */}

                        <h2 className={styles.categoryTitle}>{activeCategories.name}</h2>

                        <div className={styles.subGrid}>
                            {activeCategories.items.map((item, index) => (
                                <Link
                                    to={`/category/${item}`}
                                    key={index}
                                    className={styles.subLink}
                                    onClick={onClose}
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default CategoriesModal;
    