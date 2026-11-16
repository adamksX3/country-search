import { debounce } from './debounce.js';
import { createLatestSearch } from './latestSearch.js';
import type { CountryCard } from './mapCountryResponse.js';

const search = createLatestSearch();

const input = document.createElement('input');
input.placeholder = 'England';

const status = document.createElement('p');

const retry = document.createElement('button');
retry.textContent = 'Повторить';
retry.hidden = true;

const list = document.createElement('ul');

const details = document.createElement('section');

document.body.append(input, status, retry, list, details);

function showDetails(card: CountryCard): void {
  const title = document.createElement('h2');
  title.textContent = card.name;

  const flag = document.createElement('img');
  flag.src = card.flag;
  flag.alt = `Флаг: ${card.name}`;
  flag.width = 120;

  const info = document.createElement('p');
  info.textContent =
    `Столица: ${card.capital || '—'}. Регион: ${card.region}. ` +
    `Население: ${card.population.toLocaleString('ru-RU')}. ` +
    `Языки: ${card.languages.join(', ')}.`;

  details.replaceChildren(title, flag, info);
}

function createCardElement(card: CountryCard): HTMLLIElement {
  const li = document.createElement('li');

  const flag = document.createElement('img');
  flag.src = card.flag;
  flag.alt = `Флаг: ${card.name}`;
  flag.width = 32;

  const name = document.createElement('strong');
  name.textContent = card.name;

  li.append(flag, ' ', name);
  li.addEventListener('click', () => {
    showDetails(card);
  });
  li.style.cursor = 'pointer';
  return li;
}

async function runSearch(): Promise<void> {
  const query = input.value.trim();
  if (query === '') {
    search.cancel();
    status.textContent = '';
    retry.hidden = true;
    list.replaceChildren();
    details.replaceChildren();
    return;
  }

  try {
    retry.hidden = true;
    status.textContent = 'Загрузка…';
    const cards = await search(query);

    status.textContent = cards.length === 0 ? 'Ничего не найдено' : '';

    const items = cards.map(createCardElement);
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
