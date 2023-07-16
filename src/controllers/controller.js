import * as yup from 'yup';
import view from '../view.js';
import rssCheckController from './rssCheckController.js';
import handlerModal from './handlerModal.js';

export default (i18n, state, elements) => {
  const watcher = view(i18n, state, elements);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(elements.form);
    const url = formData.get('url');

    try {
      if (url === '') throw new Error('errorFieldEmpty');
    } catch (err) {
      const form = {
        isValid: false,
        error: err.message,
      };
      watcher.form = form;
      return;
    }

    const schema = yup
      .string()
      .notOneOf(state.links, 'errorExist')
      .url('errorNoValid');

    schema.validate(url)
      .then((result) => {
        rssCheckController(result, state, watcher);

        handlerModal(state, elements, watcher);
      })
      .catch((err) => {
        const form = {
          isValid: false,
          error: err.message,
        };
        watcher.form = form;
      });
  });
};
