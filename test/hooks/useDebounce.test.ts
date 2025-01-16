import { render, act } from '@testing-library/react';
import { useDebounce } from '../../src/hooks';

function TestComponent({ value, delay }: { value: string; delay: number }) {
  const debouncedValue = useDebounce(value, delay);
  return (<div data-testid="debounced-value">{debouncedValue}</div>);
}

test('useDebounce debounces the value', () => {
  jest.useFakeTimers(); // Mock timers for testing
  const { getByTestId, rerender } = render(<TestComponent value="A" delay={500} />);

  // Initial value
  expect(getByTestId('debounced-value').textContent).toBe('A');

  // Update value
  rerender(<TestComponent value="B" delay={500} />);
  expect(getByTestId('debounced-value').textContent).toBe('A'); // Still 'A' because of debounce delay

  // Advance time by 500ms
  act(() => {
    jest.advanceTimersByTime(500);
  });

  // Now the value should be updated
  expect(getByTestId('debounced-value').textContent).toBe('B');

  jest.clearAllTimers();
});
