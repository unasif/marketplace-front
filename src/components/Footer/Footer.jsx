import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
// import logo2 from "../../assets/logo2.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faX,
  faLocation,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Footer = ({ logo }) => {
  return (
    <footer
      className={styles.footer}
      style={{ backgroundColor: secondaryColor }}
    >
      <footer className={styles.footer__container}>
        <div className={styles.logoSocial}>
          <div>
            <a href="/">
              <img src={logo || require('../../assets/logo2.svg')} alt="logo" />
            </a>
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
              <a href=" " target="blank">
                <span>
                  <FontAwesomeIcon icon={faLocation} />
                </span>
              </a>
            </div>

            <div className={styles.contactsLabel}>
              <a href=" " target="blank">
                <p>4517 Washington Ave. </p>
                <p>Manchester, Kentucky 39495</p>
              </a>
            </div>
          </div>

          <div className={styles.phones}>
            <div className={styles.contactsIcon}>
              <a href="tel:+2255550118" target="blank">
                <span>
                  <FontAwesomeIcon icon={faPhone} />
                </span>
              </a>
            </div>
            <div className={styles.contactsLabel}>
              <a href="tel:+2255550118" target="blank">
                <span>(225) 555-0118</span>
              </a>
            </div>
          </div>

          <div className={styles.email}>
            <div className={styles.contactsIcon}>
              <a href="email:manhhachkt08@gmail.com" target="blank">
                <span>
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </a>
            </div>
            <div className={styles.contactsLabel}>
              <a href="email:manhhachkt08@gmail.com" target="blank">
                <span> manhhachkt08@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </footer>
  );
};

export default Footer;
