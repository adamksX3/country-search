export function mapCountryResponse(raw: RawCountry): CountryCard {
  return {
    name: raw.name,
    capital: raw.capital,
    region: raw.region,
    population: raw.population,
    flag: raw.flag,
    languages: raw.languages.map((language) => language.name),
  };
}

export type RawCountry = {
  name: string;
  capital: string;
  region: string;
  population: number;
  flag: string;
  languages: { name: string }[];
};

export type CountryCard = {
  name: string;
  capital: string;
  region: string;
  population: number;
  flag: string;
  languages: string[];
};
