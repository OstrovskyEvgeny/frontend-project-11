import axios from 'axios';
import parser from './parser.js';
import newPostsCheck from './newPostsCheckController.js';

const getProxyUrl = (url) => `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;

export default (url, state, watcher) => {
  const watchedState = watcher;
  const proxyUrl = getProxyUrl(url);

  axios.get(proxyUrl)
    .then((response) => {
      const { data } = response;
      const domParser = new DOMParser();
      const rssEl = domParser.parseFromString(data.contents, 'application/xml');

      const parserError = rssEl.querySelector('parsererror');
      if (parserError) throw new Error('the resource does not contain rss');

      const { newFeed, newPosts } = parser(rssEl);
      const oldFeeds = state.content.feeds;
      const oldPosts = state.content.posts;

      const content = {
        feeds: [newFeed, ...oldFeeds],
        posts: [...newPosts, ...oldPosts].sort((a, b) => b.date - a.date),
      };

      watchedState.flowAdditionProcess.addedLinks.push(url);
      watchedState.content = content;
      watchedState.flowAdditionProcess.error = '';
      watchedState.flowAdditionProcess.state = 'finished';

      setTimeout(() => newPostsCheck(proxyUrl, state, watcher), 5000);
    })
    .catch((error) => {
      if (error.message === 'the resource does not contain rss') {
        watchedState.flowAdditionProcess.error = 'errorNoRss';
        watchedState.flowAdditionProcess.state = 'failed';
      }
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        watchedState.flowAdditionProcess.error = 'errorNetwork'; // ОШИБКА СЕТИ
        watchedState.flowAdditionProcess.state = 'failed';

        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        watchedState.flowAdditionProcess.error = 'errorNetwork'; // ОШИБКА СЕТИ
        watchedState.flowAdditionProcess.state = 'failed';

        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });
};
