import onChange from 'on-change';
import { generateContent, generateFeedsList, generatePostsList } from './generateDOM.js';

export default (i18n, state, elements) => {
  const watcher = onChange(state, (path, value) => {
    if (path === 'flowAdditionProcess.state') {
      const inputUrlEl = elements.form.formEl.elements.url;
      const feedbackPEl = elements.form.feedback;

      if (value === 'sending') {
        elements.form.submitBtn.setAttribute('disabled', 'disabled');
      }
      if (value === 'failed') {
        feedbackPEl.classList.remove('text-success');
        feedbackPEl.classList.add('text-danger');
        inputUrlEl.classList.add('is-invalid');
        feedbackPEl.textContent = i18n.t(state.flowAdditionProcess.error);
        elements.form.submitBtn.removeAttribute('disabled');
      }
      if (value === 'finished') {
        inputUrlEl.classList.remove('is-invalid');
        inputUrlEl.value = '';
        inputUrlEl.focus();
        feedbackPEl.classList.remove('text-danger');
        feedbackPEl.classList.add('text-success');
        feedbackPEl.textContent = i18n.t('success');
        elements.form.submitBtn.removeAttribute('disabled');
      }
    }

    if (path === 'content') {
      const feedsContainerEl = elements.content.feeds;
      const postsContainerEl = elements.content.posts;

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
