import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));

const getBasename = () => {
  const path = window.location.pathname;
  
  if (path.startsWith('/testdevelopment')) {
    return '/testdevelopment';
  }
  
  if (path.startsWith('/marketdemo')) {
    return '/marketdemo';
  }
  
  return '/'; 
};

const basename = getBasename();

root.render(
  // <React.StrictMode>
  <StyledEngineProvider injectFirst>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StyledEngineProvider>

  // </React.StrictMode>
);
