import { memo } from 'react';
import styles from './Home.module.scss';
import Movies from './Movies/Movies';
import PageTitle from './PageTitle/PageTitle';

const Home = memo(() => {
  return (
    <div className={styles.container}>
      <PageTitle title="Movie App" subtitle="Discover your next favorite movie" />
      <Movies />
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
