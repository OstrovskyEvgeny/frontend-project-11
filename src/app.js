import * as yup from 'yup';
import view from './view.js';

export default (i18n) => {
  const state = {
    form: {
      isValid: null,
      message: '',
    },
    links: [],
  };
  const elements = {
    form: document.querySelector('.rss-form'),
  };

  const watcher = view(state, elements);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(elements.form);
    const url = formData.get('url');

    const schema = yup
      .string()
      .notOneOf(state.links, 'errorExist')
      .url('errorNoValid');

    schema.validate(url)
      .then((result) => {
        watcher.form.isValid = true;
        watcher.form.message = 'success';
        watcher.links.push(result);
      })
      .catch((error) => {
        watcher.form.isValid = false;
        watcher.form.message = error.message;
      });
  });
};
