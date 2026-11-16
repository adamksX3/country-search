import { debounce } from './debounce.js';
import { createLatestSearch } from './latestSearch.js';

const search = createLatestSearch();
const input = document.createElement('input');
input.placeholder = 'England';
document.body.append(input);
const list = document.createElement('ul');
document.body.append(list);
input.addEventListener(
  'input',
  debounce(async () => {
    const query = input.value.trim();
    if (query === '') {
      return;
    }
    const cards = await search(query);

    const items = cards.map((card) => {
      const li = document.createElement('li');
      li.textContent = card.name;
      return li;
    });
    list.replaceChildren(...items);
  }, 300),
);
