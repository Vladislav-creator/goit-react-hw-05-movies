import { useEffect, useState, useCallback } from 'react';
import { getTrendingMovies } from '../../components/services/getMovies';
import FilmsList from '../../components/FilmList/FilmList';
import { PageButtons } from "../../components/Buttons/PageButtons"

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
 
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getTrendingMovies(page);
         setData(data);
         setMovies(data.results)
      } catch (e) {
        console.log(e);
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
