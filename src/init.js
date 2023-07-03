import * as yup from 'yup';
import view from './view.js';

export default () => {
  const state = {
    form: {
      isValid: true,
      message: '',
    },
    links: [],
  };
  const elements = {
    form: document.querySelector('.rss-form'),
  };
  const schema = yup
    .string()
    .required()
    .notOneOf(state.links, 'RSS уже существует')
    .url('Ссылка должна быть валидным URL');

  const watcher = view(state, elements);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(elements.form);
    const url = formData.get('url');

    schema.validate(url)
      .then((result) => {
        watcher.form.isValid = true;
        watcher.form.message = 'RSS успешно загружен';
        watcher.links.push(result);
      })
      .catch(({ ValidationError }) => {
        watcher.form.isValid = false;
        watcher.form.message = ValidationError;
      });
  });
};
