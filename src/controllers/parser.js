import uniqueId from 'lodash/uniqueId.js';

export default (rssEl) => {
  const titleFeedEl = rssEl.querySelector('channel > title');
  const descriptionFeedEl = rssEl.querySelector('channel > description');
  const idFeed = uniqueId();

  const newFeed = {
    idFeed,
    title: titleFeedEl.textContent,
    description: descriptionFeedEl.textContent,
  };

  const itemsEl = rssEl.querySelectorAll('channel > item');

  const newPosts = [...itemsEl].map((itemEl) => {
    const titleEl = itemEl.querySelector('title');
    const linkEl = itemEl.querySelector('link');
    const descriptionEl = itemEl.querySelector('description');
    const pubDateEl = itemEl.querySelector('pubDate');
    const date = new Date(pubDateEl.textContent);

    return {
      vived: false,
      idFeed,
      idPost: uniqueId(),
      title: titleEl.textContent,
      link: linkEl.textContent,
      description: descriptionEl.textContent,
      date,
    };
  }).sort((a, b) => b.date - a.date);

  return { newFeed, newPosts };
};
