# Movies App

A React application for discovering and searching movies using the TMDB API.

## Features

- Browse popular movies
- Search movies by title

## Tech Stack

- React 19
- TypeScript
- Redux Toolkit for state management
- SCSS Modules for styling
- Vite for build tooling
- ESLint & Prettier for code quality

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your TMDB API key:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run lint:fix` - Fix linting issues

## Project Structure

```
src/
  ├── components/       # Reusable components
  ├── pages/           # Page components
  ├── services/        # API services
  ├── store/           # Redux store and slices
  ├── utils/           # Utility functions
  └── styles/          # Global styles
```

## Environment Variables

- `VITE_TMDB_API_KEY` - TMDB API key (required)

## Testing

To run tests, use the following command:

```bash
npm test
```

This will execute all test cases in your project.

```

```
