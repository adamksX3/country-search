import { describe, test, expect } from 'vitest';
import { HttpError } from '../src/httpError.js';

describe('HttpError', () => {
  test('create error', () => {
    const error = new HttpError(500);

    expect(error.status).toBe(500);
    expect(error).toBeInstanceOf(Error);
  });
});
