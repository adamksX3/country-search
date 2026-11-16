import { searchCountries } from './searchCountries.js';
import type { CountryCard } from './mapCountryResponse.js';

export function createLatestSearch(timeoutMs = 10000) {
  let controller: AbortController | undefined;

  const search = (query: string): Promise<CountryCard[]> => {
    if (controller) {
      controller.abort();
    }
    controller = new AbortController();
    const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(timeoutMs)]);
    return searchCountries(query, signal);
  };

  search.cancel = (): void => {
    if (controller) {
      controller.abort();
    }
  };

  return search;
}
