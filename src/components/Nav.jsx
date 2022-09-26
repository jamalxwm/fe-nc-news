import React from 'react';
import styles from '../styles/Nav.module.css';
import menu from '../assets/icons/menu.svg';


export default function Nav() {
  return <div className={styles.navbar}>
    <div className={styles.navBurger.inNavBar2}>
      <img src={menu} className={styles.img.navIcon} />
    </div>
    <div className={styles.container}>
      <div className={styles.nav__inner}></div>
    </div>
  </div>;
}
