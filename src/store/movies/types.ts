export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

export interface MoviesState {
  items: Movie[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  page: number;
  totalPages: number;
  searchQuery: string;
}
