import { fetchArticleByID, patchVotes } from '../utils/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { IconButton } from '@material-ui/core';
import { ThumbUp } from '@mui/icons-material';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import styles from '../styles/ArticleView.module.css';
import dayjs from 'dayjs';

export default function ArticleView() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    fetchArticleByID(article_id).then((article) => {
      setArticle(article[0]);
    });
  }, [article_id]);

  const incrementVotes = () => {
    let incOrDec = 1;
    if (votes === 1) incOrDec = -1;

    setVotes((currVotes) => {
      return currVotes + incOrDec;
    });
    patchVotes(article.article_id, incOrDec).catch(() => {
      setVotes((currVotes) => {
        return currVotes - incOrDec;
      });
    });
  };

  return (
    <div>
      <div className={styles.breadcrumbRight}>
        <div className={styles.breadcrumbAbout}>
          <p className={styles.breadcrumbParagraph}>
            {dayjs(article.created_at).format('MMM D, YYYY')}
          </p>
        </div>
      </div>
      <header className={styles.header}>
        <div className={styles.container}>
          <div classname={styles.articleHeader}>
            <h1
              classname={`${styles.heading}
                ${styles.heading__extraLarge}
                ${styles.center}
              `}
            >
              {article.title}
            </h1>
            <div
              className={
                styles.flex +
                styles.alignCenter +
                styles.justifyCenter +
                styles.mobWrap
              }
            >
              <div
                className={
                  styles.flex + styles.alignCenter + styles.flexMargins1em
                }
              >
                <img src={null} className={styles.authorImage} />
                <p>{article.author}</p>
              </div>
              <div
                className={
                  styles.flex + styles.alignCenter + styles.flexMargins1em
                }
              >
                <p>{article.votes + votes}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.articlePageImageWrap}>
          <div className={styles.article2ImageWrap}>
            <div className={styles.headerImage + styles.inArticlePage}>
              <img
                src="https://source.unsplash.com/random"
                className={styles.headerArticleImage}
              />
            </div>
          </div>
        </div>
      </header>
      <section className={styles.section}>
        <div classNamme={[styles.paddingInner, styles.paddingTop]}>
          <div className={styles.container}>
            <div className={styles.articleSize}>
              <div className={styles.richText}>
                <h2>{article.title}</h2>
                <p>{article.body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <IconButton aria-label="like" onClick={incrementVotes}>
        <ThumbUp />
      </IconButton>
      <Typography variant="h6">Comments: {article.comment_count}</Typography>
      <CommentList />
    </div>
  );
}
