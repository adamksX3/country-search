import { debounce } from './debounce.js';
import { createLatestSearch } from './latestSearch.js';

const search = createLatestSearch();

const input = document.createElement('input');
input.placeholder = 'England';

const status = document.createElement('p');

const list = document.createElement('ul');

document.body.append(input, status, list);

input.addEventListener(
  'input',
  debounce(async () => {
    const query = input.value.trim();
    if (query === '') {
      status.textContent = '';
      list.replaceChildren();
      return;
    }

    status.textContent = 'Загрузка…';
    const cards = await search(query);

    status.textContent = cards.length === 0 ? 'Ничего не найдено' : '';

    const items = cards.map((card) => {
      const li = document.createElement('li');
      li.textContent = card.name;
      return li;
    });
    list.replaceChildren(...items);
  }, 300),
);
