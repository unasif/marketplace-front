import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useCategoriesById from "../../hooks/useCategoriesById";

const SubCategories = ({ token, categoryId }) => {
  const categories = useCategoriesById(token, categoryId);
  const navigate = useNavigate();

  if (!categories || categories.length === 0) {
    return null;
  }

  const handleNavigation = (event, id) => {
    event.preventDefault();
    navigate(`/category/${id}`);
  };

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            to={`/category/${category.id}`}
            onClick={(e) => handleNavigation(e, category.id)}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SubCategories;
