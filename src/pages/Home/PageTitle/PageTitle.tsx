import { memo } from 'react';
import Search from '../../../components/Search/Search';
import styles from './PageTitle.module.scss';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

const PageTitle = memo(({ title, subtitle }: PageTitleProps) => {
  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.searchWrapper}>
        <Search />
      </div>
    </div>
  );
});

PageTitle.displayName = 'PageTitle';

export default PageTitle;
