import React from "react";
import styles from "./Footer.module.scss";
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
import defaultLogo from "../../assets/no-photo-available.svg";
import LogoImage from "../LogoImage/LogoImage";

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

const Footer = ({ logoIm, adress, phonenumber, gmail }) => {

  const displayLogo = logoIm || defaultLogo;
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.logoSocial}>
          <div>
            <LogoImage logoIm={logoIm} textColor="#fff" />
          </div>
          <div className={styles.social}>
            {/* <div className={styles.socialIcon}> */}
              <SocialIcon component="a" href="https://instagram.com" target="_blank" aria-label="Instagram">
                <InstagramIcon fontSize="small" />
              </SocialIcon>
            {/* </div>
            <div className={styles.socialIcon}> */}
              <SocialIcon component="a" href="https://facebook.com" target="_blank" aria-label="Facebook">
                <FacebookIcon fontSize="small" />
              </SocialIcon>
            {/* </div>
            <div className={styles.socialIcon}> */}
              <SocialIcon component="a" href="https://x.com" target="_blank" aria-label="X">
                <XIcon fontSize="small" />
              </SocialIcon>
            {/* </div> */}
          </div>
        </div>

        <div className={styles.linksPrivacyPolicy}>
          <div className={styles.linksFooter}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
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
               {adress ? (
                <p className={styles.contactsLabel}>{adress}</p>
              ) : (
                <p className={styles.contactsLabel}>Адреса</p>
              )}
          </li>

          <li className={styles.contactItem}>
            <ContactCircle>
              <PhoneIcon />
            </ContactCircle>
              {phonenumber ? (
                <a href={`tel:${phonenumber}`} target="blank" className={styles.contactsLabel}>
                  {phonenumber}
                </a>
              ) : (
                <p className={styles.contactsLabel}>Телефон</p>
              )}
          </li>

          <li className={styles.contactItem}>
            <ContactCircle>
              <EmailIcon />
            </ContactCircle>
              {gmail ? (
                <a href={`mailto:${gmail}`} target="blank" className={styles.contactsLabel}>
                  {gmail}
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
