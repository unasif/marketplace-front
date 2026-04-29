import React, { createContext, useContext, useState, useCallback } from "react";

const PopUpContext = createContext();

export const PopUpProvider = ({ children }) => {
  const [popups, setPopups] = useState([]);

  const addPopUp = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now();
    const newPopUp = { id, message, type };

    setPopups((prevPopups) => [...prevPopups, newPopUp]);

    if (duration > 0) {
      setTimeout(() => {
        removePopUp(id);
      }, duration);
    }

    return id;
  }, []);

  const removePopUp = useCallback((id) => {
    setPopups((prevPopups) => prevPopups.filter((popup) => popup.id !== id));
  }, []);

  return (
    <PopUpContext.Provider value={{ popups, addPopUp, removePopUp }}>
      {children}
    </PopUpContext.Provider>
  );
};

export const usePopUp = () => {
  const context = useContext(PopUpContext);
  if (!context) {
    throw new Error("usePopUp повинен використовуватися всередині PopUpProvider");
  }
  return context;
};
