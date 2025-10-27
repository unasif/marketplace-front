import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import SearchProduct from "../SearchProduct/SearchProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ModalCartShopping from '../ModalCartShopping/ModalCartShopping';
import { useCart } from "../../contexts/CartContext";
import logo from "../../assets/logo.svg";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';

const CartBadge = styled(Badge)(({ theme }) => ({
  [`& .${badgeClasses.badge}`]: {
    top: -4,
    right: -6,
    fontSize: '0.65rem',
    minWidth: '16px',
    height: '16px',
    padding: '0 4px',
    borderRadius: '50%',
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
  },
}));

function CartButton({ cartItemCount, handleCartClick }) {
  return (
    <button className={styles.headerButton} onClick={handleCartClick}>
      <IconButton
        aria-label="cart"
        className={styles.headerIconButton}
        disableRipple
        disableFocusRipple
      >
        <CartBadge badgeContent={cartItemCount} color="error" overlap="circular">
          <FontAwesomeIcon icon={faCartShopping} className={styles.cartIcon}/>
        </CartBadge>
      </IconButton>
      <p className={styles.headerIconLabel}>Кошик</p>
    </button>
  );
}

const Header = ({ token }) => {

  const [openCartShopping, setOpenCartShopping] = useState(false);

  const handleCartClick = (event) => {
    event.preventDefault();
    setOpenCartShopping(true);
  };

  const closeCartModal = () => {
    setOpenCartShopping(false);
  };
  
  const { cart } = useCart(); // Отримуємо кошик з контексту
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); // Підрахунок загальної кількості товарів

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.logoHeader}>
          <a href="/">
            <img src={logo} alt="logo" />
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
          <CartButton cartItemCount={cartItemCount} handleCartClick={handleCartClick} />

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

