import { FC, memo, useCallback } from 'react';
import Search from '../../../components/Search';
import { useAppDispatch } from '../../../store/hooks';
import { setSearchQuery } from '../../../store/movies';
import styles from './SearchSection.module.scss';

interface SearchSectionProps {
  title: string;
  subtitle?: string;
}

const SearchSection: FC<SearchSectionProps> = memo(({ title, subtitle }) => {
  const dispatch = useAppDispatch();

  const onSearch = useCallback(
    (searchText: string) => {
      dispatch(setSearchQuery(searchText));
    },
    [dispatch],
  );

  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.searchWrapper}>
        <Search onSearch={onSearch} />
      </div>
    </div>
  );
});

SearchSection.displayName = 'SearchSection';

export default SearchSection;
