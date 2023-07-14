export default (state, elements, watchedState) => {
  const { modal } = elements;
  modal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const liEl = button.offsetParent;
    const idButton = button.dataset.id;
    const post = state.content.posts.find(({ idPost }) => idPost === idButton);
    const visitedLinkEl = liEl.querySelector('a');

    const watcher = watchedState;
    watcher.modalActive = { post, modal, visitedLinkEl };
  });
};
