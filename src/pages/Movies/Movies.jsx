import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMovieByQuery } from '../../components/services/getMovies';
import { PageButtons } from 'components/Buttons/PageButtons';
import Form from '../../components/MoviesPage/SearchBar';
import FilmsList from '../../components/FilmList/FilmList';

const Movies = () => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentQuery = searchParams.get('query');
    if (!currentQuery) return;

    const fetchMovieByQuery = async () => {
      try {
        const data = await getMovieByQuery(currentQuery, page);
         setData(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchMovieByQuery();
  }, [searchParams, page]);

  const handlePageChange = useCallback(
    page => {
      setPage(page);
    },
    [setPage]
  );

  return (
    <div className="container">
      <Form setSearchParams={setSearchParams} />
      {data.total_pages > 0 && <FilmsList movies={data.results} />}
      {data.total_pages > 1 && (
              <PageButtons
                page={page}
                totalPages={data.total_pages}
                handlePageChange={handlePageChange}
              />
             )} 
    </div>
  );
};

export default Movies;
