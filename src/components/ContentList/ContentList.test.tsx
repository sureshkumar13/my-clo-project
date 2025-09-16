import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ContentList from './ContentList';

const items = [
  {
    id: 1,
    imagePath: 'img1.png',
    title: 'Title 1',
    creator: 'Creator 1',
    pricingOption: 0, // Assuming 0 = PAID
    price: 10,
  },
  {
    id: 2,
    imagePath: 'img2.png',
    title: 'Title 2',
    creator: 'Creator 2',
    pricingOption: 1, // Assuming 1 = FREE
    price: 0,
  },
];

describe('ContentList', () => {
  it('renders items with correct info', () => {
    const { getByText, getByAltText } = render(
      <ContentList items={items} hasMore={false} />
    );
    expect(getByText('Title 1')).toBeInTheDocument();
    expect(getByText('Creator 1')).toBeInTheDocument();
    expect(getByAltText('Title 1')).toBeInTheDocument();
    expect(getByText('$10')).toBeInTheDocument();
    expect(getByText('Title 2')).toBeInTheDocument();
    expect(getByText('Creator 2')).toBeInTheDocument();
    expect(getByAltText('Title 2')).toBeInTheDocument();
    expect(getByText('FREE')).toBeInTheDocument();
  });

  it('shows loader when hasMore is true', () => {
    const { container } = render(
      <ContentList items={items} hasMore={true} />
    );
    expect(container.querySelector('div[style]')).toBeInTheDocument();
  });

  it('calls onLoadMore when scrolled to loader', () => {
    const onLoadMore = jest.fn();
    render(
      <ContentList items={items} hasMore={true} onLoadMore={onLoadMore} />
    );
    fireEvent.scroll(window);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });
});
