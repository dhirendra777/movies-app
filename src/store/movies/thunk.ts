import { createAsyncThunk } from '@reduxjs/toolkit';
import { moviesService } from '../../services/movies.service';
import { MoviesState } from './types';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (_, { getState, rejectWithValue }) => {
  const state = getState() as { movies: MoviesState };
  const { page, searchQuery } = state.movies;

  try {
    return searchQuery
      ? await moviesService.searchMovies(searchQuery, page)
      : await moviesService.getPopularMovies(page);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch movies');
  }
});
