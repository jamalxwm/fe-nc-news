import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Page404.module.css';
import logo from '../../assets/images/PapersLogoDark.png';

export default function Page404() {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.paddingInner}>
          <div className={styles.headerFlex}>
            <div className={styles.headerTitleColumn}>
              <Link className={styles.link404}>
                <img src={logo} className={styles.logo404} alt='papers logo' />
              </Link>
              <h1 className={`${styles.heading} ${styles.headingExtraLarge}`}>
                This page is missing
              </h1>
              <p className={styles.paragraph404}>
                The page was probably lost somewhere. But you can find more
                exciting things on the homepage.
              </p>
              <Link className={styles.button}>Homepage</Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.blurBG}></div>
    </div>
  );
}
