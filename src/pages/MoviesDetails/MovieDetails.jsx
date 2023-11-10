import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import css from './MoviesDetails.module.css'
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';

import { getMovieById } from '../../components/services/getMovies';
import { BASE_POSTER_URL, PLACEHOLDER } from '../../components/utils/imgBaseUrl';
import {Loader} from '../../components/Loader/Loader';

 const Reviews = lazy(() => import('../../components/Reviews/Reviewes'));
 const Cast = lazy(() => import('../../components/Cast/Cast'));

  const MoviesDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');

  const [movie, setMovie] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        setIsLoading(true);
        const movieById = await getMovieById(movieId);
        setMovie(movieById);
      } catch (error) {
        setError(error.message);
      }finally {
        setIsLoading(false);
      }
    };
    fetchMovieById();
  }, [movieId]);

return (
  <div className="container">
    <span className={css.buttonsLink}>
      <Link to={backLinkRef.current}>
      <i className={css.left}></i> Go back<span>.</span>
      </Link>
    </span>
    {error !== null && <p className="error-bage">{error}</p>}
       {isLoading && <Loader />}
       {movie !== '' && (
        
    <div className={css.filmWraper}>
      <img className={css.filmImg}
        src={`${
          movie.poster_path
            ? BASE_POSTER_URL + movie.poster_path
            : PLACEHOLDER + '?text=' + movie.original_title
        }`}
        alt="get"
      />
      <div>
        <h2 className={css.filmTitle}>{movie.original_title}</h2>
        <h3 className={css.filmSubTitle}>Rating: {Math.round(movie.vote_average)}</h3>
        <h3 className={css.filmSubTitle}>Overview</h3>
        <p className={css.filmDescr}>{movie.overview}</p>
        <h3 className={css.filmSubTitle}>Genres</h3>
        <ul className={css.styledListDescr}>
          {movie.genres?.map(genre => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    </div>
     )}

    <div>
      <h2 >Additional information</h2>
      <ul>
        <li className={css.buttonsLink}>
          <NavLink  to="cast" state={location.state}>
            Cast <span><i className={css.down}></i></span>
          </NavLink>
        </li>
        <li className={css.buttonsLink}>
          <NavLink  to="reviews" state={location.state}>
            Reviews <span><i className={css.down}></i></span>
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
      <Routes>
         <Route path="cast" element={<Cast />} />
         <Route path="reviews" element={<Reviews />} />
       </Routes>
      </Suspense>
    </div>
  </div>
  );
};

export default MoviesDetails;
