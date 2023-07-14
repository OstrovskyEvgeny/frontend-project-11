export const generateContent = (titleList, contentLiEl) => {
  const containerEl = document.createElement('div');
  containerEl.classList.add('card', 'border-0');

  const containerTitleEl = document.createElement('div');
  containerTitleEl.classList.add('card-body');

  const titleCommonEl = document.createElement('h2');
  titleCommonEl.classList.add('card-title', 'h4');
  titleCommonEl.textContent = titleList;

  const ulEl = document.createElement('ul');
  ulEl.classList.add('list-group', 'border-0', 'rounded-0');
  ulEl.append(...contentLiEl);

  containerEl.append(containerTitleEl, ulEl);
  containerTitleEl.append(titleCommonEl);

  return containerEl;
};

export const generateFeedsList = (feedsColl) => {
  const list = feedsColl.map((feedObj) => {
    const { title, description } = feedObj;

    const liFeedEl = document.createElement('li');
    liFeedEl.classList.add('list-group-item', 'border-0', 'border-end-0');

    const titleFeedEl = document.createElement('h3');
    titleFeedEl.classList.add('h6', 'm-0');
    titleFeedEl.textContent = title;

    const descriptionFeedEl = document.createElement('p');
    descriptionFeedEl.classList.add('m-0', 'small', 'text-black-50');
    descriptionFeedEl.textContent = description;

    liFeedEl.append(titleFeedEl, descriptionFeedEl);

    return liFeedEl;
  });

  return list;
};

export const generatePostsList = (postsColl, i18n) => {
  const list = postsColl.map((postObj) => {
    const {
      link, idPost, title,
    } = postObj;

    const liPostEl = document.createElement('li');
    liPostEl.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const linkPostEl = document.createElement('a');
    linkPostEl.classList.add('fw-bold');
    linkPostEl.setAttribute('href', link);
    linkPostEl.setAttribute('data-id', idPost);
    linkPostEl.setAttribute('arget', '_blank');
    linkPostEl.setAttribute('rel', 'noopener noreferrer');
    linkPostEl.textContent = title;

    const buttonPostEl = document.createElement('button');
    buttonPostEl.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    buttonPostEl.setAttribute('type', 'button');
    buttonPostEl.setAttribute('data-id', idPost);
    buttonPostEl.setAttribute('data-bs-toggle', 'modal');
    buttonPostEl.setAttribute('data-bs-target', '#modal');
    buttonPostEl.textContent = i18n.t('button');

    liPostEl.append(linkPostEl, buttonPostEl);

    return liPostEl;
  });

  return list;
};
