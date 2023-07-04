import onChange from 'on-change';

export default (i18n, state, elements) => {
  const watcher = onChange(state, (path, value) => {
    const inputUrlEl = elements.form.elements.url;
    const feedbackPEl = elements.feedback;

    if (path === 'form.isValid') {
      if (value) {
        inputUrlEl.classList.remove('is-invalid');
        feedbackPEl.classList.remove('text-danger');
        feedbackPEl.classList.add('text-success');
        feedbackPEl.textContent = i18n.t('success');
      } else {
        inputUrlEl.classList.add('is-invalid');
        feedbackPEl.classList.add('text-danger');
        feedbackPEl.classList.remove('text-success');
        feedbackPEl.textContent = i18n.t(state.form.error);
      }
      return;
    }
    if (path === 'form.error') {
      feedbackPEl.textContent = i18n.t(state.form.error);
    }
  });

  return watcher;
};
