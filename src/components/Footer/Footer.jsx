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
              <a href="https://www.instagram.com/" target="blank">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
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
