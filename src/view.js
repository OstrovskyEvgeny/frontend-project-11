import onChange from 'on-change';

export default (state, elements) => {
  const watcher = onChange(state, (path, value, previousValue) => {
    if (value !== previousValue) {
      if (path === 'form.isValid') {
        const inputUrlEl = elements.form.elements.url;
        if (value === false) {
          inputUrlEl.classList.add('is-invalid');
        }
        if (value === true) {
          inputUrlEl.classList.remove('is-invalid');
        }
      }
    }
  });

  return watcher;
};
