import { mapCountryResponse, type CountryCard, type RawCountry } from './mapCountryResponse.js';

export async function searchCountries(query: string, signal: AbortSignal): Promise<CountryCard[]> {
  const response = await fetch(`https//countries.dev/name/${query}`, { signal });
  const data: RawCountry[] = await response.json();
  return data.map(mapCountryResponse);
}
