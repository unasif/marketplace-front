import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useCategoriesById from "../../hooks/useCategoriesById";
import AccordionArrow from "../../assets/accordionArrow.svg";
import styles from "../CategoriesSidebar/CategoriesSidebar.module.scss";

const SubCategories = ({ token, categoryId, level = 0 }) => {
  const { data: categories, loading } = useCategoriesById(token, categoryId);
  const [openIds, setOpenIds] = useState([]);
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  const toggleOpen = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    );
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      <ul className={styles.subMenu} style={{ paddingLeft: level * 16 }}>
        {categories.map((category) => {
          const hasChildren =
            category.has_children ||
            category.children_count > 0 ||
            category.hasChildren;

          return (
            <li key={category.id} className={styles.menuItem}>
              <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                <Link
                  to={`/category/${category.id}`}
                  className={`${styles.link} ${
                    isActive(`/category/${category.id}`) ? styles.active : ""
                  }`}
                  style={{ flex: 1 }}
                >
                  {category.name}
                </Link>

                {hasChildren && (
                  <button
                    className={styles.menuHeader}
                    onClick={() => toggleOpen(category.id)}
                    style={{ marginLeft: 8 }}
                    aria-expanded={openIds.includes(category.id)}
                    aria-label={openIds.includes(category.id) ? "Закрити" : "Відкрити"}
                  >
                    <img
                      src={AccordionArrow}
                      alt=""
                      className={
                        openIds.includes(category.id)
                          ? `${styles.accordionArrow} ${styles.active}`
                          : styles.accordionArrow
                      }
                    />
                  </button>
                )}
              </div>

              {openIds.includes(category.id) && (
                <SubCategories token={token} categoryId={category.id} level={level + 1} />
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SubCategories;
