import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  const defaultProps = {
    id: 'search-input',
    value: '',
    onChange: jest.fn(),
  };

  it('renders input with correct placeholder', () => {
    const { getByPlaceholderText } = render(<SearchInput {...defaultProps} />);
    expect(getByPlaceholderText("Find the items you're looking for")).toBeInTheDocument();
  });

  it('renders input with correct value', () => {
    const { getByDisplayValue } = render(
      <SearchInput {...defaultProps} value="test value" />
    );
    expect(getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput {...defaultProps} onChange={onChange} />
    );
    fireEvent.change(getByPlaceholderText("Find the items you're looking for"), {
      target: { value: 'new value' },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it('renders SearchIcon', () => {
    const { container } = render(<SearchInput {...defaultProps} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
