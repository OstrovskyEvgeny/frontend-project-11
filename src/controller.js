import * as yup from 'yup';
import view from './view.js';
import checkTheResourceForRssContent from './parser.js';

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
        checkTheResourceForRssContent(result, state, watcher);

        const { modal } = elements;
        modal.addEventListener('show.bs.modal', (event) => {
          const button = event.relatedTarget;
          const recipient = button.dataset.id;
          const modalTitle = modal.querySelector('.modal-title');
          const modalBody = modal.querySelector('.modal-body');
          const modalFooterLink = modal.querySelector('.modal-footer > a');
          const {
            title, description, link,
          } = state.content.posts.find(({ idPost }) => idPost === recipient);

          modalTitle.textContent = title;
          modalBody.textContent = description;
          modalFooterLink.setAttribute('href', link);
        });
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
