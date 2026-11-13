export function debounce(
  fn: (...args: unknown[]) => void,
  delay: number,
): (...args: unknown[]) => void {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  return () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(), delay);
  };
}
