import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import SearchProduct from "../SearchProduct/SearchProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ModalCartShopping from '../ModalCartShopping/ModalCartShopping';
import { useCart } from "../../contexts/CartContext";
import defaultLogo from "../../assets/no-photo-available.svg";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import Badge, { badgeClasses } from '@mui/material/Badge';
import no_logo from "../../assets/no-photo-available.svg";

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

const Header = ({ token, logo }) => {

  const [openCartShopping, setOpenCartShopping] = useState(false);
  const displayLogo = logo || defaultLogo;

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
            <img src={displayLogo} alt="logo" />
          </a>
        </div>
        <ul className={styles.linksHeader}>
          <li>
            <Button
              variant="text"
              to="/about"
              className={styles.linksHeaderButtons}
              disableRipple
            >
              Про нас
            </Button>
          </li>
          <li>
            <Button
              variant="text"
              to="/communication"
              className={styles.linksHeaderButtons}
              disableRipple
            >
              Контакти
            </Button>
          </li>
        </ul>

        <SearchProduct className={styles.searchHeader} token= {token} />

        <form className={styles.iconContainer}>

          <IconButton
            aria-label="cart"
            onClick={handleCartClick}
            className ={`${styles.headerButton} ${styles.headerIconButton}`}
            disableRipple
            disableTouchRipple
            disableFocusRipple
     
          >
            <CartBadge badgeContent={cartItemCount} color="error" overlap="circular">
              <FontAwesomeIcon icon={faCartShopping} className={styles.headerIcon}/>
            </CartBadge>
            <p className={styles.headerIconLabel}>Кошик</p>
          </IconButton>

          <IconButton
            aria-label="favorites"
            className={`${styles.headerButton} ${styles.headerIconButton}`}
            disableRipple
            disableTouchRipple
            disableFocusRipple
          >
            <FontAwesomeIcon icon={faHeart} className={styles.headerIcon} />
            <p className={styles.headerIconLabel}>Обране</p>
          </IconButton>

          <IconButton
            aria-label="login"
            className={`${styles.headerButton} ${styles.headerIconButton}`}
             style={{
              display:'none'
             }}
            disableRipple
            disableTouchRipple
            disableFocusRipple
          >
            <FontAwesomeIcon icon={faUser} className={styles.headerIcon} />
            <p className={styles.headerIconLabel}>Увійти</p>
          </IconButton>

        </form>
        <ModalCartShopping open={openCartShopping} onClose={closeCartModal} token= {token}/>
      </div>
    </header>
  );
};

export default Header;


