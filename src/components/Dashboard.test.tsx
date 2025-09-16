import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dashboard } from './Dashboard';

// Mock Redux and child components as needed
jest.mock('../store/contentSlice', () => ({ fetchRequest: jest.fn() }));
jest.mock('./SearchInput/SearchInput', () => ({ SearchInput: ({ value, onChange }: any) => <input data-testid="search-input" value={value} onChange={onChange} /> }));
jest.mock('./ContentFilter/ContentFilter', () => ({ ContentFilter: ({ value, onChange }: any) => <input data-testid="filter-input" value={value} onChange={onChange} /> }));
jest.mock('./SortComponent/SortComponent', () => ({ SortComponent: ({ value, onSort }: any) => <select data-testid="sort-select" value={value} onChange={e => onSort(e.target.value)}><option value="">Sort By</option><option value="name">Item Name</option><option value="high">Higher Price</option><option value="low">Lower Price</option></select> }));
jest.mock('./ContentList/ContentList', () => ({ ContentList: ({ items }: any) => <div data-testid="content-list">{items.map((item: any) => <div key={item.id}>{item.title}</div>)}</div> }));
jest.mock('./SpecialCards/NoDataCard', () => ({ NoDataCard: () => <div data-testid="no-data">No data available</div> }));
jest.mock('./SpecialCards/ErrorCard', () => ({ ErrorCard: ({ error }: any) => <div data-testid="error-card">Error: {error}</div> }));


let mockItems: any[] = [
  { id: 1, title: 'Alpha', creator: 'A', pricingOption: 0, price: 10 },
  { id: 2, title: 'Beta', creator: 'B', pricingOption: 1, price: 20 },
  { id: 3, title: 'Gamma', creator: 'C', pricingOption: 2, price: 5 },
];
let mockLoading = false;
let mockError: string | null = null;

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: (fn: any) => ({
    items: mockItems,
    loading: mockLoading,
    error: mockError,
  }),
}));

describe('Dashboard', () => {
  beforeEach(() => {
    mockItems = [
      { id: 1, title: 'Alpha', creator: 'A', pricingOption: 0, price: 10 },
      { id: 2, title: 'Beta', creator: 'B', pricingOption: 1, price: 20 },
      { id: 3, title: 'Gamma', creator: 'C', pricingOption: 2, price: 5 },
    ];
    mockLoading = false;
    mockError = null;
  });

  it('shows NoDataCard when no items match', () => {
    mockItems = [];
    render(<Dashboard />);
    expect(screen.getByTestId('no-data')).toBeInTheDocument();
  });

  it('shows ErrorCard when error exists', () => {
    mockError = 'Test error';
    render(<Dashboard />);
    expect(screen.getByTestId('error-card')).toBeInTheDocument();
  });
});
