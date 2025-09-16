import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ContentFilter } from './ContentFilter';

describe('ContentFilter', () => {
  const defaultProps = {
    id: 'test-filter',
    value: [],
    onChange: jest.fn(),
  };

  it('renders all filter options', () => {
    const { getByLabelText } = render(<ContentFilter {...defaultProps} />);
    expect(getByLabelText('Paid')).toBeInTheDocument();
    expect(getByLabelText('Free')).toBeInTheDocument();
    expect(getByLabelText('View Only')).toBeInTheDocument();
  });

  it('calls onChange when a filter is checked', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <ContentFilter {...defaultProps} onChange={onChange} />
    );
    fireEvent.click(getByLabelText('Paid'));
    expect(onChange).toHaveBeenCalledWith([0]);
  });

  it('calls onChange with correct value when unchecked', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <ContentFilter {...defaultProps} value={[0]} onChange={onChange} />
    );
    fireEvent.click(getByLabelText('Paid'));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('calls onChange with empty array when reset is clicked', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <ContentFilter {...defaultProps} value={[0, 1, 2]} onChange={onChange} />
    );
    fireEvent.click(getByText('Reset'));
    expect(onChange).toHaveBeenCalledWith([]);
  });
});
