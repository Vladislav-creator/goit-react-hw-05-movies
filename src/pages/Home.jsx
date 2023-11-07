import { useEffect, useState } from 'react';

import { getTrendingMovies } from '../components/services/getMovies';

import FilmList from '../components/FilmList/FilmList';

const Home = () => {
  const [movies, setMovies] = useState([]);
console.log(movies);
  useEffect(() => {
    getTrendingMovies('').then(setMovies);
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      <FilmList movies={movies} />
    </>
  );
};

export default Home;