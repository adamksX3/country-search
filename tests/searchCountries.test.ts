import { afterEach, describe, test, expect, vi } from 'vitest';
import { searchCountries } from '../src/searchCountries.js';
import { HttpError } from '../src/httpError.js';

describe('searchCountries', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('returns country cards for a 200 response', async () => {
    const serverData = [
      {
        name: 'Russian Federation',
        capital: 'Moscow',
        region: 'Europe',
        population: 144104080,
        flags: { svg: 'https://flagcdn.com/ru.svg' },
        languages: [{ name: 'Russian' }],
      },
    ];

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(serverData))));

    const result = await searchCountries('russia', new AbortController().signal);
    expect(result).toEqual([
      {
        name: 'Russian Federation',
        capital: 'Moscow',
        region: 'Europe',
        population: 144104080,
        flag: 'https://flagcdn.com/ru.svg',
        languages: ['Russian'],
      },
    ]);
  });

  test('returns an empty list for a 404 response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 404 })));

    const result = await searchCountries('qwerty', new AbortController().signal);
    expect(result).toEqual([]);
  });

  test('throws HttpError for a 500 response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 500 })));

    await expect(searchCountries('russia', new AbortController().signal)).rejects.toBeInstanceOf(
      HttpError,
    );
  });
});
