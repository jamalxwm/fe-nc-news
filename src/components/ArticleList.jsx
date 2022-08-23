import { useEffect, useState } from 'react';
import { fetchArticles } from './data-fetching';
import { ThumbDown, ThumbUp } from '@mui/icons-material';
import {
  Button,
  CssBaseline,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Grid,
  Container,
} from '@material-ui/core';
import { Typography } from '@mui/material';
import useStyles from '../styles';
import { useParams } from 'react-router';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const {slug} = useParams();
  const classes = useStyles();

  useEffect(() => {
    fetchArticles(slug).then((articleItems) => {
      setArticles(articleItems);
    });
  }, [slug]);

  return (
    <>
      <CssBaseline />
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {articles.map((article) => (
            <Grid item key={article.article_id} xs={12} sm={6} md={4}>
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
                <CardActions>
                  <Button size="small" color="primary">
                    <ThumbUp />
                  </Button>
                  <Button size="small" color="primary">
                    <ThumbDown />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
