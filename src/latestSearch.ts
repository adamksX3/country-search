import { searchCountries } from './searchCountries.js';
import type { CountryCard } from './mapCountryResponse.js';

export function createLatestSearch() {
  let controller: AbortController | undefined;

  return (query: string): Promise<CountryCard[]> => {
    if (controller) {
      controller.abort();
    }
    controller = new AbortController();
    return searchCountries(query, controller.signal);
  };
}
