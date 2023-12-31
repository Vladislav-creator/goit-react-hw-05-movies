import { Loader } from './Loader/Loader';
import { Suspense, lazy } from 'react';
import css from './App.module.css';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
const MovieDetails = lazy(() => import('pages/MoviesDetails/MoviesDetails'));
const Home = lazy(() => import('pages/Home/Home'));
const Movies = lazy(() => import('pages/Movies/Movies'));
export const App = () => {
  return (
    <div>
      <header className={css.header}>
        <NavLink className="header-link" to="/">
          Home
        </NavLink>
        <NavLink className="header-link" to="/movies">
          Movies
        </NavLink>
        <div className={css.camera}></div>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="movies/:movieId/*" element={<MovieDetails />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};
