import i18next from 'i18next';
import ru from './locales/ru.js';
import watcherInit from './view/watcher.js';
import runApp from './controllers/controller.js';

export default () => {
  const i18n = i18next.createInstance();
  i18n
    .init({
      lng: 'ru',
      debug: true,
      resources: {
        ru,
      },
    })
    .then(() => {
      const state = {
        flowAdditionProcess: {
          state: 'filling', // sending, finished, failed
          error: '',
          addedLinks: [],
        },
        content: {
          feeds: [],
          posts: [],
        },
        modalActive: {
          post: {},
          visitedLinkEl: {},
        },
      };

      const elements = {
        form: {
          formEl: document.querySelector('.rss-form'),
          submitBtn: document.querySelector('.rss-form button'),
          feedback: document.querySelector('.feedback'),
        },
        content: {
          feeds: document.querySelector('.feeds'),
          posts: document.querySelector('.posts'),
        },
        modal: {
          modal: document.querySelector('#modal'),
          modalTitle: document.querySelector('.modal-title'),
          modalBody: document.querySelector('.modal-body'),
          modalFooterLink: document.querySelector('.modal-footer > a'),
        },
      };

      const watcher = watcherInit(i18n, state, elements);

      runApp(state, elements, watcher);
    })
    .catch((e) => console.log(`initialization problems: ${e}`));
};
