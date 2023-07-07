import axios from 'axios';
import uniqueId from 'lodash/uniqueId.js';

const getRssDataNormalized = (xml) => {
  const parser = new DOMParser();
  const rssContentEl = parser.parseFromString(xml, 'application/xml');
  const titleFeedEl = rssContentEl.querySelector('channel > title');
  const descriptionFeedEl = rssContentEl.querySelector('channel > description');
  const idFeed = uniqueId();
  const newFeed = {
    idFeed,
    title: titleFeedEl.textContent,
    description: descriptionFeedEl.textContent,
  };
  const itemsEl = rssContentEl.querySelectorAll('channel > item');
  const newPosts = [...itemsEl].map((itemEl) => {
    const titleEl = itemEl.querySelector('title');
    const linkEl = itemEl.querySelector('link');
    const descriptionEl = itemEl.querySelector('description');
    const idPost = uniqueId();
    return {
      idPost,
      title: titleEl.textContent,
      link: linkEl.textContent,
      description: descriptionEl.textContent,
    };
  });

  return { newFeed, newPosts };
};

export default (url, state, watchedState) => {
  const watcher = watchedState;
  axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then((response) => {
      const { data } = response;
      const { newFeed, newPosts } = getRssDataNormalized(data.contents);
      const oldFeeds = state.content.feeds;
      const oldPosts = state.content.posts;
      const content = {
        feeds: [...oldFeeds, newFeed],
        posts: [...oldPosts, ...newPosts],
      };
      const form = {
        isValid: true,
        error: '',
      };
      state.links.push(url);
      watcher.form = form;
      watcher.content = content;
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
      console.log(error.config);
    });
};
