import { useEffect, useState, useCallback } from 'react';
import { getTrendingMovies } from '../../components/services/getMovies';
import FilmsList from '../../components/FilmList/FilmList';
import { PageButtons } from "../../components/Buttons/PageButtons"
import { Loader } from '../../components/Loader/Loader';
// import { useSearchParams } from 'react-router-dom';
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [data, setData] = useState({});
   const [page, setPage] = useState(1);
   const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState(null);
//  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    
    const fetchMovie = async () => {
     
      try {
        setIsLoading(true);
        const data = await getTrendingMovies(page);
         setData(data);
         setMovies(data.results)
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
    };
    fetchMovie();
  }, [ page]);
 
  const handlePageChange = useCallback(
    page => {
      setPage(page);
      
    },
    [setPage]
  );
  
  return (
    <div className="container">
      <h1>Trending today</h1>
      {error !== null && <p className="error-bage">{error}</p>}
      {isLoading && <Loader />}
       <FilmsList movies={movies} /> 
      <PageButtons
              page={page}
              totalPages={data.total_pages}
              handlePageChange={handlePageChange}
              
            /> 
    </div>
  );
};

export default Home;
