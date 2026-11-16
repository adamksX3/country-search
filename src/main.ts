import { debounce } from './debounce.js';
import { createLatestSearch } from './latestSearch.js';

const search = createLatestSearch();
const input = document.createElement('input');
input.placeholder = 'England';
document.body.append(input);
input.addEventListener(
  'input',
  debounce(async () => {
    const query = input.value.trim();
    if (query === '') {
      return;
    }
    const cards = await search(query);
    console.log(cards);
  }, 300),
);
