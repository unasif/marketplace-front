import React from "react";
import styles from "./Sidebar.module.scss";
import CategoriesSidebar from "../CategoriesSidebar/CategoriesSidebar";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import ManufacturerFilter from "../ManufacturerFilter/ManufacturerFilter";
import PropTypes from "prop-types";

const Sidebar = ({ token, categoryId, onOpenCatalog, selectedManufacturers, onManufacturerChange }) => {
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

Sidebar.propTypes = {
  token: PropTypes.string,
  categoryId: PropTypes.number,
  onOpenCatalog: PropTypes.func,
  selectedManufacturers: PropTypes.array,
  onManufacturerChange: PropTypes.func,
};

Sidebar.defaultProps = {
  token: "",
  categoryId: null,
  selectedManufacturers: [],
  onManufacturerChange: undefined,
};

export default Sidebar;