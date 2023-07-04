import * as yup from 'yup';
import view from './view.js';

export default (i18n, state, elements) => {
  const watcher = view(i18n, state, elements);

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
        watcher.form.error = 'success';
        watcher.links.push(result);
        watcher.form.isValid = true;
      })
      .catch((err) => {
        watcher.form.error = err.message;
        watcher.form.isValid = false;
      });
  });
};
