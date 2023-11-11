import { useLocation, Link } from 'react-router-dom';

import css from "./FilmList.module.css";

const FilmsList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.listFilms}>
      {movies.map(({ id, original_title }) => (
        <li className={css.itemFilms} key={id}>
          <Link state={{ from: location }} to={`/movies/${id}`}>
          {' '}{original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default FilmsList;