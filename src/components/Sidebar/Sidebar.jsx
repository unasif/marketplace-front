import React from "react";
import styles from "./Sidebar.module.scss";
import CategoriesSidebar from "../CategoriesSidebar/CategoriesSidebar";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import ManufacturerFilter from "../ManufacturerFilter/ManufacturerFilter";
import PropTypes from "prop-types";
 

const Sidebar = ({ token, categoryId, onOpenCatalog }) => {
  return (
    <aside className={styles.sidebar}>
      <BreadCrumbs token={token} categoryId={categoryId} />
      <CategoriesSidebar token={token} onOpenCatalog={onOpenCatalog} />
        <ManufacturerFilter
        selectedManufacturers={selectedManufacturers}
        onChange={onManufacturerChange}
      />
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
