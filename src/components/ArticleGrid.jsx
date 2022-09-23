import React, { useEffect, useState } from 'react';
import GridItem from './GridItem';
import styles from '../styles/ArticleGrid.module.css';
import { useParams, Link } from 'react-router-dom';
import { fetchArticles } from '../utils/api';
import dayjs from 'dayjs';

export default function ArticleGrid() {
  const [articles, setArticles] = useState([]);
  const [orderBy, setOrderBy] = useState('DESC');
  const [sortBy, setSortBy] = useState('created_at');
  const { slug } = useParams();

  useEffect(() => {
    fetchArticles(sortBy, orderBy, slug).then((articleItems) => {
      console.log(articleItems);
      setArticles(articleItems);
    });
  }, [sortBy, orderBy, slug]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading__medium}>Latest Articles</h1>
      <div className={[styles.grid, styles.gridBorder]}>
        <ul>
          {articles.map((article) => (
            <li key={article.article_id}>
              <div>
                <GridItem
                  title={article.title}
                  image="https://source.unsplash.com/random"
                  slug={article.topic}
                  date={dayjs(article.created_at).format('MMM D, YYYY')}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
