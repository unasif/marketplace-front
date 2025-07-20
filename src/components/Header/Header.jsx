import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import SearchProduct from "../SearchProduct/SearchProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ModalCartShopping from '../ModalCartShopping/ModalCartShopping';
import { useCart } from "../../contexts/CartContext";


const Header = ({ primaryColor, token, logoUrl }) => {

  const [openCartShopping, setOpenCartShopping] = useState(false);

  const handleCartClick = (event) => {
    event.preventDefault();
    setOpenCartShopping(true);
  };

  const closeCartModal = () => {
    setOpenCartShopping(false);
  };
  
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header
      className={styles.header}
      style={{ backgroundColor: primaryColor }}
    >
      <div className={styles.header__container}>
        <div className={styles.logoHeader}>
          <a href="/">
            <img src={logoUrl} alt="logo" />
          </a>
        </div>
        <ul className={styles.linksHeader}>
          <li>
            <Link to="/about">Про нас</Link>
          </li>
          <li>
            <Link to="/communication">Контакти</Link>
          </li>
        </ul>
        <SearchProduct className={styles.searchHeader} token= {token} />
        <form className={styles.iconContainer}>
          <button className={styles.headerButton} onClick={handleCartClick}>
            <div className={styles.headerIcon}>
              <FontAwesomeIcon icon={faCartShopping} />
              {cartItemCount > 0 && (
                <span className={styles.cartCount}>{cartItemCount}</span>
              )}
              <p>Кошик</p>
            </div>
          </button>
          <button className={styles.headerButton}>
            {/* <Link to="/like"> */}
            <div className={styles.headerIcon}>
              <FontAwesomeIcon icon={faHeart} />
              <p>Обране</p>
              {/* </Link> */}
            </div>
          </button>

          <button
            className={styles.headerButton}
            // onClick={() =>setOpenUserOffice(true)}>
          >
            {/* <Link to="/userOffice"> */}
            <div className={styles.headerIcon}>
              <FontAwesomeIcon icon={faUser} />
              <p>Увійти</p>
            </div>
            {/* </Link> */}
          </button>
        </form>
        <ModalCartShopping open={openCartShopping} onClose={closeCartModal} token= {token}/>
      </div>
    </header>
  );
};

export default Header;
