import React from "react";
import styles from "./Footer.module.scss";
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
import defaultLogo from "../../assets/no-photo-available.svg";
import LogoImage from "../LogoImage/LogoImage";
import useBaseInfo from "../../hooks/useBaseInfo";

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Link as MuiLink } from "@mui/material";


const SocialIcon = styled(IconButton)(({ theme }) => ({
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

const FooterLink = styled(MuiLink)(({ theme }) => ({
  color: '#fff',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 400,
  padding: '4px 0',
  justifyContent: 'center',
  transition: 'color 0.3s ease',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#13b3ba',
  },
}));

const ContactCircle = styled('div')({
  width: 32,
  height: 32,
  backgroundColor: '#136aba',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  color: '#fff',
  flexShrink: 0,
  '& svg': {
    fontSize: '18px',
  },
});


const Footer = ({ logoIm }) => {
  // Отримуємо дані з бази через useBaseInfo
  const baseInfo = useBaseInfo();
  // API повертає масив або об'єкт, беремо перший елемент якщо масив
  const info = Array.isArray(baseInfo) ? baseInfo[0] || {} : baseInfo || {};

  // Витягуємо поля згідно з backend: Adress, Phonenumber, Gmail
  const address = info.Adress;
  const phone = info.Phonenumber;
  const email = info.Gmail;
  const displayLogo = logoIm || info.logo || defaultLogo;

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.logoSocial}>
          <div>
            <LogoImage logoIm={logoIm} textColor="#fff" />
          </div>
          <div className={styles.social}>
              <SocialIcon component="a" href="https://instagram.com" target="_blank" aria-label="Instagram">
                <InstagramIcon fontSize="small" />
              </SocialIcon>
              <SocialIcon component="a" href="https://facebook.com" target="_blank" aria-label="Facebook">
                <FacebookIcon fontSize="small" />
              </SocialIcon>
              <SocialIcon component="a" href="https://x.com" target="_blank" aria-label="X">
                <XIcon fontSize="small" />
              </SocialIcon>
          </div>
        </div>

        <div className={styles.linksPrivacyPolicy}>
          <div className={styles.linksFooter}>
            <FooterLink  
              component={RouterLink} 
              to="/about"
            >
              Про нас
            </FooterLink>
            
            <FooterLink 
              component={RouterLink} 
              to="/communication"
            >
              Контакти
            </FooterLink>
          </div>

          <div className={styles.privacyPolicy}>
            <span>© 2024 UNAS. All rights reserved.</span>
          </div>
        </div>

        <ul className={styles.contacts}>
          <li className={styles.contactItem}>
            <ContactCircle>
              <LocationOnIcon />
            </ContactCircle>
               {address ? (
                <p className={styles.contactsLabel}>{address}</p>
              ) : (
                <p className={styles.contactsLabel}>Адреса</p>
              )}
          </li>

          <li className={styles.contactItem}>
            <ContactCircle>
              <PhoneIcon />
            </ContactCircle>
            {phone ? (
              <a href={`tel:${phone}`} target="_blank" className={styles.contactsLabel}>
                {phone}
              </a>
            ) : (
              <p className={styles.contactsLabel}>Телефон</p>
            )}
          </li>

          <li className={styles.contactItem}>
            <ContactCircle>
              <EmailIcon />
            </ContactCircle>
            {email ? (
              <a href={`mailto:${email}`} target="_blank" className={styles.contactsLabel}>
                {email}
              </a>
            ) : (
              <p className={styles.contactsLabel}>Email</p>
            )}
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
