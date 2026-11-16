import { searchCountries } from './searchCountries.js';
import type { CountryCard } from './mapCountryResponse.js';

export function createLatestSearch() {
  return (query: string): Promise<CountryCard[]> =>
    searchCountries(query, new AbortController().signal);
}
