/* eslint-disable no-param-reassign */
export default (state, elements, watchedState) => {
  const { modal } = elements;
  modal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const idButton = button.dataset.id;

    const post = state.content.posts
      .reduce((accumulator, necessaryPost) => {
        if (necessaryPost.idPost === idButton) {
          necessaryPost.vived = true;
          accumulator = necessaryPost;
        }
        return accumulator;
      }, {});

    const liEl = button.offsetParent;
    const visitedLinkEl = liEl.querySelector('a');

    const watcher = watchedState;
    watcher.modalActive = { post, visitedLinkEl };
  });
};
