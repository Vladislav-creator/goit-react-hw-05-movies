import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMovieByQuery } from '../../components/services/getMovies';

import Form from '../../components/MoviesPage/SearchBar';
import FilmsList from '../../components/FilmList/FilmList';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentQuery = searchParams.get('query');
    if (!currentQuery) return;

    const fetchMovieByQuery = async () => {
      try {
        const movieByQuery = await getMovieByQuery(currentQuery);
        setMovies(movieByQuery);
      } catch (e) {
        console.log(e);
      }
    };
    fetchMovieByQuery();
  }, [searchParams]);

  return (
    <div className="container">
      <Form setSearchParams={setSearchParams} />
      {movies.length > 0 && <FilmsList movies={movies} />}
    </div>
  );
};

export default Movies;
