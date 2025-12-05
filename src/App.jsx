import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import React, { useState } from "react";
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

function App() {
  const [token, setToken] = useState("nginx-token");

  return (
    <CartProvider>
      <CategoryProvider>
        <div className="wrapper">
          <DocumentTitle title="iShop) 1.0" />
          <ScrollToTop />
          <Token setToken={setToken} />
          <Header token={token} />
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
          <Footer />
        </div>
      </CategoryProvider>
    </CartProvider>
  );
}

export default App;
