import type { CountryCard } from './mapCountryResponse.js';

export async function searchCountries(query: string, signal: AbortSignal): Promise<CountryCard[]> {
  await Promise.resolve([query, signal]);
  return [];
}
