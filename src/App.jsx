import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import React, { useState, useEffect } from "react";
import DocumentTitle from "react-document-title";
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { Home } from "./pages/Home/Home";
import { About } from "./pages/About/About";
import { Communication } from "./pages/Communication/Communication";
import { ProductsByCategory } from "./pages/ProductsByCategory/ProductsByCategory";
import { SingleProduct } from "./pages/SingleProduct/SingleProduct";
import { CategoryProvider } from "./contexts/CategoryContext";
import { CartProvider } from "./contexts/CartContext";
import OrderPage from "./pages/OrderPage/OrderPage";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import OrderFailure from "./pages/OrderFailure/OrderFailure";
import { CssBaseline } from '@mui/material'
import { instance } from "./api";



function App() {
  const [token, setToken] = useState("nginx-token");
  const [baseInfo, setBaseInfo] = useState({ logo_url: '', logo2_url: '' });

  useEffect(() => {
    instance.get('base_info')
      .then(res => {
        setBaseInfo(res.data);
      })
      .catch(() => setBaseInfo({ logo_url: '', logo2_url: '' }));
  }, []);

  return (
    <CartProvider>
      <CategoryProvider>
        <CssBaseline /> 
        <div className="wrapper">
          <DocumentTitle title="iShop) 1.0" />
          <ScrollToTop />
          <Header token={token} logoUrl={baseInfo.logo_url} />
          <div className="content">
            <div className="content__container">
              <Routes>
                <Route path="/order" element={<OrderPage token={token} />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                 <Route path="/order-failure" element={<OrderFailure />} />
                <Route path="/about" element={<About />} />
                <Route path="/communication" element={<Communication />} />
                <Route
                  path="/category/:id"
                  element={<ProductsByCategory token={token} />}
                />

                <Route path="/" element={<Home token={token} />} />
                <Route
                  path="/product/:id"
                  element={<SingleProduct token={token} />}
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
          <Footer logo2Url={baseInfo.logo2_url} />
        </div>
      </CategoryProvider>
    </CartProvider>
  );
}

export default App;
