import { debounce } from './debounce.js';
import { createLatestSearch } from './latestSearch.js';

const search = createLatestSearch();

const input = document.createElement('input');
input.placeholder = 'England';

const status = document.createElement('p');

const retry = document.createElement('button');
retry.textContent = 'Повторить';
retry.hidden = true;

const list = document.createElement('ul');

document.body.append(input, status, retry, list);

async function runSearch(): Promise<void> {
  const query = input.value.trim();
  if (query === '') {
    search.cancel();
    status.textContent = '';
    retry.hidden = true;
    list.replaceChildren();
    return;
  }

  try {
    retry.hidden = true;
    status.textContent = 'Загрузка…';
    const cards = await search(query);

    status.textContent = cards.length === 0 ? 'Ничего не найдено' : '';

    const items = cards.map((card) => {
      const li = document.createElement('li');
      li.textContent = card.name;
      return li;
    });
    list.replaceChildren(...items);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return;
    }
    list.replaceChildren();
    retry.hidden = false;
    status.textContent =
      error instanceof Error && error.name === 'TimeoutError'
        ? 'Сервер не отвечает'
        : 'Ошибка. Попробуйте ещё раз';
  }
}

input.addEventListener('input', debounce(runSearch, 300));
retry.addEventListener('click', runSearch);
