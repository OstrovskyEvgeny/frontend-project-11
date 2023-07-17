import axios from 'axios';
import parser from './parser.js';

const newPostsCheck = (proxyUrl, state, watcher) => {
  axios.get(proxyUrl)
    .then((response) => {
      const { data } = response;
      const domParser = new DOMParser();
      const rssEl = domParser.parseFromString(data.contents, 'application/xml');
      const { newFeed, newPosts } = parser(rssEl);

      const { idFeed } = state.content.feeds
        .find(({ title }) => title === newFeed.title);

      const newlyAddedPosts = newPosts
        .filter(({ title }) => !state.content.posts.some((post) => post.title === title));

      if (newlyAddedPosts.length === 0) {
        setTimeout(() => newPostsCheck(proxyUrl, state, watcher), 5000);
        return;
      }

      newlyAddedPosts.map((post) => {
        const postObjLink = post;
        postObjLink.idFeed = idFeed;
        return postObjLink;
      });

      const content = {
        feeds: state.content.feeds,
        posts: [...state.content.posts, ...newlyAddedPosts].sort((a, b) => b.date - a.date),
      };

      const watchedState = watcher;
      watchedState.content = content;

      setTimeout(() => newPostsCheck(proxyUrl, state, watchedState), 5000);
    })
    .catch((e) => {
      console.log('Ошибка сети при обновлении постов', e);
      newPostsCheck(proxyUrl, state, watcher);
    });
};

export default newPostsCheck;
