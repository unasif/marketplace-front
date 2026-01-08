import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faX,
  faLocation,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import no_logo from "../../assets/no-photo-available.svg";
import defaultLogo from "../../assets/no-photo-available.svg";
import LogoImage from "../LogoImage/LogoImage";

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

import IconButton from '@mui/material/IconButton';

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  width: 34,
  height: 34,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#fff',
  transition: 'color 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#13b3ba',
  },
}));

const Footer = ({ logoIm, adress, phonenumber, gmail }) => {

  const displayLogo = logoIm || defaultLogo;
  return (
    <footer className={styles.footer}>
      <footer className={styles.footer__container}>
        <div className={styles.logoSocial}>
          <div>
            <LogoImage logoIm={logoIm} />
          </div>
          <div className={styles.social}>
            <div className={styles.socialIcon}>
              <SocialIconButton component="a" href="https://instagram.com" target="_blank">
                <InstagramIcon fontSize="small" />
              </SocialIconButton>
            </div>
            <div className={styles.socialIcon}>
              <a href="https://www.facebook.com/" target="blank">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
            <div className={styles.socialIcon}>
              <a href="https://twitter.com/" target="blank">
                <FontAwesomeIcon icon={faX} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.linksPrivacyPolicy}>
          <div className={styles.linksFooter}>
            <ul>
              <li>
                <Link to="/about">Про нас</Link>
              </li>
              <li>
                <Link to="/">Новини</Link>
              </li>
              <li>
                <Link to="/communication">Контакти</Link>
              </li>
            </ul>
          </div>

          <div className={styles.privacyPolicy}>
            <span>© 2024 UNAS. All rights reserved.</span>
          </div>
        </div>

        <div className={styles.contacts}>
          <div className={styles.location}>
            <div className={styles.contactsIcon}>
              <span>
                <FontAwesomeIcon icon={faLocation} />
              </span>
            </div>
            <div className={styles.contactsLabel}>
              {adress ? (
                <p>{adress}</p>
              ) : (
                <p>Адреса не вказана</p>
              )}
            </div>
          </div>

          <div className={styles.phones}>
            <div className={styles.contactsIcon}>
              <span>
                <FontAwesomeIcon icon={faPhone} />
              </span>
            </div>
            <div className={styles.contactsLabel}>
              {phonenumber ? (
                <a href={`tel:${phonenumber}`} target="blank">
                  <span>{phonenumber}</span>
                </a>
              ) : (
                <span>Телефон не вказано</span>
              )}
            </div>
          </div>

          <div className={styles.email}>
            <div className={styles.contactsIcon}>
              <span>
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
            <div className={styles.contactsLabel}>
              {gmail ? (
                <a href={`mailto:${gmail}`} target="blank">
                  <span>{gmail}</span>
                </a>
              ) : (
                <span>Email не вказано</span>
              )}
            </div>
          </div>
        </div>
      </footer>
    </footer>
  );
};

export default Footer;
