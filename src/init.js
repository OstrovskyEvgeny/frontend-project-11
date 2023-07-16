import i18next from 'i18next';
import ru from './locales/ru.js';
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
        form: {
          isValid: null,
          error: '',
        },
        content: {
          feeds: [],
          posts: [],
        },
        links: [],
        modalActive: null,
      };
      const elements = {
        form: document.querySelector('.rss-form'),
        feedback: document.querySelector('.feedback'),

        feeds: document.querySelector('.feeds'),
        posts: document.querySelector('.posts'),

        modal: {
          modal: document.querySelector('#modal'),
          modalTitle: document.querySelector('.modal-title'),
          modalBody: document.querySelector('.modal-body'),
          modalFooterLink: document.querySelector('.modal-footer > a'),
        },
      };

      runApp(i18n, state, elements);
    })
    .catch((e) => console.log(`init have a problem: ${e}`));
};
