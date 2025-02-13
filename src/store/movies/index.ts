import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies } from './thunk';
import { MoviesState } from './types';

const initialState: MoviesState = {
  items: [],
  status: 'idle',
  error: null,
  page: 1,
  totalPages: 1,
  searchQuery: '',
};

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

const { setSearchQuery, incrementPage, resetMovies } = moviesSlice.actions;
const moviesReducer = moviesSlice.reducer;

export { fetchMovies, incrementPage, moviesReducer, moviesSlice, resetMovies, setSearchQuery };
