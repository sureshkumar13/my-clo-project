import React, {useState, useEffect} from 'react';
import { fetchRequest } from '../store/contentSlice'
import { SearchInput } from './SearchInput/SearchInput';
import { ContentFilter } from './ContentFilter/ContentFilter';
import ContentList from './ContentList/ContentList';    
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { NoDataCard } from './SpecialCards/NoDataCard';
import { ErrorCard } from './SpecialCards/ErrorCard';
import { SortComponent } from './SortComponent/SortComponent';
import type { SortType } from './SortComponent/SortComponent';

export const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.content);

  const [{ search, filters, sort }, setState] = useState<{ search: string; filters: number[]; sort: SortType }>({ ...getInitialState(), sort: 'name' as SortType });
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(8); // Show 8 items initially

  // Read initial values from URL
  function getInitialState() {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search') || "";
    const filtersParam = params.get('filters');
    const filters = filtersParam ? filtersParam.split(',').map(Number) : [];
    return { search, filters };
  }

  useEffect(() => {
    dispatch(fetchRequest());
  }, [dispatch]);

  useEffect(() => {
    let filtered = items.filter(item => {
      const matchesSearch = search === "" || item.title.toLowerCase().includes(search.toLowerCase()) || item.creator.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filters.length === 0 || filters.includes(item.pricingOption);
      return matchesSearch && matchesFilter;
    });
    // Sorting logic
    if (sort === '') {
        filtered = filtered;
    } else if (sort === 'name') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'high') {
      filtered = filtered.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else if (sort === 'low') {
      filtered = filtered.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    }
    if (JSON.stringify(filtered) !== JSON.stringify(filteredItems)) {
      setFilteredItems(filtered);
    }
  }, [items, search, filters, sort]);

  // To update URL when search or filters change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('search', search);
    params.set('filters', filters.join(','));
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }, [search, filters]);


  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorCard error={error} />;
  return (
    <div style={{ width: '100%' }}>
      <SearchInput id="search-input" value={search} onChange={e => setState(s => ({ ...s, search: e.target.value }))} />
      <ContentFilter id="content-filter" value={filters} onChange={filters => setState(s => ({ ...s, filters }))} />
      <SortComponent id="sort-component" value={sort} onSort={sort => setState(s => ({ ...s, sort }))} />

      {filteredItems.length === 0 ? (
        <NoDataCard />
      ) : (
        <ContentList
          items={filteredItems.slice(0, visibleCount)}
          onLoadMore={() => setVisibleCount(c => c + 12)}
          hasMore={visibleCount < filteredItems.length}
        />
      )}
    </div>
  );
};
