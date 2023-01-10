const axios = require('axios');

export const fetchArticles = (sort_by, order, slug) => {
  const topicQuery = slug ? `?topic=${slug}` : ``;
  const query = `https://papersjxwm.cyclic.app/api/articles${topicQuery}`;
  return axios.get(query, { params: { sort_by, order } }).then((res) => {
    console.log();
    return res.data.articles;
  });
};

export const fetchTopics = () => {
  const query = `https://papersjxwm.cyclic.app/api/topics`;
  return axios.get(query).then((res) => res.data.topics);
};

export const fetchArticleByID = (id) => {
  const query = `https://papersjxwm.cyclic.app/api/articles/${id}`;
  return axios.get(query).then((res) => res.data.article);
};

export const patchVotes = (id, incOrDec) => {
  const query = `https://papersjxwm.cyclic.app/api/articles/${id}`;
  return axios
    .patch(query, { inc_votes: incOrDec })
    .then((res) => res.data.article);
};

export const fetchCommentsByArticle = (id) => {
  const query = `https://papersjxwm.cyclic.app/api/articles/${id}/comments`;
  return axios.get(query).then((res) => res.data.comments);
};

export const postCommentByArticle = (id, username, body) => {
  const query = `https://papersjxwm.cyclic.app/api/articles/${id}/comments`;
  return axios
    .post(query, { username, body })
    .then((res) => res.data.comments)
};

export const fetchUsers = () => {
  const query = `https://papersjxwm.cyclic.app/api/users`;
  return axios.get(query).then((res) => res.data.users);
};

export const fetchUser = (username) => {
  const query = `https://papersjxwm.cyclic.app/api/users/${username}`;
  return axios.get(query).then((res) => res.data.user);
};

export const deleteCommentByID = (id) => {
  const query = `https://papersjxwm.cyclic.app/api/comments/${id}`;
  return axios.delete(query).then((res) => res.status);
};
