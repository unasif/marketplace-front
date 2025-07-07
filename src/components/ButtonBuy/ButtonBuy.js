import React from "react";
import styles from "./ButtonBuy.module.scss";
import { useCart } from "../../contexts/CartContext";

function ButtonBuy({ product }) {

  const { addToCart } = useCart();

  return <button className={styles.buttonBuy} onClick={() => addToCart(product)}>Купити</button>;
}

export default ButtonBuy;
