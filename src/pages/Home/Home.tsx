import { memo } from 'react';
import styles from './Home.module.scss';

const Home = memo(() => {
  return (
    <div className={styles.container}>
      <h1>Movie App</h1>
    </div>
  );
});

export default Home;
