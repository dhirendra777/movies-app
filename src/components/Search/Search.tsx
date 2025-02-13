import { ChangeEvent, FC, memo, useCallback, useEffect, useRef } from 'react';
import { debounce } from '../../utils/debounce';
import styles from './Search.module.scss';

interface SearchProps {
  placeholder?: string;
  debounceTime?: number;
  onSearch: (searchText: string) => void;
}

const Search: FC<SearchProps> = memo(({ onSearch, placeholder = 'Search for movies...', debounceTime = 500 }) => {
  const debouncedSearch = useRef(
    debounce((value: string) => {
      onSearch(value);
    }, debounceTime),
  ).current;

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(event.target.value);
    },
    [debouncedSearch],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className={styles.searchContainer}>
      <input type="text" className={styles.searchInput} placeholder={placeholder} onChange={handleSearch} />
    </div>
  );
});

Search.displayName = 'Search';

export default Search;
