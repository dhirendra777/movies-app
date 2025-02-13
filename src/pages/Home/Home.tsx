import { memo } from 'react';
import styles from './Home.module.scss';
import Movies from './Movies';
import SearchSection from './SearchSection';

const Home = memo(() => {
  return (
    <div className={styles.container}>
      <SearchSection title="Movie App" subtitle="Discover your next favorite movie" />
      <Movies />
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
