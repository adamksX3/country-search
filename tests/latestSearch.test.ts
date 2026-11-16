import { vi, test, describe, expect, afterEach } from 'vitest';
import { createLatestSearch } from '../src/latestSearch.js';

function rawCountry(name: string) {
  return {
    name,
    capital: 'Capital',
    region: 'Region',
    population: 1,
    flags: { svg: 'https://flagcdn.com/x.svg' },
    languages: [{ name: 'Language' }],
  };
}

function fakeServer(delays: Record<string, number>) {
  return vi.fn(
    (url: string, init: { signal: AbortSignal }) =>
      new Promise<Response>((resolve, reject) => {
        const query = url.split('/').pop() as string;
        const timer = setTimeout(() => {
          resolve(new Response(JSON.stringify([rawCountry(query)])));
        }, delays[query]);

        init.signal.addEventListener('abort', () => {
          clearTimeout(timer);
          reject(init.signal.reason);
        });
      }),
  );
}

describe('createLatestSearch', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('cancels the previous request when a new search starts', async () => {
    vi.stubGlobal('fetch', fakeServer({ ru: 50, russia: 10 }));
    const search = createLatestSearch();
    const first = search('ru');
    const second = search('russia');

    await expect(first).rejects.toHaveProperty('name', 'AbortError');
    await expect(second).resolves.toHaveLength(1);
  });

  test('rejects with TimeoutError when the server is too slow', async () => {
    vi.stubGlobal('fetch', fakeServer({ ru: 200 }));
    const search = createLatestSearch(20);
    const first = search('ru');

    await expect(first).rejects.toHaveProperty('name', 'TimeoutError');
  });
});
