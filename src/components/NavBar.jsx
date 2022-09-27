import React from 'react';
import styles from '../styles/NavBar.module.css';
import Logo from '../assets/images/PapersLogoLight.png';
import { Link } from 'react-router-dom';
export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.nav__inner}>
          <Link to="/">
            <img src={Logo} className={styles.navLogo} />
          </Link>
        </div>
      </div>
    </div>
  );
}
