import { useEffect, useState } from 'react';

import { getTrendingMovies } from '../../components/services/getMovies';

import FilmList from '../../components/FilmList/FilmList';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies('').then(setMovies);
  }, []);

  return (
    <div className="container">
      <h1>Trending today</h1>
      <FilmList movies={movies} />
    </div>
  );
};

export default Home;
