export default (state, elements, watchedState) => {
  const { modal } = elements.modal;
  modal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const idButton = button.dataset.id;

    const post = state.content.posts
      .find((currentPost) => currentPost.idPost === idButton);
    post.vived = true;

    const liEl = button.offsetParent;
    const visitedLinkEl = liEl.querySelector('a');

    const watcher = watchedState;
    watcher.modalActive = { post, visitedLinkEl };
  });
};
