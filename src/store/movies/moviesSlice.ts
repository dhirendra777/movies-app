import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { moviesService } from '../../services/movies.service';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

interface MoviesState {
  items: Movie[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  page: number;
  totalPages: number;
  searchQuery: string;
}

const initialState: MoviesState = {
  items: [],
  status: 'idle',
  error: null,
  page: 1,
  totalPages: 1,
  searchQuery: '',
};

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

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.page = 1;
      state.items = [];
    },
    resetMovies: (state) => {
      state.items = [];
      state.page = 1;
      state.searchQuery = '';
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = state.page === 1 ? action.payload.results : [...state.items, ...action.payload.results];
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, resetMovies, incrementPage } = moviesSlice.actions;
export default moviesSlice.reducer;
