import { FC, memo } from 'react';
import { IMAGE_PATH } from '../../constants/urls';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  title: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  overview: string;
}

const MovieCard: FC<MovieCardProps> = memo(({ title, posterPath, releaseDate, voteAverage, overview }) => {
  const year = new Date(releaseDate).getFullYear();
  const rating = Math.round(voteAverage * 10) / 10;

  return (
    <div className={styles.card}>
      <div className={styles.poster}>
        <img src={`${IMAGE_PATH}${posterPath}`} alt={title} loading="lazy" />
        <div className={styles.rating}>{rating}</div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.year}>{year}</p>
        <p className={styles.overview}>{overview}</p>
      </div>
    </div>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;
