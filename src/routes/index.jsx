import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from "../pages/Home/Home";
import { About } from "../pages/About/About";
import { Communication } from "../pages/Communication/Communication";
import { SingleProduct } from "../pages/SingleProduct/SingleProduct";

export const AppRoutes = ({ token }) => {
  return (
    <div>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/communication" element={<Communication />} />

        <Route path="/" element={<Home token={token} />} />
        <Route path="/products" element={<SingleProduct />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
