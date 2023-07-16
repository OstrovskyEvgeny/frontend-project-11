import onChange from 'on-change';
import { generateContent, generateFeedsList, generatePostsList } from './generateDOM.js';

export default (i18n, state, elements) => {
  const watcher = onChange(state, (path, value) => {
    const inputUrlEl = elements.form.elements.url;
    const feedbackPEl = elements.feedback;

    if (path === 'form') {
      const { isValid, error } = value;
      if (isValid) {
        inputUrlEl.classList.remove('is-invalid');
        inputUrlEl.value = '';
        inputUrlEl.focus();

        feedbackPEl.classList.remove('text-danger');
        feedbackPEl.classList.add('text-success');
        feedbackPEl.textContent = i18n.t('success');
      } else {
        inputUrlEl.classList.add('is-invalid');

        feedbackPEl.classList.add('text-danger');
        feedbackPEl.classList.remove('text-success');
        feedbackPEl.textContent = i18n.t(error);
      }
    }

    if (path === 'content') {
      const feedsContainerEl = elements.feeds;
      const postsContainerEl = elements.posts;

      const feedsListElColl = generateFeedsList(value.feeds);
      const postsListElColl = generatePostsList(value.posts, i18n);

      const feedsContent = generateContent(i18n.t('titleFeed'), feedsListElColl);
      const postsContent = generateContent(i18n.t('titlePost'), postsListElColl);

      feedsContainerEl.replaceChildren(feedsContent);
      postsContainerEl.replaceChildren(postsContent);
    }

    if (path === 'modalActive') {
      const { post, visitedLinkEl } = value;
      const { title, description, link } = post;
      const { modalTitle, modalBody, modalFooterLink } = elements.modal;

      modalTitle.textContent = title;
      modalBody.textContent = description;
      modalFooterLink.setAttribute('href', link);

      visitedLinkEl.classList.remove('fw-bold');
      visitedLinkEl.classList.add('link-secondary', 'fw-normal');
    }
  });

  return watcher;
};
