const axios = require('axios');

export const fetchArticles = (slug) => {
  const topicQuery = slug ? `?topic=${slug}` : ``;
  const query = `https://be-nc-news-jwm.herokuapp.com/api/articles${topicQuery}`;
  return axios.get(query).then((res) => {
    return res.data.articles;
  });
};

export const fetchTopics = () => {
  const query = `https://be-nc-news-jwm.herokuapp.com/api/topics`;
  return axios.get(query).then((res) => res.data.topics);
};
