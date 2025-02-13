import { memo, useCallback, useEffect } from 'react';
import MovieCard from '../../../components/MovieCard';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchMovies, incrementPage } from '../../../store/movies';
import styles from './Movies.module.scss';

const Movies = memo(() => {
  const dispatch = useAppDispatch();
  const { items: movies, status, error, page, totalPages, searchQuery } = useAppSelector((state) => state.movies);

  const isLoading = status === 'loading';
  const hasMore = page < totalPages;

  const fetchMoviesList = useCallback(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const nextPage = useCallback(() => {
    dispatch(incrementPage());
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      nextPage();
      fetchMoviesList();
    }
  }, [isLoading, hasMore, nextPage, fetchMoviesList]);

  useEffect(() => {
    fetchMoviesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (isLoading && !movies.length) {
    return <div className={`${styles.loadingText} ${styles.movieGrid}`}>Loading...</div>;
  }

  if (!movies.length) {
    return (
      <div className={`${styles.loadingText}`}>
        {searchQuery ? `No movies found for "${searchQuery}"` : 'No movies available'}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.movieGrid}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            releaseDate={movie.release_date}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </div>
      {hasMore && (
        <button className={styles.loadMore} onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
});

Movies.displayName = 'Movies';

export default Movies;
