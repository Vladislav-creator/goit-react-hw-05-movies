import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import css from './MoviesDetails.module.css';
import defaultPoster from "../../components/Images/default_poster.jpg"
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';

import { getMovieById } from '../../components/services/getMovies';
import {
  BASE_POSTER_URL
} from '../../components/utils/imgBaseUrl';
import { Loader } from '../../components/Loader/Loader';

const Reviews = lazy(() => import('../../components/Reviews/Reviewes'));
const Cast = lazy(() => import('../../components/Cast/Cast'));

const MoviesDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');

  const [movie, setMovie] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const productionCompaniesList = movie?.production_companies?.map(
    ({ id, logo_path, name }) =>
      logo_path && (
        <li key={id}>
          {logo_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${logo_path}`}
              alt={name}
              style={{ maxHeight: 50, maxWidth: 200, marginRight: 30 }}
            />
          )}
        </li>
      )
  );

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        setIsLoading(true);
        const movieById = await getMovieById(movieId);
        setMovie(movieById);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieById();
  }, [movieId]);

  return (
    <div className="container">
      <span className={css.backLink}>
        <Link to={backLinkRef.current}>
          <i className={css.left}></i> Go back<span>.</span>
        </Link>
      </span>
      {error !== null && <p className="error-bage">{error}</p>}
      {isLoading && <Loader />}
      {movie !== '' && (
        <div className={css.filmWraper}>
          <img
            className={css.filmImg}
            src={`${
              movie.poster_path
                ? BASE_POSTER_URL + movie.poster_path
                : defaultPoster 
            }`}
            alt={movie.original_title}
          />
          <div className={css.filmCharacteristics}>
            <h1 className={css.filmTitle}>{movie.original_title}{movie.release_date && <span> ({movie.release_date.slice(0, 4)})</span>}</h1>
            <div className={css.score}>
                  {movie.vote_count > 0 ? (
                    <>
                      User score: {Math.round(movie.vote_average * 10)}%&ensp;
                      <span className={css.textData} >
                        ({movie.vote_count} {movie.vote_count === 1 ? 'vote' : 'votes'})
                      </span>
                    </>
                  ) : (
                    'No votes yet'
                  )}
                </div>
            <h3 className={css.subTitle}>Overview :</h3>
            <p className={css.textDescr}>{movie.overview}</p>
            <h3 className={css.subTitle}>Genres :</h3>
            <ul className={css.listNamesGenre}>
              {movie.genres?.map(genre => (
                <li className="nameGenre" key={genre.id}>
                  {' '}
                  {genre.name}
                </li>
              ))}
            </ul>
            <>
                    <h3 className={css.header}>Production companies</h3>
                    <div className={css.prouctionCompanies}>{productionCompaniesList}</div>
                  </>
                  <div className={css.imges}></div>
          </div>
        </div>
      )}

      <div>
        <h2 className={css.subTitleInfo}>Additional information</h2>
        <ul>
          <li className={css.detailsLi}>
            <NavLink
              className={css.detailsLink}
              to="cast"
              state={location.state}
            >
              Cast{' '}
              <span>
                <i className={css.down}></i>
              </span>
            </NavLink>
          </li>
          <li className={css.detailsLi}>
            <NavLink
              className={css.detailsLink}
              to="reviews"
              state={location.state}
            >
              Reviews{' '}
                <i className={css.down}></i>
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
