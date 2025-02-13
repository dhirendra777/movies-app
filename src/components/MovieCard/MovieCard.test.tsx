import { render, screen } from '@testing-library/react';
import MovieCard from './MovieCard';

const mockMovie = {
  id: 1,
  title: 'Inception',
  posterPath: '/inception.jpg',
  releaseDate: '2010-07-16',
  voteAverage: 8.8,
  overview: 'test overview',
};

describe('MovieCard Component', () => {
  test('renders movie title', () => {
    //arrange
    render(<MovieCard {...mockMovie} />);

    //act
    const titleElement = screen.getByText(/Inception/i);
    const yearElement = screen.getByText(/2010/i);
    const overviewElement = screen.getByText(/test overview/i);
    const imgElement = screen.getByAltText(/Inception/i);
    const ratingElement = screen.getByText(/8.8/i);

    //assert
    expect(titleElement).toBeInTheDocument();
    expect(yearElement).toBeInTheDocument();
    expect(overviewElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/inception.jpg');
    expect(ratingElement).toBeInTheDocument();
  });
});
