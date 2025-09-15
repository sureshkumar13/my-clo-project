import React, {useState, useEffect} from 'react';
import { fetchRequest } from '../store/contentSlice'
import { SearchInput } from './SearchInput/SearchInput';
import { ContentFilter } from './ContentFilter/ContentFilter';
import ContentList from './ContentList/ContentList';    
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.content);

  // Read initial values from URL
  function getInitialState() {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search') || "";
    const filtersParam = params.get('filters');
    const filters = filtersParam ? filtersParam.split(',').map(Number) : [];
    return { search, filters };
  }

  const [{ search, filters }, setState] = useState(getInitialState());
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(8); // Show 12 items initially

  useEffect(() => {
    dispatch(fetchRequest());
  }, [dispatch]);

  useEffect(() => {
    const filtered = items.filter(item => {
      const matchesSearch = search === "" || item.title.toLowerCase().includes(search.toLowerCase()) || item.creator.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filters.length === 0 || filters.includes(item.pricingOption);
      return matchesSearch && matchesFilter;
    });
    if (JSON.stringify(filtered) !== JSON.stringify(filteredItems)) {
      setFilteredItems(filtered);
    }
  }, [items, search, filters]);

  // To update URL when search or filters change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('search', search);
    params.set('filters', filters.join(','));
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }, [search, filters]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <SearchInput value={search} onChange={e => setState(s => ({ ...s, search: e.target.value }))} />
      <ContentFilter value={filters} onChange={filters => setState(s => ({ ...s, filters }))} />
      <ContentList
        items={filteredItems.slice(0, visibleCount)}
        onLoadMore={() => setVisibleCount(c => c + 12)}
        hasMore={visibleCount < filteredItems.length}
      />
    </div>
  );
};

Dashboard.propTypes = {};

export { Dashboard };