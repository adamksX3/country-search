export function debounce(
  fn: (...args: unknown[]) => void,
  delay: number,
): (...args: unknown[]) => void {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  return (...args: unknown[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}
