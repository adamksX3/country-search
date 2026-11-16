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

  test('restarts the timer on each call', () => {
    const spy = vi.fn();
    const debounced = debounce(spy, 300);

    debounced('a');
    vi.advanceTimersByTime(200);
    expect(spy).not.toHaveBeenCalled();
    debounced('b');
    vi.advanceTimersByTime(200);
    expect(spy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('passes arguments to fn', () => {
    const spy = vi.fn();
    const debounced = debounce(spy, 300);

    debounced('russia');
    vi.advanceTimersByTime(300);
    expect(spy).toHaveBeenCalledWith('russia');
  });
});
