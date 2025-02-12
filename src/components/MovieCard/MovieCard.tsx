import { memo } from 'react';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  title: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  overview: string;
}

const MovieCard = memo(({ title, posterPath, releaseDate, voteAverage, overview }: MovieCardProps) => {
  const year = new Date(releaseDate).getFullYear();
  const rating = Math.round(voteAverage * 10) / 10;

  return (
    <div className={styles.card}>
      <div className={styles.poster}>
        <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} loading="lazy" />
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
