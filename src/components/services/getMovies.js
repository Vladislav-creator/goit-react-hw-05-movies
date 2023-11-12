import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '5f8567a6aaa6cc404915970e8b5a2159';

export const getTrendingMovies = async (page) => {
  const { data } = await axios.get(`trending/movie/week?api_key=${API_KEY}&page=${page}`);
   return data;
  
};

export const getMovieByQuery = async (query, page) => {
  const { data } = await axios.get(
    `search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=${page}&include_adult=false`
  );

  return data;
};

export const getMovieById = async movieId => {
  const { data } = await axios.get(
    `movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );

  return data;
};

export const getCastMovie = async movieId => {
  const { data } = await axios.get(
    `movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );

  return data.cast;
};
export const getReviewsMovie = async movieId => {
  const { data } = await axios.get(
    `movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`
  );

  return data.results;
};