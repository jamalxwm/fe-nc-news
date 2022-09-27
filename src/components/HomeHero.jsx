import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/HomeHero.module.css';
import { fetchArticleByID, fetchUser } from '../utils/api';
import dayjs from 'dayjs';

export default function HomeHero() {
  const [article, setArticle] = useState({});
  const [authorDetails, setAuthorDetails] = useState({});

  useEffect(() => {
    fetchArticleByID(29)
      .then((article) => {
        setArticle(article[0]);
        return article[0];
      })
      .then((article) => {
        return fetchUser(article.author);
      })
      .then((user) => {
        setAuthorDetails(user);
       
      });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.hero}>
        <div className={styles.heroList}>
          <div className={styles.heroItem}>
            <div className={styles.overflowHidden}>
              <div className={styles.container}>
                <div className={styles.paddingInner}>
                  <div className={styles.headerFlex}>
                    <div
                      className={`${styles.headerTitleColumn} ${styles.maxWidthHero}`}
                    >
                      <div className={styles.articleAuthor}>
                        <img
                          src={authorDetails.avatar_url}
                          className={styles.authorImage}
                          alt={authorDetails.name}
                        />
                        <p className={styles.paragraph}>{authorDetails.name}</p>
                      </div>
                      <Link
                        to={`/articles/${article.article_id}`}
                        className={`${styles.postTitle} ${styles.extraLarge} ${styles.white} ${styles.marginBottom075em}`}
                      >
                        {article.title}
                      </Link>
                      <div className={styles.articleInformations}>
                        <div
                          style={{ backgroundColor: '#a4133c' }}
                          className={`${styles.topicColor} ${styles.marginRight2em}`}
                        >
                          <p className={`${styles.paragraph} ${styles.small}`}>
                            Featured
                          </p>
                        </div>
                        <div
                          style={{ backgroundColor: '#0c33c5' }}
                          className={`${styles.topicColor} ${styles.marginRight2em}`}
                        >
                          <p className={`${styles.paragraph} ${styles.small}`}>
                            {article.topic}
                          </p>
                        </div>
                        <div
                          className={`${styles.articleInfo} ${styles.marginRight2em}`}
                        >
                          <p className={`${styles.paragraph} ${styles.small}`}>
                            {dayjs(article.created_at).format('DD MMM YYYY')}
                          </p>
                        </div>
                        <div className={styles.articleInfo}>
                          <p className={`${styles.paragraph} ${styles.small}`}>
                            {`${article.votes} votes`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.headerImagesColumn}>
                      <div className={styles.headerImagesWrap}>
                        <img
                          src={`https://source.unsplash.com/random/?${article.topic}`}
                          className={`${styles.heroImage} ${styles.is1st} ${styles._24width}`}
                        />
                        <img
                          src={`https://source.unsplash.com/random/?${article.topic}`}
                          className={`${styles.heroImage} ${styles.is1st} ${styles._24width}`}
                        />
                        <img
                          src={`https://source.unsplash.com/random/?${article.topic}`}
                          className={`${styles.heroImage} ${styles.is1st} ${styles._24width}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.blurBG} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
