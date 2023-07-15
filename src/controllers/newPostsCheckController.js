/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import axios from 'axios';
import parser from '../parser.js';

const newPostsCheck = (proxyUrl, state, watchedState) => {
  axios.get(proxyUrl)
    .then((response) => {
      const { data } = response;
      const { newFeed, newPosts } = parser(data.contents);

      const { idFeed } = state.content.feeds
        .find(({ title }) => title === newFeed.title);

      const newlyAddedPosts = newPosts
        .filter(({ title }) => !state.content.posts.some((post) => post.title === title));

      if (newlyAddedPosts.length === 0) {
        setTimeout(() => newPostsCheck(proxyUrl, state, watchedState), 5000);
        return;
      }

      newlyAddedPosts.map((post) => post.idFeed = idFeed);

      const content = {
        feeds: state.content.feeds,
        posts: [...state.content.posts, ...newlyAddedPosts],
      };

      const watcher = watchedState;
      watcher.content = content;

      setTimeout(() => newPostsCheck(proxyUrl, state, watchedState), 5000);
    })
    .catch((e) => {
      console.log('Ошибка get запроса для проверки обновления постов', e);
      newPostsCheck(proxyUrl, state, watchedState);
    });
};

export default newPostsCheck;
