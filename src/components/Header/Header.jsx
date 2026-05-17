import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link as RouterLink } from "react-router-dom";
import SearchProduct from "../SearchProduct/SearchProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ModalCartShopping from '../ModalCartShopping/ModalCartShopping';
import { useCart } from "../../contexts/CartContext";
import { useFavourites } from "../../contexts/FavouritesContext";
import defaultLogo from "../../assets/no-photo-available.svg";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import LogoImage from "../LogoImage/LogoImage";
import { Button } from '@mui/material';
import { Link as MuiLink } from "@mui/material";
import Badge, { badgeClasses } from '@mui/material/Badge';

import useBaseInfo from "../../hooks/useBaseInfo";

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

const Header = ({ token, logo: propLogo }) => {

  const [openCartShopping, setOpenCartShopping] = useState(false);
  const useBaseInfo = require("../../hooks/useBaseInfo").default;
  const baseInfo = useBaseInfo();
  const info = Array.isArray(baseInfo) ? baseInfo[0] || {} : baseInfo || {};
  const logoPath = info.logo || propLogo || defaultLogo;
  const logoData = { logo: logoPath };

  const handleCartClick = (event) => {
    event.preventDefault();
    setOpenCartShopping(true);
  };

  const closeCartModal = () => {
    setOpenCartShopping(false);
  };
  
  const { cart } = useCart();
  const { count: favouritesCount } = useFavourites();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.logoHeader}>
          <LogoImage logoIm={logoData} textColor="#45525c" />
        </div>
        <ul className={styles.linksHeader}>
          <li>
            <MuiLink component={RouterLink} to="/about" className={styles.linksHeaderButtons}>
                Про нас
            </MuiLink>
          </li>
          <li>
            <MuiLink component={RouterLink} to="/communication" className={styles.linksHeaderButtons}>
                Контакти
            </MuiLink>
          </li>
        </ul>

        <SearchProduct className={styles.searchHeader} token= {token} />

        <div className={styles.iconContainer}>

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
            component={RouterLink}
            to="/favourites"
            aria-label="favorites"
            className={`${styles.headerButton} ${styles.headerIconButton}`}
            disableRipple
            disableTouchRipple
            disableFocusRipple
          >
            <CartBadge badgeContent={favouritesCount} color="error" overlap="circular">
              <FontAwesomeIcon icon={faHeart} className={styles.headerIcon} />
            </CartBadge>
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

        </div>
        <ModalCartShopping open={openCartShopping} onClose={closeCartModal} token= {token}/>
      </div>
    </header>
  );
};

export default Header;


