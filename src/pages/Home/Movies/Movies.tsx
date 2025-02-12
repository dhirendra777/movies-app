import { memo, useCallback, useEffect } from 'react';
import MovieCard from '../../../components/MovieCard/MovieCard';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchMovies, incrementPage } from '../../../store/movies/moviesSlice';
import styles from './Movies.module.scss';

const Movies = memo(() => {
  const dispatch = useAppDispatch();
  const { items: movies, status, error, page, totalPages, searchQuery } = useAppSelector((state) => state.movies);

  const isLoading = status === 'loading';
  const hasMore = page < totalPages;

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch, searchQuery]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      dispatch(incrementPage());
      dispatch(fetchMovies());
    }
  }, [dispatch, hasMore, isLoading]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (isLoading && !movies.length) {
    return <div className={`${styles.loading} ${styles.movieGrid}`}>Loading...</div>;
  }

  if (!movies.length) {
    return (
      <div className={`${styles.noResults}`}>
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
