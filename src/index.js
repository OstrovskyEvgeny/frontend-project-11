import './styles.scss';
import 'bootstrap';
import i18next from 'i18next';
import ru from './locales/ru.js';
import runApp from './app.js';

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
    runApp(i18n);
  })
  .catch((e) => console.log(`i18n have a problem: ${e}`));
