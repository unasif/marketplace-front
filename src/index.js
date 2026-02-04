import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
const basename = window.location.pathname.startsWith('/marketdemo') 
  ? '/marketdemo' 
  : '/';
root.render(
  // <React.StrictMode>
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StyledEngineProvider>

  // </React.StrictMode>
);
