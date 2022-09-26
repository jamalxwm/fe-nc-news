import { border } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/GridItem.module.css';
import { ThumbUp } from '@mui/icons-material';

export default function GridItem(props) {
  const chipColors = {
    coding: '#c9184a',
    cooking: '#0c33c5',
    football: '#722595',
  };

  return (
    <div className={styles.gridCard}>
      <Link
        to={`/articles/${props.articleID}`}
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
                backgroundColor: chipColors[props.slug],
              }}
            >
              <p className={styles.paragraph}>{props.slug}</p>
            </div>
            <div className={styles.articleDate}>
              <p className={styles.paragraph__extraSmall}>{props.date}</p>
            </div>
            <div className={styles.articleVotes}>
              <ThumbUp
                sx={{ fontSize: '1em', color: '#191c1f' }}
                style={{ marginRight: '.5em' }}
              />
              <p className={styles.paragraph__extraSmall}>{props.votes}</p>
            </div>
          </div>
          <p className={styles.postTitle}>{props.title}</p>
          <div className={styles.articleAuthor}>
            <img
              src={props.avatarUrl}
              alt={props.authorName}
              className={styles.authorImage}
            />
            <p className={styles.paragraph__extraSmall}>{props.authorName}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}