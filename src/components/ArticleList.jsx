import { useEffect, useState } from 'react';
import { fetchArticles } from '../utils/api';
import {
  CssBaseline,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Container,
} from '@material-ui/core';
import { Typography } from '@mui/material';
import useStyles from '../styles';
import { useParams, Link } from 'react-router-dom';
import NavBar from './NavBar';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [orderBy, setOrderBy] = useState('DESC');
  const [sortBy, setSortBy] = useState('created_at');
  const { slug } = useParams();
  const classes = useStyles();

  useEffect(() => {
    fetchArticles(sortBy, orderBy, slug).then((articleItems) => {
      setArticles(articleItems);
    });
  }, [sortBy, orderBy, slug]);

  return (
    <>
      {/* <NavBar setOrderBy={setOrderBy} setSortBy={setSortBy} /> */}
      <CssBaseline />
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {articles.map((article) => (
            <Grid item key={article.article_id} xs={12} sm={6} md={4}>
              <Link to={`/articles/${article.article_id}`}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title={article.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                      {article.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
