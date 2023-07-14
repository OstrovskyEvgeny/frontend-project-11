import i18next from 'i18next';
import ru from './locales/ru.js';
import runApp from './controller.js';

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

        links: [],
        modalActive: null,

        content: {
          feeds: [],
          posts: [],
        },
      };
      const elements = {
        form: document.querySelector('.rss-form'),
        feedback: document.querySelector('.feedback'),

        feeds: document.querySelector('.feeds'),
        posts: document.querySelector('.posts'),
        modal: document.querySelector('#modal'),
      };

      runApp(i18n, state, elements);
    })
    .catch((e) => console.log(`init have a problem: ${e}`));
};
