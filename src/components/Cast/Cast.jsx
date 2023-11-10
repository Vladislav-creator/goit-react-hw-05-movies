import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCastMovie } from '../services/getMovies';
import { BASE_POSTER_URL, PLACEHOLDER } from '../utils/imgBaseUrl';
import css from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const cast = await getCastMovie(movieId);
        setCast(cast);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <>
      {
        <div>
            <h2 className={css.mainTitle}>Actors</h2>
        <ul className={css.styledList}>
          {cast.map(({ id, profile_path, original_name, character }) => (
            <li className={css.item} key={id}>
              <img className={css.actorImg}
                src={`${
                  profile_path
                    ? BASE_POSTER_URL + profile_path
                    : PLACEHOLDER + '?text=' + original_name
                }`}
                alt={original_name}
              />
              <p>
                <span> Actor:</span> {original_name}
              </p>
              <p>
                <span>Character:</span> {character}
              </p>
            </li>
          ))}
        </ul>
        </div>
      }
    </>
  );
};

export default Cast;