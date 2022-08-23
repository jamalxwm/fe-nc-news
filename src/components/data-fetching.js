const axios = require('axios');

export const fetchArticles = () => {
    const query = `https://be-nc-news-jwm.herokuapp.com/api/articles`;
    return axios.get(query).then((res) => {
      return res.data.articles;
    });
  };