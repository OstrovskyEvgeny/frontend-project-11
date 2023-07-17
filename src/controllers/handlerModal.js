export default (state, elements, watcher) => {
  const { modal } = elements.modal;
  modal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const idButton = button.dataset.id;

    const post = state.content.posts
      .find((currentPost) => currentPost.idPost === idButton);
    post.vived = true;

    const liEl = button.offsetParent;
    const visitedLinkEl = liEl.querySelector('a');

    const watchedState = watcher;
    watchedState.modalActive = { post, visitedLinkEl };
  });
};
