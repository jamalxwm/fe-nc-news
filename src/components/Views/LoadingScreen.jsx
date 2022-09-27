import React from 'react';
import styles from '../../styles/LoadingScreen.module.css';

export default function LoadingScreen() {
 
  return (
    <div
      className={styles.container}
    >
      <p className={styles.paragraph}>Loading</p>
      <div
        className={styles.blurBG}
      />
    </div>
  );
}
