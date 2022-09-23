import { border } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/GridItem.module.css';

export default function GridItem(props) {
  return (
    <div className={styles.gridCard}>
      <Link
        to={`/articles/${props.article_id}`}
        className={styles.articleLink}
        style={{ textDecoration: 'none' }}
      >
        <div className={styles.articleImage}>
          <img src={props.image} className={styles.coverImage} />
        </div>
        <div className={styles.articleAbout}>
          <div className={styles.articleInfo}>
            <div
              className={styles.articleTopic}
              style={{
                backgroundColor: '#c9184a',
              }}
            >
              <p className={styles.paragraph}>{props.slug}</p>
            </div>
            <div className={styles.articleDate}>
              <p className={styles.paragraphDate}>{props.date}</p>
            </div>
          </div>
          <p className={styles.postTitle}>{props.title}</p>
        </div>
      </Link>
    </div>
  );
}
