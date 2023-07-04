import onChange from 'on-change';

export default (state, elements) => {
  const watcher = onChange(state, (path, value, previousValue) => {
    console.log(state);
    if (value !== previousValue) {
      if (path === 'form.isValid') {
        const inputUrlEl = elements.form.elements.url;
        if (value) {
          inputUrlEl.classList.remove('is-invalid');
        } else {
          inputUrlEl.classList.add('is-invalid');
        }
      }
    }
  });

  return watcher;
};
