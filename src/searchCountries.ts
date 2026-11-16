import { HttpError } from './httpError.js';
import { mapCountryResponse, type CountryCard, type RawCountry } from './mapCountryResponse.js';

export async function searchCountries(query: string, signal: AbortSignal): Promise<CountryCard[]> {
  const response = await fetch(`https://countries.dev/name/${query}`, { signal });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new HttpError(response.status);
  }
  const data: RawCountry[] = await response.json();
  return data.map(mapCountryResponse);
}
