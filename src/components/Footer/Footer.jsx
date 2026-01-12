import React from "react";
import styles from "./Footer.module.scss";
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
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
import Button from '@mui/material/Button'

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

const FooterMenuButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 400,
  padding: '4px 0',
  justifyContent: 'flex-start',
  transition: 'color 0.3s ease',
  '&:hover': {
    backgroundColor: 'transparent',
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
              <SocialIconButton component="a" href="https://facebook.com" target="_blank">
                <FacebookIcon fontSize="small" />
              </SocialIconButton>
            </div>
            <div className={styles.socialIcon}>
              <SocialIconButton component="a" href="https://x.com" target="_blank">
                <XIcon fontSize="small" />
              </SocialIconButton>
            </div>
          </div>
        </div>

        <div className={styles.linksPrivacyPolicy}>
          <div className={styles.linksFooter}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              <FooterMenuButton 
                component={RouterLink} 
                to="/about"
              >
                Про нас
              </FooterMenuButton>
              
              <FooterMenuButton 
                component={RouterLink} 
                to="/communication"
              >
                Контакти
              </FooterMenuButton>
            </div>
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
