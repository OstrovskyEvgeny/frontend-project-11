import uniqueId from 'lodash/uniqueId.js';

export default (xml) => {
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
    const pubDateEl = itemEl.querySelector('pubDate');
    const date = new Date(pubDateEl.textContent);
    return {
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
