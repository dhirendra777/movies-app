import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Search from './Search';

const renderComponent = () => {
  const onSearchMock = vi.fn();
  return { ...render(<Search onSearch={onSearchMock} />), onSearchMock };
};

describe('Search Component', () => {
  test('renders input field', () => {
    renderComponent();
    const inputElement = screen.getByPlaceholderText(/search for movies.../i);
    expect(inputElement).toBeInTheDocument();
  });

  test('debounces input changes', () => {
    const searchText = 'Inception';
    vi.useFakeTimers();
    const { onSearchMock } = renderComponent();
    const inputElement = screen.getByPlaceholderText(/search for movies.../i);

    fireEvent.change(inputElement, { target: { value: searchText } });
    expect(onSearchMock).not.toHaveBeenCalledWith(searchText);
    vi.advanceTimersByTime(500);
    expect(onSearchMock).toHaveBeenCalledWith(searchText);
    vi.useRealTimers();
  });
});
