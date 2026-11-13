import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { debounce } from '../src/debounce.js';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('calls fn once after the delay', () => {
    const spy = vi.fn();
    const debounced = debounce(spy, 300);

    debounced('a');
    vi.advanceTimersByTime(299);
    expect(spy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
