import React, { useEffect, useState } from 'react';
import GridItem from '../GridItem';
import styles from '../../styles/ArticleGrid.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchArticles, fetchUsers } from '../../utils/api';
import dayjs from 'dayjs';
import Nav from '../Nav';
import SelectMenus from '../SelectMenus';
import { FormControl, Select, MenuItem } from '@mui/material';
import HomeHero from '../HomeHero';

export default function ArticleGrid() {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [orderBy, setOrderBy] = useState('DESC');
  const [sortBy, setSortBy] = useState('created_at');
  const topic = slug || 'all';
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles(sortBy, orderBy, slug).then((articleItems) => {
      setArticles(articleItems);
    });
  }, [sortBy, orderBy, slug]);

  useEffect(() => {
    fetchUsers().then((userItems) => {
      setUsers(userItems);
    });
  }, []);

  const handleOrderChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleTopicChange = (event) => {
    if (event.target.value === 'all') {
      navigate('/');
    } else {
      navigate(`/topic/${event.target.value}`);
    }
  };

  const userInfo = (author) => {
    return users.find((user) => user.username === author);
  };

  return (
    <div>
      <Nav />
      <HomeHero />
      <div className={styles.container}>
        <div className={styles.paddingInner}>
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120, margin: 0 }}
          >
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={topic}
              onChange={handleTopicChange}
              label="Filter topic"
              aria-label="filter topic"
              disableUnderline
              className={styles.heading__medium}
              sx={{
                fontFamily: 'Manrope',
                fontWeight: 600,
                letterSpacing: '-.0125em',
                fontSize: '1.8rem',
              }}
            >
              <MenuItem value={'all'}>All articles</MenuItem>
              <MenuItem value={'cooking'}>Cooking articles</MenuItem>
              <MenuItem value={'football'}>Football articles</MenuItem>
              <MenuItem value={'coding'}>Coding articles</MenuItem>
            </Select>
          </FormControl>
          <div className={`${styles.grid}, ${styles.gridBorder}`}>
            <div className={styles.tabsMenu}>
              <SelectMenus
                orderBy={orderBy}
                sortBy={sortBy}
                handleOrderChange={handleOrderChange}
                handleSortChange={handleSortChange}
              />
            </div>
            <ul>
              {articles.map((article) => (
                <li key={article.article_id}>
                  <GridItem
                    articleID={article.article_id}
                    title={article.title}
                    image={`https://source.unsplash.com/random?${article.topic},${article.article_id}`}
                    slug={article.topic}
                    date={dayjs(article.created_at).format('MMM D, YYYY')}
                    avatarUrl={userInfo(article.author).avatar_url}
                    authorName={userInfo(article.author).name}
                    votes={article.votes}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
