import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCategoriesById from "../../hooks/useCategoriesById";
import AccordionArrow from "../../assets/accordionArrow.svg";
import styles from "../CategoriesSidebar/CategoriesSidebar.module.scss";

const SubCategories = ({ token, categoryId, level = 0 }) => {
  const categories = useCategoriesById(token, categoryId);
  const [openIds, setOpenIds] = useState([]);
  const navigate = useNavigate();

  if (!categories || categories.length === 0) {
    return null;
  }

  const toggleOpen = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    );
  };

  const handleNavigation = (event, id) => {
    event.preventDefault();
    navigate(`/category/${id}`);
  };

  return (
    <ul className={styles.subMenuList} style={{ paddingLeft: level * 16 }}>
      {categories.map((category) => (
        <li key={category.id} className={styles.menuItem}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
            <button
              className={styles.menuHeader}
              onClick={() => toggleOpen(category.id)}
              style={{ marginLeft: 8 }}
            >
              <img
                src={AccordionArrow}
                alt="Accordion Arrow"
                className={
                  openIds.includes(category.id)
                    ? `${styles.accordionArrow} ${styles.active}`
                    : styles.accordionArrow
                }
              />
            </button>
          </div>
          {openIds.includes(category.id) && (
            <SubCategories
              token={token}
              categoryId={category.id}
              level={level + 1}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default SubCategories;
