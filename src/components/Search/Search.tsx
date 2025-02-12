import { ChangeEvent, memo, useCallback, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setSearchQuery } from '../../store/movies/moviesSlice';
import { debounce } from '../../utils/debounce';
import styles from './Search.module.scss';

interface SearchProps {
  placeholder?: string;
  debounceTime?: number;
}

const Search = memo(({ placeholder = 'Search for movies...', debounceTime = 500 }: SearchProps) => {
  const dispatch = useAppDispatch();

  const debouncedSearch = useRef(
    debounce((value: string) => {
      dispatch(setSearchQuery(value));
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
