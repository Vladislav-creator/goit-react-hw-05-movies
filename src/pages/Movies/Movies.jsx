import { useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMovieByQuery } from '../../components/services/getMovies';
import { PageButtons } from 'components/Buttons/PageButtons';
import Form from '../../components/MoviesPage/SearchBar';
import FilmsList from '../../components/FilmList/FilmList';
import { Loader } from '../../components/Loader/Loader';
const Movies = () => {
  const [data, setData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(searchParams.get('page')||1);
  const [query, setQuery] = useState(searchParams.get('query')||"");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
     if (!query) return;
     setSearchParams({page: Number(page), query:query.toString()});

    const fetchMovieByQuery = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieByQuery(query, page);
         setData(data);
      } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
    };
    fetchMovieByQuery();
  }, [setSearchParams, page,query]);

  const handlePageChange =
    page => {
      setPage(page);
    }

  const onSubmit=(query)=>{
    setQuery(query)
    setPage(1)
  }
  return (
    <div className="container">
      <Form onSubmit={onSubmit}/>
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