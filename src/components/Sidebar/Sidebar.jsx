import React from "react";
import styles from "./Sidebar.module.scss";
import CategoriesSidebar from "../CategoriesSidebar/CategoriesSidebar";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import PropTypes from "prop-types";

const Sidebar = ({ token, categoryId }) => {
  return (
    <aside className={styles.sidebar}>
      <BreadCrumbs token={token} categoryId={categoryId} />
      <CategoriesSidebar token={token} />
      <CategoriesSidebar onOpenCatalog={onOpenCatalog} />
    </aside>
  );
};

// Визначення типів пропсів для компонента
Sidebar.propTypes = {
  token: PropTypes.string,
  categoryId: PropTypes.number,
};

// Встановлення значень за замовчуванням для пропсів
Sidebar.defaultProps = {
  token: "",
  categoryId: null,
};

export default Sidebar;
