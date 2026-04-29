import React from "react";
import styles from "./ButtonBuy.module.scss";
import { useCart } from "../../contexts/CartContext";
import { usePopUp } from "../../contexts/PopUpContext";

function ButtonBuy({ product }) {

  const { addToCart } = useCart();
  const { addPopUp } = usePopUp();

  const handleAddToCart = () => {
    addToCart(product);
    addPopUp(`"${product.name}" додано в кошик`, "success", 3000);
  };

  return <button className={styles.buttonBuy} onClick={handleAddToCart}>Купити</button>;
}

export default ButtonBuy;
