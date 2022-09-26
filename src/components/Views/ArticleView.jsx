import { fetchArticleByID, patchVotes, fetchUser } from '../../utils/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { IconButton } from '@material-ui/core';
import { Favorite, ModeComment, FavoriteBorder } from '@mui/icons-material';
import CommentList from '../CommentList';
import styles from '../../styles/ArticleView.module.css';
import dayjs from 'dayjs';
import { UserContext } from '../../contexts/user';

export default function ArticleView() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState();
  const [votes, setVotes] = useState(0);
  const [viewer, setViewer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    fetchArticleByID(article_id)
      .then((article) => {
        setArticle(article[0]);
        return article[0];
      })
      .then((article) => {
        return fetchUser(article.author);
      })
      .then((user) => {
        setAuthor(user);
        setIsLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    fetchUser(loggedInUser).then((user) => {
      setViewer(user);
    });
  }, [loggedInUser]);

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

  if (isLoading)
    return (
      <div>
        <p>Loading</p>
      </div>
    );

  return (
    <div>
      <div className={styles.breadcrumbRight}>
        <div className={styles.breadcrumbAbout}>
          <p className={styles.breadcrumbParagraph}>
            {dayjs(article.created_at).format('DD MMM YYYY')}
          </p>
        </div>
      </div>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.articleHeader}>
            <h1
              className={`${styles.heading} ${styles.heading__extraLarge} ${styles.center}`}
            >
              {article.title}
            </h1>
            <div
              className={`${styles.flex} ${styles.alignCenter} ${styles.justifyCenter} ${styles.mobWrap}`}
            >
              <div
                className={`${styles.flex}  ${styles.alignCenter}  ${styles.flexMargins1em}`}
              >
                <img src={author.avatar_url} className={styles.authorImage} />
                <p>{author.name}</p>
              </div>
              <div
                className={`${styles.flex}  ${styles.alignCenter}  ${styles.flexMargins1em}`}
              >
                {!votes ? (
                  <FavoriteBorder
                    sx={{ fontSize: styles.p, color: '#191c1f' }}
                    style={{ marginRight: '.5em' }}
                  />
                ) : (
                  <Favorite
                    sx={{ fontSize: styles.p, color: '#c9184a' }}
                    style={{ marginRight: '.5em' }}
                  />
                )}
                <p>{article.votes + votes}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.articlePageImageWrap}>
          <div className={styles.article2ImageWrap}>
            <div className={styles.headerImageinArticlePage}>
              <img
                src="https://source.unsplash.com/random"
                className={styles.headerArticleImage}
              />
            </div>
            <p className={styles.articleBigImageTitle}>{article.topic}</p>
          </div>
        </div>
      </header>
      <section className={styles.section}>
        <div className={`${styles.paddingInner} ${styles.paddingTop}`}>
          <div className={styles.container}>
            <div className={`${styles.articleSize} ${styles.marginBottom5em}`}>
              <div className={styles.richText}>
                <p className={styles.body}>{article.body}</p>
              </div>
            </div>
            <div className={styles.bottomWrapper}>
              <h2>{`Enjoying this article ${viewer.name}?`}</h2>
            </div>
            <div
              className={`${styles.flex} ${styles.flexMargins1em} ${styles.alignCenter} ${styles.mobWrap}`}
            >
              <div
                className={`${styles.flex}  ${styles.alignCenter}  ${styles.flexMargins1em}`}
              >
                <IconButton aria-label="like" onClick={incrementVotes}>
                  {!votes ? (
                    <FavoriteBorder
                      sx={{ fontSize: styles.p, color: '#191c1f' }}
                      style={{ marginRight: '.5em' }}
                    />
                  ) : (
                    <Favorite
                      sx={{ fontSize: styles.p, color: '#c9184a' }}
                      style={{ marginRight: '.5em' }}
                    />
                  )}
                </IconButton>
                <p>{article.votes + votes}</p>
              </div>
              <div
                className={`${styles.flex}  ${styles.alignCenter}  ${styles.flexMargins1em}`}
              >
                <ModeComment
                  sx={{ fontSize: styles.p, color: '#191c1f' }}
                  style={{ marginRight: '.5em' }}
                />
                <p>{article.comment_count}</p>
              </div>
            </div>
          </div>
          <CommentList articleAuthor={author.username} articleID={article_id}/>
        </div>
      </section>
    </div>
  );
}
