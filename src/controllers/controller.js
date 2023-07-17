import * as yup from 'yup';
import rssCheckController from './rssCheckController.js';
import handlerModal from './handlerModal.js';

export default (state, elements, watcher) => {
  const watchedState = watcher;

  elements.form.formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.flowAdditionProcess.state = 'sending';

    const formData = new FormData(elements.form.formEl);
    const url = formData.get('url');

    try {
      if (url === '') throw new Error('errorFieldEmpty');
    } catch (err) {
      watchedState.flowAdditionProcess.error = err.message;
      watchedState.flowAdditionProcess.state = 'failed';
      return;
    }

    const schema = yup
      .string()
      .notOneOf(state.flowAdditionProcess.addedLinks, 'errorExist')
      .url('errorNoValid');

    schema.validate(url)
      .then((result) => {
        rssCheckController(result, state, watcher);
        handlerModal(state, elements, watcher);
      })
      .catch((err) => {
        watchedState.flowAdditionProcess.error = err.message;
        watchedState.flowAdditionProcess.state = 'failed';
      });
  });
};
