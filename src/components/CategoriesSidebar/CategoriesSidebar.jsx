import React, { useState } from "react";
import styles from "./CategoriesSidebar.module.scss";
import SubCategories from "../SubCategories/SubCategories";
import useCategories from "../../hooks/useCategories";

const CategoriesSidebar = () => {
  const categories = useCategories();

  return (
    <nav className={styles.linksSidebar}>
      <p>Категорії</p>
      {/* НЕ передаємо categoryId для кореневих категорій */}
      <SubCategories categories={categories} level={0} />
      
      <button 
        style={{
          backgroundColor: '#136aba', 
          border: '1px solid transparent',
          borderRadius: '228px',     
          color: '#fff',
          fontSize: '16px',           
          height: '40px',
          textAlign: 'center',        
          width: '150px',
          cursor: 'pointer'
        }}
        onClick={() => setIsModalOpen(true)}
      >
        КАТЕГОРІЇ
      </button>
    </nav>
    
  );
};

export default CategoriesSidebar;
