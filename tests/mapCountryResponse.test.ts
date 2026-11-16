import { describe, expect, test } from 'vitest';
import { mapCountryResponse } from '../src/mapCountryResponse.js';

describe('mapCountryResponse', () => {
  test('maps raw country to card data', () => {
    const raw = {
      name: 'United States of America',
      alpha2Code: 'US',
      alpha3Code: 'USA',
      capital: 'Washington, D.C.',
      region: 'Americas',
      subregion: 'North America',
      population: 329484123,
      area: 9372610,
      currencies: [{ code: 'USD', name: 'United States dollar', symbol: '$' }],
      languages: [
        { iso639_1: 'en', name: 'English' },
        { iso639_1: 'es', name: 'Spanish' },
      ],
      callingCodes: ['1'],
      topLevelDomain: ['.us'],
      borders: ['CAN', 'MEX'],
      flags: { png: 'https://flagcdn.com/w320/us.png', svg: 'https://flagcdn.com/us.svg' },
    };

    expect(mapCountryResponse(raw)).toEqual({
      name: 'United States of America',
      capital: 'Washington, D.C.',
      flag: 'https://flagcdn.com/us.svg',
      languages: ['English', 'Spanish'],
      region: 'Americas',
      population: 329484123,
    });
  });
});
