import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMovieByQuery } from '../../components/services/getMovies';
import { PageButtons } from 'components/Buttons/PageButtons';
import Form from '../../components/MoviesPage/SearchBar';
import FilmsList from '../../components/FilmList/FilmList';
import { Loader } from '../../components/Loader/Loader';
const Movies = () => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentQuery = searchParams.get('query');
     if (!currentQuery) return;
   console.log(currentQuery);

    const fetchMovieByQuery = async () => {
      const currentPage = Number(searchParams.get('page'))||1; 
      try {
        setIsLoading(true);
        const data = await getMovieByQuery(currentQuery, page);
        //  console.log(page);
        // console.log(currentPage);
         setData(data);
          setPage(currentPage);
        

      } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
    };
    fetchMovieByQuery();
  }, [searchParams, page]);

  const handlePageChange = useCallback(
    page => {
      setPage(page);
      setSearchParams({ page });
    },
    [ setSearchParams, setPage]
  );

  return (
    <div className="container">
      <Form setSearchParams={setSearchParams} />
      {error !== null && <p className="error-bage">{error}</p>}
      {isLoading && <Loader />}
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
