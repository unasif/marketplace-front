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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faYoutube, faTiktok } from "@fortawesome/free-brands-svg-icons";

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


const Footer = ({ logo, adress, phonenumber, gmail, logoIm }) => {
  const baseInfo = useBaseInfo();
  const info = Array.isArray(baseInfo) ? baseInfo[0] || {} : baseInfo || {};

  const address = info.adress || adress || "";
  const phone = info.phone || phonenumber || "";
  const email = info.email || gmail || "";
  const displayLogo = info.logo || logo || logoIm || defaultLogo;

  // Social links (lowercase keys expected). If link provided without protocol, prepend https://, otherwise fall back to standard pages.
  const instagramLink = info.instagram ? (info.instagram.startsWith("http") ? info.instagram : `https://${info.instagram}`) : "https://instagram.com";
  const facebookLink = info.facebook ? (info.facebook.startsWith("http") ? info.facebook : `https://${info.facebook}`) : "https://facebook.com";
  const xLink = info.x ? (info.x.startsWith("http") ? info.x : `https://${info.x}`) : "https://x.com";
  const telegramLink = info.telegram ? (info.telegram.startsWith("http") ? info.telegram : `https://${info.telegram}`) : "https://t.me/your_channel";
  const youtubeLink = info.youtube ? (info.youtube.startsWith("http") ? info.youtube : `https://${info.youtube}`) : "https://youtube.com";
  const tiktokLink = info.tiktok ? (info.tiktok.startsWith("http") ? info.tiktok : `https://${info.tiktok}`) : "https://tiktok.com";

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.logoSocial}>
          <div>
            <LogoImage logoIm={displayLogo} textColor="#fff" />
          </div>
          <div className={styles.social}>
              <SocialIcon component="a" href={instagramLink} target="_blank" aria-label="Instagram">
                <InstagramIcon fontSize="small" />
              </SocialIcon>
              <SocialIcon component="a" href={facebookLink} target="_blank" aria-label="Facebook">
                <FacebookIcon fontSize="small" />
              </SocialIcon>
              <SocialIcon component="a" href={xLink} target="_blank" aria-label="X">
                <XIcon fontSize="small" />
              </SocialIcon>
              <SocialIcon component="a" href={telegramLink} target="_blank" aria-label="Telegram">
                <FontAwesomeIcon icon={faTelegram} style={{ fontSize: '18px' }} />
              </SocialIcon>
              <SocialIcon component="a" href={youtubeLink} target="_blank" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} style={{ fontSize: '18px' }} />
              </SocialIcon>
              <SocialIcon component="a" href={tiktokLink} target="_blank" aria-label="TikTok">
                <FontAwesomeIcon icon={faTiktok} style={{ fontSize: '18px' }} />
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
              <p className={styles.contactsLabel}>{phone}</p>
            ) : (
              <p className={styles.contactsLabel}>Телефон</p>
            )}
          </li>

          <li className={styles.contactItem}>
            <ContactCircle>
              <EmailIcon />
            </ContactCircle>
            {email ? (
              <p className={styles.contactsLabel}>{email}</p>
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
