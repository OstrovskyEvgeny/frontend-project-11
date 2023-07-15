import axios from 'axios';
import parser from '../parser.js';
import newPostsCheck from './newPostsCheckController.js';

const getProxyUrl = (url) => `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;

export default (url, state, watchedState) => {
  const watcher = watchedState;
  const proxyUrl = getProxyUrl(url);

  axios.get(proxyUrl)
    .then((response) => {
      const { data } = response;
      const { newFeed, newPosts } = parser(data.contents);
      const oldFeeds = state.content.feeds;
      const oldPosts = state.content.posts;

      const content = {
        feeds: [newFeed, ...oldFeeds],
        posts: [...newPosts, ...oldPosts].sort((a, b) => b.date - a.date),
      };
      const form = {
        isValid: true,
        error: '',
      };

      watcher.links.push(url);
      watcher.form = form;
      watcher.content = content;

      setTimeout(() => newPostsCheck(proxyUrl, state, watchedState), 5000);
    })
    .catch((error) => {
      const form = {
        isValue: false,
        error: 'errorNoRss',
      };
      watcher.form = form;

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      // console.log(error.config);
    });
};